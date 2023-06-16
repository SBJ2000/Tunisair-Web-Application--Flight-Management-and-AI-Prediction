# Tunisair-Web-Application--Flight-Management-and-AI-Prediction

![Project Logo](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/logo.png)

## Project Description

This project showcases the development of a web application for Tunisair, an airline company. The primary objective of the application is to simplify and optimize the management of flights, cabin crew, and in-flight catering partners. Moreover, the project incorporates an artificial intelligence module for predicting flight delays, contributing to better planning and a smoother travel experience for passengers.

This readme file provides an overview of the project, highlighting key features like flight scheduling, crew management, catering partner management, and delay prediction. The technologies employed in the development include Angular and Spring Boot for the frontend and backend respectively. JWT is utilized to ensure data security, while the AI model is based on Catboost Regressor.

The file also delves into the architecture and design of the application, offering detailed insights into the various components, their interactions, and integration. Additionally, it discusses design choices, data models, and workflows that form the foundation of the application.

### Users & roles :
The application is designed for 3 types of users , and each of them has a specific role:
![Roles Details](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/roles.png)

## Installation & Usage

### Prerequisites

![JDK](https://img.shields.io/badge/JDK-1.8-blue) 

    Java Development Kit (JDK): Install JDK to run Spring Boot, as it is a Java-based framework.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.5.0-green)

    Spring Boot: Set up and configure Spring Boot for your backend development. You can use Spring Initializr to generate a new Spring Boot project.
![Angular](https://img.shields.io/badge/Angular-12.0.0-red)

     Angular CLI: Install Angular CLI to create and manage your Angular frontend application. It provides useful commands for development and building Angular projects.
![JWT](https://img.shields.io/badge/Authentication-JWT-green)

    JSON Web Tokens (JWT): Familiarize yourself with the concepts of JWT and how to implement JWT-based authentication and authorization in your Spring Boot backend and Angular frontend.
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)

    Database: Determine the database you will use for your project. Spring Boot supports various databases, such as MySQL, PostgreSQL, Oracle, and H2 (for development purposes), in this project I used MySQL Datebase.
![IntelliJ IDEA](https://img.shields.io/badge/IDE-IntelliJ%20IDEA-blue)
![Visual Studio Code](https://img.shields.io/badge/IDE-Visual%20Studio%20Code-blue)
   
     IDE (Integrated Development Environment): Choose an IDE of your preference for coding. For example in this project I used IntelliJ for Spring Boot & Visual Studio Code for Angular.

![Catboost Regressor](https://img.shields.io/badge/ML%20Model-Catboost%20Regressor-orange)
![Python](https://img.shields.io/badge/Language-Python-blue)

    Catboost Regressor: Understand the Catboost Regressor model and its implementation. Make sure you have the necessary Python libraries and dependencies installed for working with Catboost, such as Catboost.
![Git](https://img.shields.io/badge/Version%20Control-Git-red)

    Git: Use Git for version control and managing your project's source code. Set up a Git repository to track changes and collaborate with other team members if needed.
![Maven](https://img.shields.io/badge/Build%20Tool-Maven-blue)
![npm](https://img.shields.io/badge/Package%20Manager-npm-red)

    Package Managers: Use Maven for managing dependencies in your Spring Boot project and npm (Node Package Manager) for managing dependencies in your Angular project.
### Installation

For the back end part using Spring Boot , you need to have these dependecies :
![Spring Boot Dependecies](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/Spring%20Boot%20Dependecies.png)

And to install them you can use this commande line: "mvn clean install", then run your Back-end application using  the start button from the IDE.


In the angular project you need to have this ones:
![Angular Dependecies](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/Angular%20Dependencies.png)

And to install them you can use the commande line : "npm install", then you can run your application using the commaned: "ng serve".
### Usage

Let's have a look on the project with some screenshoots from inside : 
At the begining, you will see the login page :
![Login Page](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/Login.png)

Inside the Admin Dashboard :
![Admin Page](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/Admin.png)

Inside the Moderator Dashboard :
![Moderator Page](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/Moderator.png)

Inside the User Dashboard :
![User Page](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/User.png)

For the AI Production it is integrated with the front End Interface just like this :
![IA Predection Page](https://github.com/SBJ2000/Tunisair-Web-Application--Flight-Management-and-AI-Prediction/blob/main/Images/IAPrediction.png)

## Conclusion
In conclusion, the Tunisair Web Application for Flight Management and AI Prediction is a comprehensive project that aims to streamline and enhance the management of flights, cabin crew, and in-flight catering partners. The application incorporates advanced technologies such as Angular, Spring Boot, JWT authentication, MySQL database, and Catboost Regressor AI model.

The README file provides an overview of the project, including its objectives and key features. It also outlines the prerequisites for setting up the development environment, such as the required JDK, Spring Boot, Angular CLI, JWT, MySQL, IDEs (IntelliJ IDEA and Visual Studio Code), Catboost Regressor, Git, and package managers (Maven and npm).

The installation section highlights the necessary dependencies for both the Spring Boot backend and Angular frontend. It provides an insight into the project structure and the dependencies required to run the application successfully.

The usage section showcases the application through screenshots, giving a glimpse of the login page and different dashboards for the admin, moderator, and user roles. Additionally, it demonstrates the integration of AI prediction within the frontend interface.

The README file serves as a comprehensive guide for developers and users alike, providing the necessary information to understand, install, and use the Tunisair Web Application. It enables a smooth onboarding process and facilitates collaboration among team members.

Overall, the project demonstrates the effective utilization of various technologies and tools to create a robust web application for flight management, while incorporating AI for flight delay prediction.


