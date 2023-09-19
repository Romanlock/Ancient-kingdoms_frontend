package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Service struct {
	Name        string
	Description string
	PhotoPath   string
}

var services = []Service{
	{"Владимиро-Суздальское", "", "image/image1.jpg"},
	{"Галицко-Волынское", "", ""},
	{"Киевское", "", ""},
	{"Переяславское", "", ""},
	{"Полоцкое", "", ""},
	{"Черниговское", "", ""},
}

func StartServer() {
	log.Println("Server started")

	app := gin.Default()

	app.LoadHTMLGlob("../../templates/*.html")
	app.Static("/image", "../../resources/image")
	//app.Static("/css", "../../templates/css")
	//app.Static("/font", "../../resources/font")

	app.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"services": services,
			"name":     services[0].Name,
		})
	})

	app.Run(":8000")

	log.Println("Server down")
}
