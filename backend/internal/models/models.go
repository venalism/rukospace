package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	FullName     string    `gorm:"size:150;not null"`
	Email        string    `gorm:"size:150;unique;not null"`
	Phone        string    `gorm:"size:20"`
	PasswordHash string    `gorm:"size:255;not null"`
	Role         string    `gorm:"size:20;not null"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type Property struct {
	ID                   uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	OwnerID              uuid.UUID `gorm:"type:uuid;not null"`
	Title                string    `gorm:"size:200;not null"`
	Description          string    `gorm:"type:text"`
	Address              string    `gorm:"size:255;not null"`
	Latitude             float64   `gorm:"not null"`
	Longitude            float64   `gorm:"not null"`
	PricePerMonth        float64   `gorm:"type:numeric(14,2);not null"`
	AreaSqm              float64   `gorm:"type:numeric(8,2);not null"`
	ElectricityPowerWatt int
	WaterSource          string    `gorm:"size:50"`
	ParkingSpaces        int       `gorm:"default:0"`
	ZoningType           string    `gorm:"size:50"`
	LegalityStatus       string    `gorm:"size:30;not null;default:'unverified'"`
	ListingStatus        string    `gorm:"size:30;not null;default:'draft'"`
	QRCodeURL            string    `gorm:"size:255"`
	CreatedAt            time.Time
	UpdatedAt            time.Time
}

type PropertyPhoto struct {
	ID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	PropertyID   uuid.UUID `gorm:"type:uuid;not null"`
	URL          string    `gorm:"size:255;not null"`
	DisplayOrder int       `gorm:"default:0"`
}

type PropertyDocument struct {
	ID                 uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	PropertyID         uuid.UUID `gorm:"type:uuid;not null"`
	DocType            string    `gorm:"size:30;not null"`
	FileURL            string    `gorm:"size:255;not null"`
	VerificationStatus string    `gorm:"size:30;not null;default:'pending'"`
}

type SurveyBooking struct {
	ID                uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	PropertyID        uuid.UUID `gorm:"type:uuid;not null"`
	TenantID          uuid.UUID `gorm:"type:uuid;not null"`
	RequestedDatetime time.Time `gorm:"not null"`
	Status            string    `gorm:"size:20;not null;default:'pending'"`
	Notes             string    `gorm:"type:text"`
	CreatedAt         time.Time
}

type VerificationLog struct {
	ID         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	PropertyID uuid.UUID `gorm:"type:uuid;not null"`
	AdminID    uuid.UUID `gorm:"type:uuid;not null"`
	Action     string    `gorm:"size:20;not null"`
	Notes      string    `gorm:"type:text"`
	CreatedAt  time.Time
}

type Chat struct {
	ID             uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Participant1ID uuid.UUID `gorm:"type:uuid;not null" json:"participant1_id"`
	Participant2ID uuid.UUID `gorm:"type:uuid;not null" json:"participant2_id"`
	PropertyID     *uuid.UUID `gorm:"type:uuid" json:"property_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type Message struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	ChatID    uuid.UUID `gorm:"type:uuid;not null" json:"chat_id"`
	SenderID  uuid.UUID `gorm:"type:uuid;not null" json:"sender_id"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	ReadAt    *time.Time `json:"read_at"`
	CreatedAt time.Time `json:"created_at"`
}
