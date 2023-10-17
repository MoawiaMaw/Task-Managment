FROM maven:3.9.4 AS build
WORKDIR /app/server
COPY pom.xml /app/server/
RUN mvn dependency:resolve
COPY . /app/server/
RUN mvn clean
RUN mvn package -DskipTests

FROM openjdk:17-jdk-alpine
COPY --from=build /app/server/target/*.jar app.jar
EXPOSE 8080
CMD [ "java", "-jar", "app.jar" ]