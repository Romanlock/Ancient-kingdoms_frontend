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

	if kingdomsToReturn == nil {
		return []ds.Kingdom{}, errors.New("no necessary kingdoms found")
	}

	return kingdomsToReturn, nil
}

func (r *Repository) GetKingdom(kingdom ds.Kingdom) (ds.Kingdom, error) {
	var kingdomToReturn ds.Kingdom

	err := r.db.Where(kingdom).First(&kingdomToReturn).Error
	if err != nil {
		return ds.Kingdom{}, err
	} else {
		return kingdomToReturn, nil
	}
}

func (r *Repository) GetRulers(requestBody ds.GetRulersRequest) ([]ds.Ruler, error) {
	var rulersToReturn []ds.Ruler

	var tx *gorm.DB = r.db

	switch {
	case requestBody.Num == 0 && requestBody.State != "":
		err := tx.Where("state = ?", requestBody.State).Find(&rulersToReturn).Error
		if err != nil {
			return []ds.Ruler{}, err
		}

	case requestBody.Num != 0 && requestBody.State == "":
		err := tx.Limit(requestBody.Num).Find(&rulersToReturn).Error
		if err != nil {
			return []ds.Ruler{}, err
		}

	case requestBody.Num != 0 && requestBody.State != "":
		err := tx.Where("state = ?", requestBody.State).
			Limit(requestBody.Num).
			Find(&rulersToReturn).Error
		if err != nil {
			return []ds.Ruler{}, err
		}

	default:
		err := tx.Find(&rulersToReturn).Error
		if err != nil {
			return []ds.Ruler{}, err
		}
	}

	if rulersToReturn == nil {
		return []ds.Ruler{}, errors.New("no necessary rulers found")
	}

	return rulersToReturn, nil
}

func (r *Repository) GetRuler(ruler ds.Ruler) (ds.Ruler, error) {
	var rulerToReturn ds.Ruler

	err := r.db.Where(ruler).First(&rulerToReturn).Error
	if err != nil {
		return ds.Ruler{}, err
	} else {
		return rulerToReturn, nil
	}
}

func (r *Repository) CreateKingdom(kingdom ds.Kingdom) error {
	return r.db.Create(&kingdom).Error
}

func (r *Repository) EditKingdom(kingdom ds.Kingdom) error {
	return r.db.Model(&ds.Kingdom{}).
		Where("name = ?", kingdom.Name).
		Updates(kingdom).Error
}

func (r *Repository) CreateRuler(ruler ds.Ruler) error {
	return r.db.Create(&ruler).Error
}

func (r *Repository) CreateRulerForKingdom(requestBody ds.CreateRulerForKingdomRequest) error {
	err := r.CreateRuler(requestBody.Ruler)
	if err != nil {
		return err
	}

	ruling := ds.Ruling{
		BeginGoverning: requestBody.BeginGoverning,
		Ruler:          requestBody.Ruler,
		Kingdom:        requestBody.Kingdom,
	}

	return r.db.Create(&ruling).Error
}

func (r *Repository) EditRuler(ruler ds.Ruler) error {
	return r.db.Model(&ds.Ruler{}).
		Where("name = ?", ruler.Name).
		Updates(ruler).Error
}

func (r *Repository) GetUserRole(username string) (string, error) {
	user := &ds.User{}

	err := r.db.Where("name = ?", username).First(&user).Error
	if err != nil {
		return "", err
	}
	if user == (&ds.User{}) {
		return "", errors.New("no user found")
	}

	return user.Rank, nil
}

func (r *Repository) RulerStateChange(id int, state string) error {
	return r.db.Model(&ds.Ruler{}).
		Where("id = ?", id).
		Update("state", state).Error
}

func (r *Repository) DeleteKingdom(kingdomName string) error {
	return r.db.Model(&ds.Kingdom{}).
		Where("name = ?", kingdomName).
		Update("status", "Захвачено ящерами").Error
}

func (r *Repository) DeleteRuler(rulerName string) error {
	return r.db.Model(&ds.Ruler{}).
		Where("name = ?", rulerName).
		Update("status", "Помер").Error
}

func (r *Repository) DeleteKingdomRuler(kingdomName string, rulerName string, rulingID int) error {
	return r.db.Where("kingdom_name = ?", kingdomName).
		Where("ruler_name = ?", rulerName).
		Where("id = ?", rulingID).Delete(&ds.Ruling{}).Error
}
