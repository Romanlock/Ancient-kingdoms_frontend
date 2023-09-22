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
	{"Владимиро-Суздальское", "Величайший Рус - Добрыня Никитич родом из этого княжества. Ходили слухи, что здесь умели варить зелья силы и храбрости, поэтому именно тут рождались и росли самые и великие Русы", "../image/VS.png"},
	{"Галицко-Волынское", "Галицко-Волынское княжество считалось основным опорным центром базы Древних Русов", "../image/GV.jpeg"},
	{"Киевское", "Киевское княжество было лучшим в сфере подготовки Древних Русов к войне против ящеров. Здесь располагались полигоны и тренировочные лагеря, где воины оттачивали свои приемы", "../image/K.svg"},
	{"Переяславское", "Именно здесь, в Переяславском княжестве, жили лучшие стратеги, поэтому на базе переяславского кремля проходили собрания с обсуждением тактики защиты и нападения на ящеров", "../image/P.png"},
	{"Полоцкое", "Полоцкое княжество считалось кузницей у Древних Русов. Здесь было отлито немало великих оружий: меч Алеши поповича, щит и копье Добрыни Никитича, булава Ильи Муромца", "../image/Po.png"},
	{"Черниговское", "Черниговское княжество славилось идейными учеными, которые придумывали новые приемы, позволяющие бить ящеров сотнями. Один из них: \"Славянский зажим пальцами\" - сильнейший известный нам прием", "../image/C.png"},
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
					"Name":        service.Name,
					"PhotoPath":   "../" + service.PhotoPath,
					"Description": service.Description,
				})
				return
			}
		}
	})

	app.Run(":8000")

	log.Println("Server down")
}
