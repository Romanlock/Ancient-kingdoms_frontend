package repository

// TODO

import (
	"log"
	"strings"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"kingdoms/internal/app/ds"
)

type Repository struct {
	db *gorm.DB
}

func New(dsn string) (*Repository, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return &Repository{
		db: db,
	}, nil
}

func (r *Repository) GetKingdomByID(id int) (*ds.Kingdom, error) {
	kingdom := &ds.Kingdom{}

	err := r.db.First(kingdom, "id = ?", id).Error
	if err != nil {
		return nil, err
	}

	return kingdom, nil
}

func (r *Repository) GetKingdomByName(name string) (*ds.Kingdom, error) {
	kingdom := &ds.Kingdom{}
	err := r.db.First(kingdom, "name = ?", name).Error
	if err != nil {
		return nil, err
	}

	return kingdom, nil
}

func (r *Repository) SearchKingdoms(kingdomName string) ([]ds.Kingdom, error) {
	kingdoms := []ds.Kingdom{}

	allKingdoms, allKingdomsErr := r.GetAllKingdoms()

	if allKingdomsErr != nil {
		return nil, allKingdomsErr
	}

	for _, kingdom := range allKingdoms {
		if strings.Contains(strings.ToLower(kingdom.Name), strings.ToLower(kingdomName)) {
			kingdoms = append(kingdoms, kingdom)
		}
	}

	return kingdoms, nil
}

func (r *Repository) GetAllKingdoms() ([]ds.Kingdom, error) {
	kingdoms := []ds.Kingdom{}

	err := r.db.Find((&kingdoms)).Error

	if err != nil {
		return nil, err
	}

	return kingdoms, nil
}

func (r *Repository) FilterActiveKingdoms(kingdoms []ds.Kingdom) []ds.Kingdom {
	newKingdoms := []ds.Kingdom{}

	for _, kingdom := range kingdoms {
		if kingdom.State == "Процветает" {
			newKingdoms = append(newKingdoms, kingdom)
		}
	}

	return newKingdoms
}

func (r *Repository) ChangeKingdomVisibility(kingdomName string) error {
	kingdom, err := r.GetKingdomByName(kingdomName)

	if err != nil {
		log.Println(err)
		return err
	}

	newStatus := ""

	if kingdom.State == "Процветает" {
		newStatus = "Захвачено ящерами"
	} else {
		newStatus = "Процветает"
	}

	return r.db.Model(&ds.Kingdom{}).Where("name = ?", kingdomName).Update("state", newStatus).Error
}
