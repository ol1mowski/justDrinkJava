# Konfiguracja Środowisk - JustDrinkJava Backend

## Przegląd

Aplikacja JustDrinkJava obsługuje trzy główne środowiska:
- **Local** - Środowisko developerskie
- **Production** - Środowisko produkcyjne
- **Test** - Środowisko testowe

## Pliki Konfiguracyjne

### 1. application.properties (Domyślny)
Główny plik konfiguracyjny z ustawieniami domyślnymi i zmiennymi środowiskowymi.

### 2. application-local.properties
Konfiguracja dla lokalnego developmentu:
- MySQL na localhost:3306
- Pełne logowanie SQL
- CORS dla frontend developmentu
- Wszystkie endpointy Actuator dostępne

### 3. application-prod.properties
Konfiguracja produkcyjna:
- Zmienne środowiskowe dla wszystkich konfiguracji
- Ograniczone logowanie
- Tylko podstawowe endpointy Actuator
- Bezpieczne ustawienia

### 4. application-test.properties
Konfiguracja testowa:
- Baza danych H2 w pamięci
- Brak logowania SQL
- Specjalne ustawienia dla testów

## Uruchamianie Aplikacji

### 1. Środowisko Lokalne

```bash
# Opcja 1: Użycie skryptu
./run.sh local

# Opcja 2: Maven
cd server
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Opcja 3: Zmienne środowiskowe
export SPRING_PROFILES_ACTIVE=local
cd server
mvn spring-boot:run
```

**Wymagania:**
- MySQL 8.0+ zainstalowany i uruchomiony
- Java 21
- Maven 3.9+

### 2. Środowisko Produkcyjne

```bash
# Opcja 1: Skrypt
./run.sh prod

# Opcja 2: JAR
cd server
mvn clean package -DskipTests
java -jar target/JustDrinkJava-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# Opcja 3: Docker
./run.sh docker
```

### 3. Środowisko Testowe

```bash
# Opcja 1: Skrypt
./run.sh test

# Opcja 2: Maven
cd server
mvn test -Dspring.profiles.active=test
```

## Docker

### Dockerfile
Zawiera:
- Multi-stage build dla optymalizacji
- Non-root user dla bezpieczeństwa
- Health check
- Optymalizacje JVM dla kontenerów

### docker-compose.yml
Usługi:
- **mysql** - Baza danych MySQL 8.0
- **server** - Backend Spring Boot
- **client** - Frontend React

## Zmienne Środowiskowe

### Baza Danych
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/justdrinkjava
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
```

### JWT
```bash
APP_JWT_SECRET=your_secret_key_here
APP_JWT_EXPIRATION=86400000
```

### Serwer
```bash
SERVER_PORT=8080
```

### Logowanie
```bash
LOGGING_LEVEL_WEB=DEBUG
LOGGING_LEVEL_SQL=DEBUG
LOGGING_LEVEL_HIBERNATE_BINDER=TRACE
LOGGING_LEVEL_APP=DEBUG
```

## Najlepsze Praktyki

### 1. Lokalne Środowisko
- Używaj profilu `local`
- Uruchamiaj MySQL lokalnie
- Konfiguruj CORS dla frontend developmentu

### 2. Produkcja
- Zawsze używaj profilu `prod`
- Ustawiaj zmienne środowiskowe w kontenerze
- Nigdy nie umieszczaj sekretów w kodzie

### 3. Testy
- Używaj profilu `test`
- Baza H2 w pamięci
- Mocki dla zewnętrznych usług

## Rozwiązywanie Problemów

### Problem: Brak połączenia z bazą danych
```bash
# Sprawdź czy MySQL działa
brew services list | grep mysql  # macOS
sudo systemctl status mysql      # Linux

# Sprawdź połączenie
mysql -u root -p -h localhost -P 3306
```

### Problem: Port zajęty
```bash
# Znajdź proces na porcie 8080
lsof -i :8080

# Zmień port
export SERVER_PORT=8081
```

### Problem: Błąd JWT
```bash
# Sprawdź czy klucz JWT jest ustawiony
echo $APP_JWT_SECRET
```

## Monitoring

### Health Check
```bash
# Lokalne
curl http://localhost:8080/api/actuator/health

# Produkcja
curl http://localhost:8080/api/actuator/health
```

### Metryki
```bash
# Tylko w środowisku lokalnym
curl http://localhost:8080/api/actuator/metrics
```

## Bezpieczeństwo

### 1. Lokalne Środowisko
- Używaj słabszych haseł dla wygody
- Pełne logowanie dla debugowania

### 2. Produkcja
- Silne hasła i sekrety
- Minimalne logowanie
- Ograniczone endpointy Actuator

### 3. Przechowywanie Sekretów
- Nigdy nie commituj `.env` do repo
- Używaj zmiennych środowiskowych
- Rozważ narzędzia typu HashiCorp Vault

## Automatyzacja

### Skrypt run.sh
```bash
./run.sh local    # Środowisko lokalne
./run.sh prod     # Produkcja
./run.sh test     # Testy
./run.sh docker   # Docker Compose
./run.sh stop     # Zatrzymanie kontenerów
./run.sh clean    # Czyszczenie
```

### CI/CD
Przykładowe komendy dla pipeline:
```bash
# Build
mvn clean package -DskipTests

# Test
mvn test -Dspring.profiles.active=test

# Deploy
docker-compose up -d
``` 