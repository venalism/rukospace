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

// GetAllUsers returns all users (without password hash) for admin management
func GetAllUsers(c *fiber.Ctx) error {
	var users []models.User
	if err := database.DB.Select("id", "full_name", "email", "phone", "role", "created_at", "updated_at").Find(&users).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch users"})
	}

	return c.JSON(users)
}

// GetAllPropertiesAdmin returns all properties regardless of status
func GetAllPropertiesAdmin(c *fiber.Ctx) error {
	var properties []models.Property
	if err := database.DB.Order("created_at desc").Find(&properties).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch properties"})
	}

	return c.JSON(properties)
}

// GetAdminStats returns summary statistics for the admin dashboard
func GetAdminStats(c *fiber.Ctx) error {
	var totalUsers int64
	var totalProperties int64
	var pendingCount int64
	var verifiedCount int64
	var rejectedCount int64
	var tenantCount int64
	var ownerCount int64
	var agentCount int64
	var adminCount int64

	database.DB.Model(&models.User{}).Count(&totalUsers)
	database.DB.Model(&models.Property{}).Count(&totalProperties)
	database.DB.Model(&models.Property{}).Where("listing_status = ?", "pending_verification").Count(&pendingCount)
	database.DB.Model(&models.Property{}).Where("listing_status = ?", "active").Count(&verifiedCount)
	database.DB.Model(&models.Property{}).Where("listing_status = ?", "rejected").Count(&rejectedCount)
	database.DB.Model(&models.User{}).Where("role = ?", "tenant").Count(&tenantCount)
	database.DB.Model(&models.User{}).Where("role = ?", "owner").Count(&ownerCount)
	database.DB.Model(&models.User{}).Where("role = ?", "agent").Count(&agentCount)
	database.DB.Model(&models.User{}).Where("role = ?", "admin").Count(&adminCount)

	return c.JSON(fiber.Map{
		"total_users":      totalUsers,
		"total_properties": totalProperties,
		"pending_count":    pendingCount,
		"verified_count":   verifiedCount,
		"rejected_count":   rejectedCount,
		"users_by_role": fiber.Map{
			"tenant": tenantCount,
			"owner":  ownerCount,
			"agent":  agentCount,
			"admin":  adminCount,
		},
	})
}
