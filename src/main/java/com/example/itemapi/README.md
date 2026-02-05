# Item API (Spring Boot)

Simple Spring Boot REST API to manage items.

## Features
- Add new item
- Get item by ID
- In-memory storage (ArrayList)

## Tech Stack
- Java 21
- Spring Boot
- Maven

## Project Structure

src
└── main
├── java
│   └── com
│       └── example
│           └── itemapi
│               ├── controller
│               ├── service
│               ├── model
│               └── ItemApiApplication.java
└── resources
└── application.properties

## Run the Application

```bash
mvn spring-boot:run