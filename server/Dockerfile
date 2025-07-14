# Multi-stage build for optimized production image
FROM maven:3.9.6-openjdk-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first for better Docker layer caching
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# Production stage
FROM openjdk:21-jdk-slim

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/target/JustDrinkJava-0.0.1-SNAPSHOT.jar app.jar

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Environment variables with default values
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080
ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/justdrinkjava?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=root
ENV APP_JWT_SECRET=change_this_secret_in_production_very_long_value_for_security
ENV APP_JWT_EXPIRATION=86400000

# Expose port
EXPOSE ${SERVER_PORT}

# JVM optimizations for containers
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Run application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]