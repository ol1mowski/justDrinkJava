# 🍵 Just Drink Java

Aplikacja webowa stworzona z myślą o miłośnikach kawy i społeczności Java Developer. Projekt łączy w sobie elegancki frontend w React z potężnym backendem w Spring Boot.

## 🚀 Technologie

### Frontend
- **React 19.1.0** - Nowoczesna biblioteka do tworzenia interfejsów użytkownika
- **TypeScript** - Typowane rozszerzenie JavaScript
- **Vite** - Szybki bundler i narzędzie deweloperskie
- **TailwindCSS 4.1.8** - Framework CSS do stylizacji
- **Heroicons** - Zestaw ikon

### Backend
- **Spring Boot 3.5.0** - Framework do tworzenia aplikacji Java
- **Java 24** - Najnowsza wersja języka Java
- **Spring Security** - Zabezpieczenia aplikacji
- **Spring Data JPA** - Warstwa dostępu do danych
- **MySQL** - Relacyjna baza danych
- **Lombok** - Biblioteka redukująca boilerplate code
- **Maven** - Zarządzanie zależnościami

## 📁 Struktura projektu

```
justDrinkJava/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Komponenty React
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Funkcje pomocnicze
│   │   ├── assets/         # Zasoby statyczne
│   │   ├── translations/   # Tłumaczenia
│   │   ├── App.tsx         # Główny komponent
│   │   └── main.tsx        # Punkt wejścia
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Backend (Spring Boot)
│   ├── src/main/java/pl/justdrinkjava/JustDrinkJava/
│   │   ├── controller/     # Kontrolery REST
│   │   ├── service/        # Logika biznesowa
│   │   ├── repository/     # Warstwa dostępu do danych
│   │   ├── entity/         # Encje JPA
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── mapper/         # Mapowanie obiektów
│   │   ├── config/         # Konfiguracja
│   │   └── exception/      # Obsługa błędów
│   └── pom.xml
└── README.md
```

## 🛠️ Instalacja i uruchomienie

### Wymagania wstępne

- **Node.js** (wersja 18 lub wyższa)
- **Java 24**
- **Maven 3.6+**
- **MySQL 8.0+**

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/twoj-username/justDrinkJava.git
cd justDrinkJava
```

### 2. Konfiguracja bazy danych

Utwórz bazę danych MySQL:

```sql
CREATE DATABASE justdrinkjava;
CREATE USER 'justdrinkjava_user'@'localhost' IDENTIFIED BY 'twoje_hasło';
GRANT ALL PRIVILEGES ON justdrinkjava.* TO 'justdrinkjava_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Konfiguracja backendu

```bash
cd server
```

Utwórz plik `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/justdrinkjava?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=justdrinkjava_user
spring.datasource.password=twoje_hasło
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=8080

# Security Configuration
app.jwt.secret=tajny_klucz_jwt_zmien_na_produkcji
app.jwt.expiration=86400000
```

### 4. Uruchomienie backendu

```bash
# Będąc w folderze server/
./mvnw spring-boot:run

# Lub na Windows:
mvnw.cmd spring-boot:run
```

Backend będzie dostępny pod adresem: `http://localhost:8080`

### 5. Uruchomienie frontendu

Otwórz nowy terminal:

```bash
cd client
npm install
npm run dev
```

Frontend będzie dostępny pod adresem: `http://localhost:5173`

## 📜 Dostępne skrypty

### Frontend (client/)
- `npm run dev` - Uruchomienie serwera deweloperskiego
- `npm run build` - Budowanie aplikacji produkcyjnej
- `npm run preview` - Podgląd zbudowanej aplikacji
- `npm run lint` - Sprawdzanie jakości kodu

### Backend (server/)
- `./mvnw spring-boot:run` - Uruchomienie aplikacji
- `./mvnw test` - Uruchomienie testów
- `./mvnw clean package` - Budowanie JAR
- `./mvnw spring-boot:build-image` - Tworzenie obrazu Docker

## 🔧 Rozwój aplikacji

### Dodawanie nowych funkcji

1. **Frontend**: Utwórz nowe komponenty w `client/src/components/`
2. **Backend**: Dodaj nowe endpointy w odpowiednich kontrolerach
3. **Baza danych**: Modyfikuj encje w `server/src/main/java/.../entity/`

### Testowanie

```bash
# Backend
cd server
./mvnw test

# Frontend
cd client
npm run test # (jeśli zostanie dodane)
```

## 🌟 Funkcjonalności

- ✅ Responsywny design
- ✅ Tryb ciemny/jasny
- ✅ Wielojęzyczność
- ✅ Zabezpieczenia Spring Security
- ✅ RESTful API
- ✅ Walidacja danych
- ✅ Obsługa błędów

## 📝 API Documentation

API będzie dostępne pod adresem `http://localhost:8080/api/v1/`

### Główne endpointy:
- `GET /api/v1/health` - Status aplikacji
- `POST /api/v1/auth/login` - Logowanie
- `POST /api/v1/auth/register` - Rejestracja

## 🤝 Współpraca

1. Sforkuj projekt
2. Utwórz branch funkcjonalności (`git checkout -b feature/AmazingFeature`)
3. Zatwierdź zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Wypchnij do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest udostępniony na licencji MIT. Zobacz plik `LICENSE` po szczegóły.

## 📞 Kontakt

- **Autor**: [Twoje Imię]
- **Email**: [twoj@email.com]
- **GitHub**: [@twoj-username](https://github.com/twoj-username)

## 🔮 Roadmapa

- [ ] Implementacja systemu użytkowników
- [ ] Dashboard administratora
- [ ] Integracja z API zewnętrznymi
- [ ] Aplikacja mobilna (React Native)
- [ ] Dockeryzacja aplikacji
- [ ] CI/CD pipeline

---

**Zrobione z ❤️ i ☕ przez społeczność Java**
