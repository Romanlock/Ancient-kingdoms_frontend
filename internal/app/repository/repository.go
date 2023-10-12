package repository

import (
	"errors"

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

func (r *Repository) GetKingdoms(requestBody ds.GetKingdomsRequest) ([]ds.Kingdom, error) {
	kingdomsToReturn := []ds.Kingdom{}

	var tx *gorm.DB = r.db

	switch {
	case requestBody.Ruler == "All" && requestBody.State != "":
		err := tx.Where("state = ?", requestBody.State).Find(&kingdomsToReturn).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}

	case requestBody.Ruler != "All" && requestBody.State == "":
		var ruler ds.Ruler
		err := tx.Where("name = ?", requestBody.Ruler).First(&ruler).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}
		if ruler == (ds.Ruler{}) {
			return []ds.Kingdom{}, errors.New("no necessary ruler")
		}

		err = tx.Joins("JOIN rulings ON rulings.kingdom_refer = kingdoms.id").
			Where("ruling.ruler_refer = ?", ruler.Id).
			Find(&kingdomsToReturn).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}

	case requestBody.Ruler != "All" && requestBody.State != "":
		var ruler ds.Ruler
		err := tx.Where("name = ?", requestBody.Ruler).First(&ruler).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}
		if ruler == (ds.Ruler{}) {
			return []ds.Kingdom{}, errors.New("no necessary ruler")
		}

		err = tx.Joins("JOIN rulings ON rulings.kingdom_refer = kingdoms.id").
			Where("ruling.ruler_refer = ?", ruler.Id).
			Where("kingdoms.state = ?", requestBody.State).
			Find(&kingdomsToReturn).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}

	default:
		err := tx.Find(&kingdomsToReturn).Error
		if err != nil {
			return []ds.Kingdom{}, err
		}
	}

	return kingdomsToReturn, nil
}

func (r *Repository) GetKingdom(kingdom ds.Kingdom) (ds.Kingdom, error) {
	var kingdomToReturn ds.Kingdom

	err := r.db.Where(&kingdom).First(&kingdomToReturn).Error
	if err != nil {
		return ds.Kingdom{}, err
	} else {
		return kingdomToReturn, nil
	}
}

func (r *Repository) GetRulers(requestBody ds.GetRulersRequest) ([]ds.Ruler, error) {

	return []ds.Ruler{}, nil
}

func (r *Repository) GetRuler(ruler ds.Ruler) (ds.Ruler, error) {

	return ds.Ruler{}, nil
}

func (r *Repository) CreateKingdom(kingdom ds.Kingdom) error {

	return nil
}

func (r *Repository) EditKingdom(kingdom ds.Kingdom) error {

	return nil
}

func (r *Repository) CreateRulerForKingdom(requestBody ds.CreateRulerForKingdomRequest) error {

	return nil
}

func (r *Repository) EditRuler(ruler ds.Ruler) error {

	return nil
}

func (r *Repository) GetUserRole(username string) (string, error) {

	return "", nil
}

func (r *Repository) RulerStateChange(id int, state string) error {

	return nil
}

func (r *Repository) DeleteKingdom(kingdomName string) error {

	return nil
}

func (r *Repository) DeleteRuler(rulerName string) error {

	return nil
}

func (r *Repository) DeleteKingdomRuler(kingdomName string, rulerName string, rulingID int) error {

	return nil
}

// func (r *Repository) GetKingdomByID(id int) (*ds.Kingdom, error) {
// 	kingdom := &ds.Kingdom{}

// 	err := r.db.First(kingdom, "id = ?", id).Error
// 	if err != nil {
// 		return nil, err
// 	}

// 	return kingdom, nil
// }

// func (r *Repository) GetKingdomByName(name string) (*ds.Kingdom, error) {
// 	kingdom := &ds.Kingdom{}
// 	err := r.db.First(kingdom, "name = ?", name).Error
// 	if err != nil {
// 		return nil, err
// 	}

// 	return kingdom, nil
// }

// func (r *Repository) SearchKingdoms(kingdomName string) ([]ds.Kingdom, error) {
// 	kingdoms := []ds.Kingdom{}

// 	allKingdoms, allKingdomsErr := r.GetAllKingdoms()

// 	if allKingdomsErr != nil {
// 		return nil, allKingdomsErr
// 	}

// 	for _, kingdom := range allKingdoms {
// 		if strings.Contains(strings.ToLower(kingdom.Name), strings.ToLower(kingdomName)) {
// 			kingdoms = append(kingdoms, kingdom)
// 		}
// 	}

// 	return kingdoms, nil
// }

// func (r *Repository) GetAllKingdoms() ([]ds.Kingdom, error) {
// 	kingdoms := []ds.Kingdom{}

// 	err := r.db.Find((&kingdoms)).Error

// 	if err != nil {
// 		return nil, err
// 	}

// 	return kingdoms, nil
// }

// func (r *Repository) FilterActiveKingdoms(kingdoms []ds.Kingdom) []ds.Kingdom {
// 	newKingdoms := []ds.Kingdom{}

// 	for _, kingdom := range kingdoms {
// 		if kingdom.State == "Процветает" {
// 			newKingdoms = append(newKingdoms, kingdom)
// 		}
// 	}

// 	return newKingdoms
// }

// func (r *Repository) ChangeKingdomVisibility(kingdomName string) error {
// 	kingdom, err := r.GetKingdomByName(kingdomName)

// 	if err != nil {
// 		log.Println(err)
// 		return err
// 	}

// 	newStatus := ""

// 	if kingdom.State == "Процветает" {
// 		newStatus = "Захвачено ящерами"
// 	} else {
// 		newStatus = "Процветает"
// 	}

// 	return r.db.Model(&ds.Kingdom{}).Where("name = ?", kingdomName).Update("state", newStatus).Error
// }
