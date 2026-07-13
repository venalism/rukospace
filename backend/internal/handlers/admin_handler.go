package handlers

import (
	"rukospace-backend/internal/database"
	"rukospace-backend/internal/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func GetPendingProperties(c *fiber.Ctx) error {
	var properties []models.Property
	if err := database.DB.Where("listing_status = ?", "pending_verification").Find(&properties).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch pending properties"})
	}

	return c.JSON(properties)
}

type AdminReviewRequest struct {
	Action string `json:"action" validate:"required"` // "approve" or "reject"
	Reason string `json:"reason"` // required if reject
}

func ReviewProperty(c *fiber.Ctx) error {
	propertyID := c.Params("id")
	req := new(AdminReviewRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if req.Action != "approve" && req.Action != "reject" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid action"})
	}

	if req.Action == "reject" && req.Reason == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Reason is required for rejection"})
	}

	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	adminIDStr := c.Locals("user_id").(string)
	adminID, _ := uuid.Parse(adminIDStr)
	propUUID, _ := uuid.Parse(propertyID)

	if req.Action == "approve" {
		property.ListingStatus = "active"
		property.LegalityStatus = "verified"
	} else {
		property.ListingStatus = "rejected"
		// legality status remains what it was, or goes back to unverified
	}

	if err := database.DB.Save(&property).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update property"})
	}

	// Create verification log
	log := models.VerificationLog{
		PropertyID: propUUID,
		AdminID:    adminID,
		Action:     req.Action,
		Notes:      req.Reason,
	}
	database.DB.Create(&log)

	return c.JSON(fiber.Map{"message": "Property reviewed successfully", "property": property})
}
