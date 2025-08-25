# Etapa de build
FROM maven:3.9.2-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o pom.xml e os arquivos do projeto
COPY pom.xml .
COPY src ./src

# Build do projeto
RUN mvn clean package -DskipTests

# Etapa de runtime
FROM eclipse-temurin:17-jdk-jammy

# Define o diretório de trabalho
WORKDIR /app

# Expõe a porta do Spring Boot
EXPOSE 8080

# Copia o .jar gerado na etapa de build
COPY --from=build /app/target/todo.api-0.0.1-SNAPSHOT.jar app.jar

# Comando para rodar o app
ENTRYPOINT ["java", "-jar", "app.jar"]