package ds

import (
	"gorm.io/datatypes"
)

type Kingdom struct {
	Id          uint   `gorm:"primaryKey;AUTO_INCREMENT"`
	Name        string `gorm:"type:varchar(50);unique;not null"`
	Area        int    `gorm:"not null"`
	Capital     string `gorm:"type:varchar(50);not null"`
	Image       string `gorm:"type:bytea"`
	Description string `gorm:"size:255"`
	State       string `gorm:"type:varchar(50);not null"`
}

type Dielty struct {
	Id          uint   `gorm:"primaryKey;AUTO_INCREMENT"`
	Name        string `gorm:"type:varchar(50);unique;not null"`
	Description string `gorm:"size:255"`
}

type Ruler struct {
	Id              uint           `gorm:"primaryKey;AUTO_INCREMENT"`
	DieltyRefer     int            `gorm:"not null"`
	Name            string         `gorm:"type:varchar(50);unique;not null"`
	Dielty          Dielty         `gorm:"foreignKey:DieltyRefer"`
	State           string         `gorm:"type:varchar(50);not null"`
	Date_of_birth   datatypes.Date `gorm:"not null"`
	Begin_governing datatypes.Date `gorm:"not null"`
	End_governing   datatypes.Date
}

type Ruling struct {
	Id           uint    `gorm:"primaryKey:AUTO_INCREMENT"`
	RulerRefer   int     `gorm:"not null"`
	KingdomRefer int     `gorm:"not null"`
	Ruler        Ruler   `gorm:"foreignKey:RulerRefer"`
	Kingdom      Kingdom `gorm:"foreignKey:KingdomRefer"`
}

type Campaign struct {
	Id         uint           `gorm:"primaryKey;AUTO_INCREMENT"`
	RulerRefer int            `gorm:"not null"`
	Ruler      Ruler          `gorm:"foreignKey:RulerRefer"`
	Date_begin datatypes.Date `gorm:"not null"`
	Date_end   datatypes.Date
	Result     string `gorm:"size:255"`
}
