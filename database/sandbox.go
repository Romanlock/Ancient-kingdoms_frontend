package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

type Service struct {
	Name        string
	Description string
	PhotoPath   string
}

func main() {
	file, err := os.Open("resources/static/services.json")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	data, err := ioutil.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	var services []Service
	err = json.Unmarshal(data, &services)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(services)
}
