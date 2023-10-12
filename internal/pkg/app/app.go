package app

import (
	"log"
	"net/http"

	"kingdoms/internal/app/ds"
	"kingdoms/internal/app/dsn"
	"kingdoms/internal/app/repository"

	"github.com/gin-gonic/gin"
)

type Application struct {
	repo repository.Repository
	r    *gin.Engine
}

func New() Application {
	app := Application{}

	repo, _ := repository.New(dsn.FromEnv())

	app.repo = *repo

	return app

}

func (a *Application) StartServer() {
	log.Println("Server started")

	a.r = gin.Default()

	a.r.LoadHTMLGlob("../../templates/*.html")
	a.r.Static("/css", "../../templates/css")
	a.r.Static("/js", "../../templates/js")

	a.r.GET("kingdoms", a.getKingdoms)
	a.r.GET("kingdom", a.getKingdom)
	a.r.GET("rulers", a.getRulers)
	a.r.GET("ruler", a.getRuler)

	a.r.PUT("kingdom/add", a.addKingdom)
	a.r.PUT("kingdom/edit", a.editKingdom)
	a.r.PUT("kingdom/add_to_ruler", a.kingdomAddToLastRuler)

	a.r.PUT("ruler/edit", a.editRuler)
	a.r.PUT("ruler/state_change/moderator", a.rulerStateChangeModerator)
	a.r.PUT("ruler/state_change/user", a.rulerStateChangeUser)

	a.r.PUT("kingdom/delete/:kingdom_name", a.deleteKingdom)
	a.r.PUT("kingdom/ruler/:ruler_name", a.deleteRuler)

	a.r.DELETE("kingdom_ruler_delete/:kingdom_name/:ruler_name/:ruling_id", a.deleteKingdomRuler)

	a.r.GET("login", a.checkLogin)
	a.r.PUT("login", a.login)
	a.r.PUT("signup", a.signup)
	a.r.DELETE("logout", a.logout)

	a.r.Run(":8000")

	log.Println("Server is down")
}

func (a *Application) getKingdoms(ctx *gin.Context) {

}

func (a *Application) getKingdom(ctx *gin.Context) {
	var kingdom ds.Kingdom
	if err := ctx.BindJSON(&kingdom); err != nil {
		ctx.Error(err)
		return
	}

	necessaryKingdom, err := a.repo.GetKingdom(kingdom)
	if err != nil {
		ctx.Error(err)
		return
	}
	if necessaryKingdom == nil {
		ctx.JSON(http.StatusNotFound, nil)
	}

	ctx.JSON(http.StatusFound, necessaryKingdom)
}

func (a *Application) getRulers(ctx *gin.Context) {

}

func (a *Application) getRuler(ctx *gin.Context) {

}

func (a *Application) addKingdom(ctx *gin.Context) {

}

func (a *Application) editKingdom(ctx *gin.Context) {

}

func (a *Application) kingdomAddToLastRuler(ctx *gin.Context) {

}

func (a *Application) editRuler(ctx *gin.Context) {

}

func (a *Application) rulerStateChangeModerator(ctx *gin.Context) {

}

func (a *Application) rulerStateChangeUser(ctx *gin.Context) {

}

func (a *Application) deleteKingdom(ctx *gin.Context) {

}

func (a *Application) deleteRuler(ctx *gin.Context) {

}

func (a *Application) deleteKingdomRuler(ctx *gin.Context) {

}

func (a *Application) checkLogin(ctx *gin.Context) {

}

func (a *Application) login(ctx *gin.Context) {

}

func (a *Application) signup(ctx *gin.Context) {

}

func (a *Application) logout(ctx *gin.Context) {

}

// func (a *Application) loadKingdoms(c *gin.Context) {
// 	kingdomName := c.Query("kingdom_name")

// 	if kingdomName == "" {
// 		allKingdoms, err := a.repo.GetAllKingdoms()

// 		if err != nil {
// 			log.Println(err)
// 			c.Error(err)
// 		}

// 		c.HTML(http.StatusOK, "index.html", gin.H{
// 			"kingdoms": allKingdoms,
// 		})
// 	} else {
// 		foundKingdoms, err := a.repo.SearchKingdoms(kingdomName)

// 		if err != nil {
// 			c.Error(err)
// 			return
// 		}

// 		c.HTML(http.StatusOK, "index.html", gin.H{
// 			"kingdoms":   foundKingdoms,
// 			"searchText": kingdomName,
// 		})
// 	}
// }

// func (a *Application) loadKingdom(c *gin.Context) {
// 	kingdomName := c.Param("kingdom_name")

// 	if kingdomName == "favicon.ico" {
// 		return
// 	}

// 	kingdom, err := a.repo.GetKingdomByName(kingdomName)

// 	if err != nil {
// 		c.Error(err)
// 		return
// 	}

// 	c.HTML(http.StatusOK, "kingdom.html", gin.H{
// 		"Name":        kingdom.Name,
// 		"Image":       kingdom.Image,
// 		"Description": kingdom.Description,
// 		"Capital":     kingdom.Capital,
// 		"Area":        kingdom.Area,
// 		"State":       kingdom.State,
// 	})
// }

// func (a *Application) loadKingdomChangeVisibility(c *gin.Context) {
// 	kingdomName := c.Param("kingdom_name")
// 	err := a.repo.ChangeKingdomVisibility(kingdomName)

// 	if err != nil {
// 		c.Error(err)
// 	}

// 	c.Redirect(http.StatusFound, "/"+kingdomName)
// }
