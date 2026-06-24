# Backend Spring - Projet d'Apprentissage

## Contexte

Ce projet est réalisé dans le cadre de la formation **M2 Ynov Campus - Ingénieur Développeur Full Stack**.  
Il a pour objectif l'apprentissage et la mise en pratique du framework **Spring Boot**.

## Technologies utilisées

- Java
- Spring Boot
- Spring Web
- H2 Database (base de données en mémoire)
- Swagger/OpenAPI pour la documentation de l'API
- Maven

## URLs d'accès

Une fois l'application démarrée, vous pouvez accéder aux différentes interfaces :

### Page d'accueil
```
http://localhost:8080/
```

### Documentation API Swagger
Interface interactive pour tester les endpoints de l'API :
```
http://localhost:8080/swagger-ui/index.html
```

### Console H2 Database
Interface d'administration de la base de données H2 :
```
http://localhost:8080/h2-console/login.jsp
```

**Configuration de connexion H2 :**
- JDBC URL : `jdbc:h2:mem:testdb`
- Username : `sa`
- Password : *(laisser vide)*

## 📦 Installation et démarrage

### Prérequis
- Java JDK 17 ou supérieur
- Maven 3.6+

### Lancer l'application

```bash
# Avec Maven
mvn spring-boot:run

# Ou avec le wrapper Maven
./mvnw spring-boot:run  # Linux/Mac
mvnw.cmd spring-boot:run  # Windows
```

L'application démarre sur le port **8080** par défaut.

## Structure du projet

```
src/
├── main/
│   ├── java/LinkiZ/Ynov/demo/
│   │   ├── BackendSpringApplication.java
│   │   ├── controllers/
│   │   │   ├── HomeController.java
│   │   │   └── NoteController.java
│   │   ├── model/
│   │   │   └── Note.java
│   │   └── payload/
│   │       ├── requests/
│   │       │   └── HomeRequest.java
│   │       └── responses/
│   │           └── HomeResponse.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/LinkiZ/Ynov/demo/
        └── BackendSpringApplicationTests.java
```

## Fonctionnalités

- API REST pour la gestion de notes
- Documentation automatique avec Swagger
- Base de données H2 en mémoire
- Contrôleurs REST