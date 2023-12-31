package main

import (
	"fmt"
	"kingdoms/internal/app/ds"
	"kingdoms/internal/app/dsn"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	_ = godotenv.Load()
	db, err := gorm.Open(postgres.Open(dsn.FromEnv()), &gorm.Config{})
	if err != nil {
		fmt.Println("Failed to connect database! Error:", err)
		return
	}

	// Migrate the schema
	err = MigrateSchema(db)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func MigrateSchema(db *gorm.DB) error {
	err := MigrateKingdom(db)
	if err != nil {
		return err
	}

	err = MigrateUser(db)
	if err != nil {
		return err
	}

	err = MigrateRuler(db)
	if err != nil {
		return err
	}

	err = MigrateRuling(db)
	if err != nil {
		return err
	}

	return nil
}

func MigrateKingdom(db *gorm.DB) error {
	err := db.AutoMigrate(&ds.Kingdom{})
	if err != nil {
		fmt.Println("Error migrating Kingdom to db")
		return err
	}

	return nil
}

func MigrateUser(db *gorm.DB) error {
	err := db.AutoMigrate(&ds.User{})
	if err != nil {
		fmt.Println("Error migrating User to db")
		return err
	}

	return nil
}

func MigrateRuler(db *gorm.DB) error {
	err := db.AutoMigrate(&ds.Ruler{})
	if err != nil {
		fmt.Println("Error migrating Ruler to db")
		return err
	}

	return nil
}

func MigrateRuling(db *gorm.DB) error {
	err := db.AutoMigrate(&ds.Ruling{})
	if err != nil {
		fmt.Println("Error migrating Ruling to db")
		return err
	}

	return nil
}
