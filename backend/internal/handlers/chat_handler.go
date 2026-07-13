package handlers

import (
	"log"
	"rukospace-backend/internal/database"
	"rukospace-backend/internal/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ChatResponse struct {
	ID             uuid.UUID `json:"id"`
	Participant1ID uuid.UUID `json:"participant1_id"`
	Participant2ID uuid.UUID `json:"participant2_id"`
	PropertyID     *uuid.UUID `json:"property_id"`
	OtherUserName  string    `json:"other_user_name"`
	OtherUserRole  string    `json:"other_user_role"`
}

func GetChats(c *fiber.Ctx) error {
	userIDStr := c.Locals("user_id").(string)
	
	// Ensure default chat with admin exists
	var adminUser models.User
	if err := database.DB.Where("role = ?", "admin").First(&adminUser).Error; err == nil {
		if adminUser.ID.String() != userIDStr {
			var adminChat models.Chat
			err := database.DB.Where(
				"(participant1_id = ? AND participant2_id = ?) OR (participant1_id = ? AND participant2_id = ?)",
				userIDStr, adminUser.ID.String(), adminUser.ID.String(), userIDStr,
			).First(&adminChat).Error
			
			if err != nil {
				uid, _ := uuid.Parse(userIDStr)
				database.DB.Create(&models.Chat{
					Participant1ID: uid,
					Participant2ID: adminUser.ID,
				})
			}
		}
	}

	var chats []models.Chat
	if err := database.DB.Where("participant1_id = ? OR participant2_id = ?", userIDStr, userIDStr).Order("updated_at desc").Find(&chats).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch chats"})
	}

	var response []ChatResponse
	for _, chat := range chats {
		otherID := chat.Participant1ID
		if chat.Participant1ID.String() == userIDStr {
			otherID = chat.Participant2ID
		}

		var otherUser models.User
		database.DB.Where("id = ?", otherID).First(&otherUser)

		response = append(response, ChatResponse{
			ID:             chat.ID,
			Participant1ID: chat.Participant1ID,
			Participant2ID: chat.Participant2ID,
			PropertyID:     chat.PropertyID,
			OtherUserName:  otherUser.FullName,
			OtherUserRole:  otherUser.Role,
		})
	}

	return c.JSON(response)
}

type CreateChatRequest struct {
	OtherUserID string `json:"other_user_id"`
	PropertyID  string `json:"property_id"` // optional
}

func CreateOrGetChat(c *fiber.Ctx) error {
	userIDStr := c.Locals("user_id").(string)
	userID, _ := uuid.Parse(userIDStr)

	var req CreateChatRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}
	
	otherUserID, err := uuid.Parse(req.OtherUserID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid other user ID"})
	}

	var chat models.Chat
	err = database.DB.Where(
		"(participant1_id = ? AND participant2_id = ?) OR (participant1_id = ? AND participant2_id = ?)",
		userID, otherUserID, otherUserID, userID,
	).First(&chat).Error

	if err == nil {
		return c.JSON(chat)
	}

	// Create new chat
	chat = models.Chat{
		Participant1ID: userID,
		Participant2ID: otherUserID,
	}

	if req.PropertyID != "" {
		propID, e := uuid.Parse(req.PropertyID)
		if e == nil {
			chat.PropertyID = &propID
		}
	}

	if err := database.DB.Create(&chat).Error; err != nil {
		log.Println("Error creating chat:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create chat"})
	}

	return c.JSON(chat)
}

func GetMessages(c *fiber.Ctx) error {
	chatID := c.Params("id")
	userIDStr := c.Locals("user_id").(string)

	var chat models.Chat
	if err := database.DB.Where("id = ?", chatID).First(&chat).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Chat not found"})
	}

	if chat.Participant1ID.String() != userIDStr && chat.Participant2ID.String() != userIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Unauthorized"})
	}

	var messages []models.Message
	if err := database.DB.Where("chat_id = ?", chatID).Order("created_at asc").Find(&messages).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch messages"})
	}

	return c.JSON(messages)
}

type SendMessageRequest struct {
	Content string `json:"content"`
}

func SendMessage(c *fiber.Ctx) error {
	chatID := c.Params("id")
	userIDStr := c.Locals("user_id").(string)
	userID, _ := uuid.Parse(userIDStr)

	var req SendMessageRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	var chat models.Chat
	if err := database.DB.Where("id = ?", chatID).First(&chat).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Chat not found"})
	}

	if chat.Participant1ID.String() != userIDStr && chat.Participant2ID.String() != userIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Unauthorized"})
	}

	msg := models.Message{
		ChatID:   chat.ID,
		SenderID: userID,
		Content:  req.Content,
	}

	if err := database.DB.Create(&msg).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to send message"})
	}

	// Update chat updated_at
	database.DB.Model(&chat).Update("updated_at", msg.CreatedAt)

	return c.JSON(msg)
}
