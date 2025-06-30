FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

RUN apk add --no-cache curl

COPY mvnw .
COPY mvnw.cmd .
COPY .mvn/wrapper/maven-wrapper.properties .mvn/wrapper/
COPY .mvn/wrapper/maven-wrapper.jar .mvn/wrapper/
COPY pom.xml .

RUN chmod +x mvnw

RUN ls -la && ls -la .mvn/wrapper/

RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

COPY --from=builder /app/target/*.jar app.jar

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/api/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"] 