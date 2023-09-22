package main

import (
	"Lab1/internal/api"
	"log"
)

func main() {
	log.Println("r start!")
	api.StartServer()
	log.Println("r terminated!")
}
