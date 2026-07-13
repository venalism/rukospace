package middleware

import (
	"github.com/gofiber/fiber/v2"
)

// Roles requires the user to have one of the specified roles
func Roles(allowedRoles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		userRole := c.Locals("role")
		if userRole == nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Unauthorized access"})
		}

		roleStr, ok := userRole.(string)
		if !ok {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Invalid role data"})
		}

		for _, allowedRole := range allowedRoles {
			if roleStr == allowedRole {
				return c.Next()
			}
		}

		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access restricted for this role"})
	}
}
