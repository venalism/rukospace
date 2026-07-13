package handlers

import (
	"rukospace-backend/internal/database"
	"rukospace-backend/internal/models"

	"fmt"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/skip2/go-qrcode"
)

type CreatePropertyRequest struct {
	Title                string  `json:"title" validate:"required"`
	Description          string  `json:"description"`
	Address              string  `json:"address" validate:"required"`
	Latitude             float64 `json:"latitude" validate:"required"`
	Longitude            float64 `json:"longitude" validate:"required"`
	PricePerMonth        float64 `json:"price_per_month" validate:"required"`
	AreaSqm              float64 `json:"area_sqm" validate:"required"`
	ElectricityPowerWatt int     `json:"electricity_power_watt"`
	WaterSource          string  `json:"water_source"`
	ParkingSpaces        int     `json:"parking_spaces"`
	ZoningType           string  `json:"zoning_type"`
}

func CreateProperty(c *fiber.Ctx) error {
	req := new(CreatePropertyRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	ownerIDStr := c.Locals("user_id").(string)
	ownerID, err := uuid.Parse(ownerIDStr)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	property := models.Property{
		OwnerID:              ownerID,
		Title:                req.Title,
		Description:          req.Description,
		Address:              req.Address,
		Latitude:             req.Latitude,
		Longitude:            req.Longitude,
		PricePerMonth:        req.PricePerMonth,
		AreaSqm:              req.AreaSqm,
		ElectricityPowerWatt: req.ElectricityPowerWatt,
		WaterSource:          req.WaterSource,
		ParkingSpaces:        req.ParkingSpaces,
		ZoningType:           req.ZoningType,
		ListingStatus:        "draft",
		LegalityStatus:       "unverified",
	}

	if err := database.DB.Create(&property).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create property"})
	}

	return c.Status(fiber.StatusCreated).JSON(property)
}

func UpdateProperty(c *fiber.Ctx) error {
	id := c.Params("id")
	req := new(CreatePropertyRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	var property models.Property
	if err := database.DB.Where("id = ?", id).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	// Verify owner
	ownerIDStr := c.Locals("user_id").(string)
	if property.OwnerID.String() != ownerIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Not allowed to edit this property"})
	}

	property.Title = req.Title
	property.Description = req.Description
	property.Address = req.Address
	property.Latitude = req.Latitude
	property.Longitude = req.Longitude
	property.PricePerMonth = req.PricePerMonth
	property.AreaSqm = req.AreaSqm
	property.ElectricityPowerWatt = req.ElectricityPowerWatt
	property.WaterSource = req.WaterSource
	property.ParkingSpaces = req.ParkingSpaces
	property.ZoningType = req.ZoningType

	if err := database.DB.Save(&property).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update property"})
	}

	return c.JSON(property)
}

func GetProperty(c *fiber.Ctx) error {
	id := c.Params("id")

	var property models.Property
	if err := database.DB.Where("id = ?", id).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	// For MVP, we can also fetch photos and docs manually or via Preload if associations were set up.
	// Since we haven't set up GORM HasMany relations, we fetch them manually.
	var photos []models.PropertyPhoto
	database.DB.Where("property_id = ?", property.ID).Order("display_order asc").Find(&photos)

	var docs []models.PropertyDocument
	database.DB.Where("property_id = ?", property.ID).Find(&docs)

	return c.JSON(fiber.Map{
		"property":  property,
		"photos":    photos,
		"documents": docs,
	})
}

func SearchProperties(c *fiber.Ctx) error {
	// Bounding box filter logic as fallback for PostGIS MVP
	minLatStr := c.Query("min_lat")
	maxLatStr := c.Query("max_lat")
	minLngStr := c.Query("min_lng")
	maxLngStr := c.Query("max_lng")
	
	query := database.DB.Where("listing_status = ?", "active").Where("legality_status = ?", "verified")

	if minLatStr != "" && maxLatStr != "" && minLngStr != "" && maxLngStr != "" {
		minLat, _ := strconv.ParseFloat(minLatStr, 64)
		maxLat, _ := strconv.ParseFloat(maxLatStr, 64)
		minLng, _ := strconv.ParseFloat(minLngStr, 64)
		maxLng, _ := strconv.ParseFloat(maxLngStr, 64)

		query = query.Where("latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ?", minLat, maxLat, minLng, maxLng)
	}

	// Other filters
	minPriceStr := c.Query("min_price")
	if minPriceStr != "" {
		minPrice, _ := strconv.ParseFloat(minPriceStr, 64)
		query = query.Where("price_per_month >= ?", minPrice)
	}

	maxPriceStr := c.Query("max_price")
	if maxPriceStr != "" {
		maxPrice, _ := strconv.ParseFloat(maxPriceStr, 64)
		query = query.Where("price_per_month <= ?", maxPrice)
	}

	minAreaStr := c.Query("min_area")
	if minAreaStr != "" {
		minArea, _ := strconv.ParseFloat(minAreaStr, 64)
		query = query.Where("area_sqm >= ?", minArea)
	}

	zoningType := c.Query("zoning_type")
	if zoningType != "" {
		query = query.Where("zoning_type = ?", zoningType)
	}

	var properties []models.Property
	if err := query.Find(&properties).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to search properties"})
	}

	return c.JSON(properties)
}

func UploadPropertyFile(c *fiber.Ctx) error {
	propertyID := c.Params("id")
	docType := c.FormValue("doc_type", "photo") // 'photo' or document type like 'SHM'

	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	ownerIDStr := c.Locals("user_id").(string)
	if property.OwnerID.String() != ownerIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Not allowed to edit this property"})
	}

	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload required"})
	}

	// For MVP, save to a local 'uploads' directory
	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%s-%s%s", propertyID, uuid.New().String(), ext)
	uploadPath := fmt.Sprintf("./uploads/%s", filename)

	os.MkdirAll("./uploads", os.ModePerm)

	if err := c.SaveFile(file, uploadPath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file"})
	}

	urlPath := fmt.Sprintf("/uploads/%s", filename)

	if docType == "photo" {
		photo := models.PropertyPhoto{
			PropertyID: property.ID,
			URL:        urlPath,
		}
		database.DB.Create(&photo)
	} else {
		doc := models.PropertyDocument{
			PropertyID: property.ID,
			DocType:    docType,
			FileURL:    urlPath,
		}
		database.DB.Create(&doc)
	}

	return c.JSON(fiber.Map{"message": "File uploaded successfully", "url": urlPath})
}

func GenerateQRCode(c *fiber.Ctx) error {
	propertyID := c.Params("id")
	
	// Ensure property exists
	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	// Payload is the local URL to the frontend for MVP
	payload := fmt.Sprintf("http://localhost:5173/properties/%s", propertyID)

	png, err := qrcode.Encode(payload, qrcode.Medium, 256)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate QR code"})
	}

	c.Set("Content-Type", "image/png")
	return c.Send(png)
}

func SubmitProperty(c *fiber.Ctx) error {
	propertyID := c.Params("id")
	
	var property models.Property
	if err := database.DB.Where("id = ?", propertyID).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	ownerIDStr := c.Locals("user_id").(string)
	if property.OwnerID.String() != ownerIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Not allowed to edit this property"})
	}

	property.ListingStatus = "pending_verification"
	database.DB.Save(&property)

	return c.JSON(fiber.Map{"message": "Property submitted for verification"})
}

func DeleteProperty(c *fiber.Ctx) error {
	id := c.Params("id")

	var property models.Property
	if err := database.DB.Where("id = ?", id).First(&property).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Property not found"})
	}

	// Verify owner
	ownerIDStr := c.Locals("user_id").(string)
	if property.OwnerID.String() != ownerIDStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Not allowed to delete this property"})
	}

	// Delete related records (photos, documents, bookings) first for simple MVP cleanup
	database.DB.Where("property_id = ?", id).Delete(&models.PropertyPhoto{})
	database.DB.Where("property_id = ?", id).Delete(&models.PropertyDocument{})
	database.DB.Where("property_id = ?", id).Delete(&models.SurveyBooking{})

	if err := database.DB.Delete(&property).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete property"})
	}

	return c.JSON(fiber.Map{"message": "Property deleted successfully"})
}
