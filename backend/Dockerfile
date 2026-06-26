# --- Étape de Build ---
FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

# Copie des fichiers du wrapper Maven
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd pom.xml ./

# Assurer les droits d'exécution sur le script mvnw
RUN chmod +x mvnw

# Télécharger les dépendances pour mettre en cache l'étape de téléchargement
RUN ./mvnw dependency:go-offline -B

# Copie du code source
COPY src/ src/

# Compilation et empaquetage (sans exécuter les tests pour gagner du temps au build de l'image)
RUN ./mvnw clean package -DskipTests -B

# --- Étape de Runtime ---
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Sécurisation du conteneur en créant un utilisateur non-root dédié
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copie du JAR généré depuis l'étape précédente
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "app.jar"]
