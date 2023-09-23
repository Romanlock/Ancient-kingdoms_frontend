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

// type District struct {
// 	ID   uint `gorm:"primaryKey"`
// 	Name string
// }

// type RegionStatus struct {
// 	ID   uint `gorm:"primaryKey"`
// 	Name string
// }

// type Region struct {
// 	ID                uint `gorm:"primaryKey"`
// 	DistrictRefer     int
// 	RegionStatusRefer int
// 	Name              string
// 	Details           string
// 	Status            RegionStatus `gorm:"foreignKey:RegionStatusRefer"`
// 	District          District     `gorm:"foreignKey:DistrictRefer"`
// 	AreaKm            float64
// 	Population        int
// 	HeadName          string
// 	HeadEmail         string
// 	HeadPhone         string
// 	AverageHeightM    float64
// 	Image             string `gorm:"type:bytea"`
// }

// type Role struct {
// 	ID   uint `gorm:"primaryKey"`
// 	Name string
// }

// type FlightStatus struct {
// 	ID   uint `gorm:"primaryKey"`
// 	Name string
// }

// type User struct {
// 	ID            uint `gorm:"primaryKey"`
// 	Name          string
// 	UserRoleRefer int
// 	Role          Role `gorm:"foreignKey:UserRoleRefer"`
// }

// type Flight struct {
// 	ID                uint `gorm:"primaryKey"`
// 	UserRefer         int
// 	FlightStatusRefer int
// 	Status            FlightStatus `gorm:"foreignKey:FlightStatusRefer"`
// 	DateCreated       datatypes.Date
// 	DateProcessed     datatypes.Date
// 	DateFinished      datatypes.Date
// 	Moderator         User `gorm:"foreignKey:UserRefer"`
// 	TakeoffDate       datatypes.Date
// 	ArrivalDate       datatypes.Date
// }

// type FlightToRegion struct {
// 	ID          uint `gorm:"primaryKey"`
// 	FlightRefer int
// 	RegionRefer int
// 	Flight      Flight `gorm:"foreignKey:FlightRefer"`
// 	Region      Region `gorm:"foreignKey:RegionRefer"`
// }
