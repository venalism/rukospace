package handlers

import (
	"rukospace-backend/internal/database"
	"rukospace-backend/internal/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CreateRentalRequest struct {
	PropertyID string `json:"property_id" validate:"required"`
}

func CreateRental(c *fiber.Ctx) error {
	req := new(CreateRentalRequest)
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

	// Fetch property to get price
	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	// 1 month rental
	startDate := time.Now()
	endDate := startDate.AddDate(0, 1, 0)
	
	rental := models.Rental{
		PropertyID: propertyID,
		TenantID:   tenantID,
		StartDate:  startDate,
		EndDate:    endDate,
		TotalPrice: property.PricePerMonth,
		Status:     "active",
	}

	if err := database.DB.Create(&rental).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create rental"})
	}

	return c.Status(fiber.StatusCreated).JSON(rental)
}

type RentalResponse struct {
	models.Rental
	PropertyTitle string `json:"PropertyTitle"`
	PropertyImage string `json:"PropertyImage"`
}

func GetMyRentals(c *fiber.Ctx) error {
	tenantIDStr := c.Locals("user_id").(string)
	
	var rentals []models.Rental
	if err := database.DB.Where("tenant_id = ?", tenantIDStr).Order("created_at desc").Find(&rentals).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch rentals"})
	}

	var res []RentalResponse
	for _, r := range rentals {
		var p models.Property
		database.DB.Where("id = ?", r.PropertyID).First(&p)
		
		var photo models.PropertyPhoto
		database.DB.Where("property_id = ?", r.PropertyID).Order("display_order asc").First(&photo)
		
		res = append(res, RentalResponse{
			Rental:        r,
			PropertyTitle: p.Title,
			PropertyImage: photo.URL,
		})
	}

	return c.JSON(res)
}
