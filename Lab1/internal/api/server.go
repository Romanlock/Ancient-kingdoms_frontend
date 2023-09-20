package api

import (
	"log"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
)

type Service struct {
	Name        string
	Description string
	PhotoPath   string
}

var services = []Service{
	{"Владимиро-Суздальское", "", "../image/VS.png"},
	{"Галицко-Волынское", "Галицко-Волынское княжество считалось основным опорным центром базы Древних Руссов", "../image/GV.jpeg"},
	{"Киевское", "", "../image/K.svg"},
	{"Переяславское", "", "../image/P.png"},
	{"Полоцкое", "", "../image/Po.png"},
	{"Черниговское", "", "../image/C.png"},
}

func StartServer() {
	log.Println("Server started")

	app := gin.Default()

	app.LoadHTMLGlob("../../templates/*.html")
	app.Static("/image", "../../resources/image")
	app.Static("/css", "../../templates/css/")

	app.GET("/", func(c *gin.Context) {
		title := strings.ToLower(c.Query("kingdom_name"))

		if title == "" {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"services": services,
			})
			return
		}

		sortedServices := []Service{}
		for i := range services {
			if strings.Contains(strings.ToLower(services[i].Name), title) {
				sortedServices = append(sortedServices, services[i])
			}
		}

		c.HTML(http.StatusOK, "index.html", gin.H{
			"services": sortedServices,
		})
	})

	app.GET("/:kingdom", func(c *gin.Context) {
		title := c.Param("kingdom")
		for _, service := range services {
			if service.Name == title {
				c.HTML(http.StatusOK, "kingdom.html", gin.H{
					"Name":      		service.Name,
					"PhotoPath":      	"../" + service.PhotoPath,
					"Description":      service.Description,
				})
				return
			}
		}
	})

	app.Run(":8000")

	log.Println("Server down")
}
