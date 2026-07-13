package handlers

import (
	"rukospace-backend/internal/database"
	"rukospace-backend/internal/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CreateBookingRequest struct {
	PropertyID        string    `json:"property_id" validate:"required"`
	RequestedDatetime time.Time `json:"requested_datetime" validate:"required"`
	Notes             string    `json:"notes"`
}

func CreateBooking(c *fiber.Ctx) error {
	req := new(CreateBookingRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	tenantIDStr := c.Locals("user_id").(string)
	tenantID, err := uuid.Parse(tenantIDStr)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	propertyID, err := uuid.Parse(req.PropertyID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid property ID"})
	}

	// Ensure property exists
	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	booking := models.SurveyBooking{
		PropertyID:        propertyID,
		TenantID:          tenantID,
		RequestedDatetime: req.RequestedDatetime,
		Notes:             req.Notes,
		Status:            "pending",
	}

	if err := database.DB.Create(&booking).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create booking"})
	}

	return c.Status(fiber.StatusCreated).JSON(booking)
}

func GetMyBookings(c *fiber.Ctx) error {
	tenantIDStr := c.Locals("user_id").(string)
	
	var bookings []models.SurveyBooking
	if err := database.DB.Where("tenant_id = ?", tenantIDStr).Order("created_at desc").Find(&bookings).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch bookings"})
	}

	return c.JSON(bookings)
}

func GetReceivedBookings(c *fiber.Ctx) error {
	ownerIDStr := c.Locals("user_id").(string)

	// Join with properties to only get bookings for properties owned by this owner
	var bookings []models.SurveyBooking
	err := database.DB.Table("survey_bookings").
		Select("survey_bookings.*").
		Joins("JOIN properties ON survey_bookings.property_id = properties.id").
		Where("properties.owner_id = ?", ownerIDStr).
		Order("survey_bookings.created_at desc").
		Find(&bookings).Error

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch received bookings"})
	}

	return c.JSON(bookings)
}

type UpdateBookingStatusRequest struct {
	Status string `json:"status" validate:"required"`
}

func UpdateBookingStatus(c *fiber.Ctx) error {
	id := c.Params("id")
	req := new(UpdateBookingStatusRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if req.Status != "approved" && req.Status != "rejected" && req.Status != "completed" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid status"})
	}

	var booking models.SurveyBooking
	if err := database.DB.Where("id = ?", id).First(&booking).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Booking not found"})
	}

	// Verify owner
	var property models.Property
	if err := database.DB.Where("id = ?", booking.PropertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	ownerIDStr := c.Locals("user_id").(string)
	if property.OwnerID.String() != ownerIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Not allowed to edit this booking"})
	}

	booking.Status = req.Status
	if err := database.DB.Save(&booking).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update booking status"})
	}

	return c.JSON(booking)
}
