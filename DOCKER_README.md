# 🐳 Docker Configuration dla JustDrinkJava

## 📋 Wymagania

- Docker 20.10 lub nowszy
- Docker Compose 2.0 lub nowszy
- Minimum 2GB RAM dla kontenerów

## 🚀 Szybkie uruchomienie

### Uruchomienie całej aplikacji

```bash
# Zbuduj i uruchom wszystkie usługi
docker-compose up -d

# Sprawdź status kontenerów
docker-compose ps

# Sprawdź logi
docker-compose logs -f app
```

### Uruchomienie tylko serwera (bez bazy danych)

```bash
# Zbuduj obraz aplikacji
docker build -t justdrinkjava-server ./server

# Uruchom kontener (wymaga zewnętrznej bazy MySQL)
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/justdrinkjava \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  justdrinkjava-server
```

## 🌐 Dostępne endpoint-y

- **Aplikacja:** http://localhost:8080/api
- **Health Check:** http://localhost:8080/api/actuator/health
- **Baza danych MySQL:** localhost:3306
  - Baza: `justdrinkjava`
  - User: `root`
  - Hasło: `root`

## 🔧 Konfiguracja

### Zmienne środowiskowe

Można nadpisać domyślne ustawienia używając zmiennych środowiskowych:

```bash
# Konfiguracja bazy danych
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/justdrinkjava
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root

# Konfiguracja serwera
SERVER_PORT=8080
SERVER_SERVLET_CONTEXT_PATH=/api

# Konfiguracja JWT
APP_JWT_SECRET=your-secret-key
APP_JWT_EXPIRATION=86400000

# Profil Spring Boot
SPRING_PROFILES_ACTIVE=prod
```

### Profile

- **dev:** Profil deweloperski (domyślny)
- **prod:** Profil produkcyjny (używany w Docker)

## 🔧 Komendy użyteczne

### Budowanie

```bash
# Zbuduj tylko aplikację
docker-compose build app

# Zbuduj z czystym cache
docker-compose build --no-cache app
```

### Zarządzanie

```bash
# Zatrzymaj wszystkie usługi
docker-compose down

# Zatrzymaj i usuń volumes
docker-compose down -v

# Sprawdź logi konkretnej usługi
docker-compose logs -f mysql
docker-compose logs -f app

# Wejdź do kontenera
docker-compose exec app sh
docker-compose exec mysql mysql -u root -p
```

### Monitorowanie

```bash
# Sprawdź zasoby
docker-compose top

# Sprawdź health check
curl http://localhost:8080/api/actuator/health

# Sprawdź metryki
docker stats justdrinkjava-app justdrinkjava-mysql
```

## 🗄️ Zarządzanie bazą danych

### Backup

```bash
# Stwórz backup bazy danych
docker-compose exec mysql mysqldump -u root -p justdrinkjava > backup.sql
```

### Restore

```bash
# Przywróć bazę danych
docker-compose exec -T mysql mysql -u root -p justdrinkjava < backup.sql
```

### Dostęp do MySQL

```bash
# Połącz się z bazą danych
docker-compose exec mysql mysql -u root -p

# Lub z zewnątrz
mysql -h localhost -P 3306 -u root -p justdrinkjava
```

## 🛠️ Troubleshooting

### Problemy z uruchomieniem

1. **Port już zajęty:**
   ```bash
   # Zmień port w docker-compose.yml
   ports:
     - "8081:8080"  # zamiast 8080:8080
   ```

2. **Brak pamięci:**
   ```bash
   # Zwiększ pamięć dla Docker Desktop
   # Lub zmniejsz heap size dla JVM
   JAVA_OPTS="-Xmx512m -Xms256m"
   ```

3. **Problemy z bazą danych:**
   ```bash
   # Sprawdź logi MySQL
   docker-compose logs mysql
   
   # Wyczyść volumes i uruchom ponownie
   docker-compose down -v
   docker-compose up -d
   ```

### Logi

```bash
# Wszystkie logi
docker-compose logs

# Logi z timestamp
docker-compose logs -t

# Ostatnie 100 linii
docker-compose logs --tail=100 app
```

## 🔒 Bezpieczeństwo

**WAŻNE:** Przed wdrożeniem na produkcję:

1. Zmień hasło do bazy danych
2. Zmień JWT secret
3. Użyj zewnętrznej bazy danych
4. Skonfiguruj SSL/TLS
5. Dodaj monitoring i logging

## 📝 Notatki

- Dane MySQL są persystowane w volume `mysql_data`
- Aplikacja automatycznie czeka na uruchomienie MySQL
- Health check jest dostępny pod `/api/actuator/health`
- Kontener uruchamia się jako non-root user dla bezpieczeństwa 