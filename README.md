# �� Just Drink Java

A modern web application built for the Java Developer community. This project combines an elegant React frontend with a powerful Spring Boot backend.

## 🚀 Tech Stack

### Frontend

- **React 19.1.0** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 6.3.5** - Fast build tool and dev server
- **TailwindCSS 4.1.8** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Vitest** - Lightning fast testing framework
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Framer Motion** - Animation library

### Backend

- **Spring Boot 3.5.0** - Enterprise Java framework
- **Java 17** - LTS version of Java
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data access layer
- **PostgreSQL** - Advanced open-source relational database
- **Lombok** - Reduces boilerplate code
- **Maven** - Dependency management and build tool
- **JUnit 5** - Testing framework

### Database & Infrastructure

- **PostgreSQL** - Primary database (Neon cloud)
- **Docker & Docker Compose** - Containerization
- **Maven** - Build automation

## 📁 Project Structure

```
justDrinkJava/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── api/            # API layer
│   │   ├── translations/   # i18n translations
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Backend (Spring Boot)
│   ├── src/main/java/pl/justdrinkjava/JustDrinkJava/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── entity/         # JPA entities
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── mapper/         # Object mapping
│   │   ├── config/         # Configuration classes
│   │   └── exception/      # Exception handling
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── application-local.properties
│   │   └── application-prod.properties
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml      # Docker services
├── env.example            # Environment variables template
└── README.md
```

## 🛠️ Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Java 17** (JDK)
- **Maven 3.6+**
- **Docker & Docker Compose** (optional, for containerized development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/justDrinkJava.git
cd justDrinkJava
```

### 2. Environment Setup

Copy the environment template and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Environment Configuration
SPRING_PROFILES_ACTIVE=local

# Server Configuration
SERVER_PORT=8080

# Database Configuration (PostgreSQL)
SPRING_DATASOURCE_URL=postgresql://username:password@host:5432/database
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# JWT Configuration
APP_JWT_SECRET=your-super-secret-jwt-key-change-in-production
APP_JWT_EXPIRATION=86400000

# Frontend Configuration
VITE_API_URL=http://localhost:8080/api

# Logging Configuration
LOGGING_LEVEL_WEB=DEBUG
LOGGING_LEVEL_SQL=DEBUG
LOGGING_LEVEL_HIBERNATE_BINDER=TRACE
LOGGING_LEVEL_APP=DEBUG

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=*
CORS_ALLOW_CREDENTIALS=true

# Actuator Configuration
MANAGEMENT_ENDPOINTS_INCLUDE=health,info,metrics
MANAGEMENT_HEALTH_SHOW_DETAILS=always
```

### 3. Database Setup

#### Option A: Use Neon PostgreSQL (Recommended)

1. Create a free account at [Neon](https://neon.tech/)
2. Create a new database
3. Copy the connection string to your `.env` file

#### Option B: Local PostgreSQL

```bash
# Install PostgreSQL and create database
createdb justdrinkjava
# Update .env with local connection string
SPRING_DATASOURCE_URL=postgresql://localhost:5432/justdrinkjava
```

### 4. Quick Start with Docker (Recommended)

```bash
# Start the application
docker-compose up --build

# The backend will be available at http://localhost:8080
# The frontend will be available at http://localhost:5173
```

### 5. Manual Setup

#### Backend Setup

```bash
cd server

# Run with Maven
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

#### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🐳 Docker Development

### Full Stack Development

```bash
# Start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services

```bash
# Build and run backend only
cd server
docker build -t justdrinkjava-server .
docker run -p 8080:8080 --env-file ../.env justdrinkjava-server

# Frontend runs locally (not containerized)
cd client
npm run dev
```

## 📜 Available Scripts

### Frontend (client/)

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run lint         # Lint code
```

### Backend (server/)

```bash
./mvnw spring-boot:run              # Run application
./mvnw test                         # Run tests
./mvnw clean test jacoco:report     # Tests with coverage report
./mvnw clean package                # Build JAR
./mvnw spring-boot:build-image      # Build Docker image
```

#### Quick Coverage Scripts

```bash
# Windows
cd server && coverage.bat

# Linux/macOS
cd server && ./coverage.sh
```

## 🧪 Testing

### Backend Testing

- **Test Coverage**: 85% (3,892/4,594 instructions)
- **Test Status**: ✅ 740/740 tests passing (100% success)
- **Coverage Report**: Available at `server/target/site/jacoco/index.html`

### Frontend Testing

- **Framework**: Vitest + React Testing Library + MSW
- **Test Status**: 12/15 tests passing (80% success)
- **Coverage**: Available with `npm run test:coverage`

## 🔧 Development Workflow

### Adding New Features

1. **Backend**: Add endpoints in controllers, implement services
2. **Frontend**: Create components, hooks, and API calls
3. **Database**: Update entities and repositories
4. **Testing**: Add unit and integration tests

### Code Quality

```bash
# Backend
./mvnw clean verify

# Frontend
npm run lint
npm run test
```

## 🌟 Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Mode** - Theme switching
- ✅ **Internationalization** - Multi-language support
- ✅ **Authentication** - JWT-based security
- ✅ **RESTful API** - Clean API design
- ✅ **Data Validation** - Input validation
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Testing** - Unit and integration tests
- ✅ **Docker Support** - Containerized development
- ✅ **PostgreSQL** - Modern database with advanced features

## 🔗 API Documentation

### Base URL

- **Development**: `http://localhost:8080/api`
- **Production**: Your deployed API URL

### Main Endpoints

```
GET    /api/health              # Application health status
POST   /api/auth/login          # User authentication
POST   /api/auth/register       # User registration
GET    /api/posts               # Get all posts
GET    /api/posts/{id}          # Get post by ID
GET    /api/categories          # Get all categories
GET    /api/users/profile       # Get user profile
```

### Authentication

```bash
# Login example
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"password"}'

# Authenticated request
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment

### Environment Variables for Production

```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=your-production-database-url
APP_JWT_SECRET=your-production-jwt-secret
CORS_ALLOWED_ORIGINS=https://your-domain.com
LOGGING_LEVEL_WEB=WARN
LOGGING_LEVEL_SQL=WARN
MANAGEMENT_HEALTH_SHOW_DETAILS=never
```

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📊 Project Statistics

- **Backend Coverage**: 85% (740/740 tests passing)
- **Frontend Coverage**: 80% (12/15 tests passing)
- **Total Lines of Code**: 4,594+ (backend) + frontend
- **Languages**: Java, TypeScript, SQL
- **Components**: 46+ backend classes, 50+ frontend components

## 🔮 Roadmap

- [ ] **User Management System** - Complete user profiles and settings
- [ ] **Admin Dashboard** - Administrative interface
- [ ] **Real-time Features** - WebSocket implementation
- [ ] **Mobile App** - React Native version
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Performance Optimization** - Caching and optimization
- [ ] **API Rate Limiting** - Request throttling
- [ ] **Advanced Search** - Elasticsearch integration

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project**: [Just Drink Java](https://github.com/ol1mowski/justDrinkJava)
- **Issues**: [GitHub Issues](https://github.com/ol1mowski/justDrinkJava/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ol1mowski/justDrinkJava/discussions)

## 🙏 Acknowledgments

- Spring Boot Team for the excellent framework
- React Team for the powerful UI library
- Neon for reliable PostgreSQL hosting
- Open source community for inspiration

---

**Made with ❤️ and ☕ by the Java Developer Community**
