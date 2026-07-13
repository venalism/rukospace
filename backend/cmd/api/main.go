package main

import (
	"log"
	"os"

	"rukospace-backend/internal/database"
	"rukospace-backend/internal/handlers"
	"rukospace-backend/internal/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	database.ConnectDB()

	api := app.Group("/api/v1")

	// Auth routes
	auth := api.Group("/auth")
	auth.Post("/register", handlers.Register)
	auth.Post("/login", handlers.Login)
	auth.Get("/me", middleware.Protected(), handlers.GetMe)

	// Property routes (Block 1 & 2)
	properties := api.Group("/properties")
	properties.Get("/", handlers.SearchProperties)
	properties.Get("/:id", handlers.GetProperty)
	properties.Get("/:id/qrcode", handlers.GenerateQRCode)

	// Protected property routes
	protectedProperties := api.Group("/properties", middleware.Protected(), middleware.Roles("owner", "agent"))
	protectedProperties.Post("/", handlers.CreateProperty)
	protectedProperties.Put("/:id", handlers.UpdateProperty)
	protectedProperties.Post("/:id/photos", handlers.UploadPropertyFile) // Or documents if doc_type is set
	protectedProperties.Post("/:id/submit", handlers.SubmitProperty)

	// Booking routes (Block 2)
	bookings := api.Group("/bookings", middleware.Protected())
	bookings.Post("/", middleware.Roles("tenant"), handlers.CreateBooking)
	bookings.Get("/mine", middleware.Roles("tenant"), handlers.GetMyBookings)
	bookings.Get("/received", middleware.Roles("owner", "agent"), handlers.GetReceivedBookings)
	bookings.Patch("/:id/status", middleware.Roles("owner", "agent"), handlers.UpdateBookingStatus)

	// Admin routes
	admin := api.Group("/admin", middleware.Protected(), middleware.Roles("admin"))
	admin.Get("/properties/pending", handlers.GetPendingProperties)
	admin.Patch("/properties/:id/review", handlers.ReviewProperty) // handles approve and reject

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
