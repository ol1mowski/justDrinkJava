-- JustDrinkJava Test Data
-- Kategorie
INSERT INTO categories (name) VALUES 
('Java Basics'),
('Spring Framework'),
('Database'),
('Web Development'),
('Testing'),
('DevOps'),
('Architecture'),
('Best Practices');

-- Użytkownicy (hasła to: password123)
INSERT INTO users (email, username, password_hash, created_at) VALUES 
('admin@justdrinkjava.pl', 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '2024-01-01 10:00:00'),
('john.doe@example.com', 'johndoe', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '2024-01-02 11:30:00'),
('jane.smith@example.com', 'janesmith', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '2024-01-03 14:15:00'),
('mike.wilson@example.com', 'mikewilson', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '2024-01-04 09:45:00'),
('sarah.johnson@example.com', 'sarahjohnson', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '2024-01-05 16:20:00');

-- Posty
INSERT INTO posts (user_id, category_id, title, description, created_at, read_time, image_url) VALUES 
(1, 1, 'Wprowadzenie do Javy - Podstawy', 'Java to obiektowy język programowania stworzony przez firmę Sun Microsystems. W tym artykule poznasz podstawowe koncepcje Javy, w tym zmienne, typy danych, pętle i funkcje.', '2024-01-10 08:00:00', 5, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800'),
(2, 2, 'Spring Boot - Szybki start', 'Spring Boot to framework, który znacznie upraszcza tworzenie aplikacji Spring. Dowiedz się jak skonfigurować pierwszy projekt i uruchomić aplikację w kilka minut.', '2024-01-12 10:30:00', 8, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'),
(3, 3, 'JPA i Hibernate - Podstawy', 'JPA (Java Persistence API) to standard mapowania obiektowo-relacyjnego w Javie. Hibernate to najpopularniejsza implementacja JPA. Poznaj podstawy pracy z bazami danych.', '2024-01-15 14:20:00', 12, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800'),
(4, 4, 'REST API w Spring Boot', 'REST API to standard komunikacji między aplikacjami. Dowiedz się jak tworzyć RESTful API używając Spring Boot i Spring Web.', '2024-01-18 11:45:00', 10, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'),
(5, 5, 'Testowanie jednostkowe z JUnit 5', 'Testowanie to kluczowy element rozwoju oprogramowania. Poznaj JUnit 5 i naucz się pisać skuteczne testy jednostkowe dla swoich aplikacji Java.', '2024-01-20 16:10:00', 7, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'),
(1, 6, 'Docker dla programistów Java', 'Docker to narzędzie do konteneryzacji aplikacji. Dowiedz się jak używać Dockera do uruchamiania aplikacji Java w izolowanych środowiskach.', '2024-01-22 09:30:00', 15, 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800'),
(2, 7, 'Wzorce projektowe w Javie', 'Wzorce projektowe to sprawdzone rozwiązania problemów programistycznych. Poznaj najważniejsze wzorce i ich implementacje w Javie.', '2024-01-25 13:15:00', 20, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'),
(3, 8, 'Czysty kod w Javie', 'Pisanie czystego kodu to sztuka. Poznaj zasady SOLID, konwencje nazewnictwa i najlepsze praktyki pisania czytelnego kodu Java.', '2024-01-28 10:45:00', 8, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800');

-- Quizy
INSERT INTO quizzes (user_id, title, description, category, difficulty, time_limit, created_at) VALUES 
(1, 'Podstawy Javy', 'Test sprawdzający znajomość podstawowych koncepcji języka Java', 'Java Basics', 'EASY', 10, '2024-01-15 12:00:00'),
(2, 'Spring Framework', 'Quiz o Spring Framework i jego komponentach', 'Spring Framework', 'MEDIUM', 15, '2024-01-16 14:30:00'),
(3, 'Bazy danych i JPA', 'Test z zakresu baz danych i JPA/Hibernate', 'Database', 'HARD', 20, '2024-01-17 16:45:00'),
(4, 'REST API', 'Quiz sprawdzający wiedzę o REST API', 'Web Development', 'MEDIUM', 12, '2024-01-18 11:20:00'),
(5, 'Testowanie', 'Test z zakresu testowania jednostkowego', 'Testing', 'EASY', 8, '2024-01-19 09:15:00');

-- Pytania do quizów
INSERT INTO quizzes_content (quiz_id, question, options, correct_answer, created_at, updated_at) VALUES 
-- Quiz 1: Podstawy Javy
(1, 'Który typ danych w Javie jest używany do przechowywania liczb całkowitych?', '["int", "float", "String", "boolean"]', 'int', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
(1, 'Co oznacza słowo kluczowe "public" w Javie?', '["Prywatny dostęp", "Publiczny dostęp", "Chroniony dostęp", "Domyślny dostęp"]', 'Publiczny dostęp', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
(1, 'Jak deklaruje się tablicę w Javie?', '["array[]", "int[]", "Array()", "new array"]', 'int[]', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
(1, 'Która pętla jest używana gdy znamy liczbę iteracji?', '["while", "for", "do-while", "foreach"]', 'for', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
(1, 'Co to jest JVM?', '["Java Virtual Machine", "Java Visual Model", "Java Version Manager", "Java Variable Method"]', 'Java Virtual Machine', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),

-- Quiz 2: Spring Framework
(2, 'Co to jest Spring Boot?', '["Framework do testowania", "Framework do tworzenia aplikacji", "Narzędzie do debugowania", "Biblioteka do UI"]', 'Framework do tworzenia aplikacji', '2024-02-01 14:30:00', '2024-02-01 14:30:00'),
(2, 'Która adnotacja jest używana do oznaczania kontrolera REST?', '["@Controller", "@RestController", "@Service", "@Repository"]', '@RestController', '2024-02-01 14:30:00', '2024-02-01 14:30:00'),
(2, 'Co oznacza adnotacja @Autowired?', '["Automatyczne testowanie", "Automatyczne wstrzykiwanie zależności", "Automatyczne kompilowanie", "Automatyczne dokumentowanie"]', 'Automatyczne wstrzykiwanie zależności', '2024-02-01 14:30:00', '2024-02-01 14:30:00'),
(2, 'Który plik konfiguracyjny jest używany w Spring Boot?', '["web.xml", "application.properties", "pom.xml", "spring.xml"]', 'application.properties', '2024-02-01 14:30:00', '2024-02-01 14:30:00'),
(2, 'Co to jest Spring Security?', '["Framework do bezpieczeństwa", "Framework do testowania", "Framework do UI", "Framework do baz danych"]', 'Framework do bezpieczeństwa', '2024-02-01 14:30:00', '2024-02-01 14:30:00'),

-- Quiz 3: Bazy danych i JPA
(3, 'Co oznacza JPA?', '["Java Persistence API", "Java Programming Application", "Java Platform Architecture", "Java Performance Analysis"]', 'Java Persistence API', '2024-02-03 10:15:00', '2024-02-03 10:15:00'),
(3, 'Która adnotacja jest używana do mapowania encji?', '["@Entity", "@Table", "@Column", "@Id"]', '@Entity', '2024-02-03 10:15:00', '2024-02-03 10:15:00'),
(3, 'Co to jest Hibernate?', '["Implementacja JPA", "Baza danych", "Framework do testowania", "Narzędzie do kompilacji"]', 'Implementacja JPA', '2024-02-03 10:15:00', '2024-02-03 10:15:00'),
(3, 'Która adnotacja oznacza klucz główny?', '["@PrimaryKey", "@Id", "@Key", "@Main"]', '@Id', '2024-02-03 10:15:00', '2024-02-03 10:15:00'),
(3, 'Co to jest ORM?', '["Object-Relational Mapping", "Object-Runtime Model", "Object-Reference Method", "Object-Relation Model"]', 'Object-Relational Mapping', '2024-02-03 10:15:00', '2024-02-03 10:15:00'),

-- Quiz 4: REST API
(4, 'Co oznacza REST?', '["Representational State Transfer", "Remote State Transfer", "Resource State Transfer", "Request State Transfer"]', 'Representational State Transfer', '2024-02-05 16:45:00', '2024-02-05 16:45:00'),
(4, 'Który kod HTTP oznacza sukces?', '["200", "404", "500", "300"]', '200', '2024-02-05 16:45:00', '2024-02-05 16:45:00'),
(4, 'Która metoda HTTP jest używana do tworzenia zasobów?', '["GET", "POST", "PUT", "DELETE"]', 'POST', '2024-02-05 16:45:00', '2024-02-05 16:45:00'),
(4, 'Co oznacza kod HTTP 404?', '["Sukces", "Błąd serwera", "Nie znaleziono", "Przekierowanie"]', 'Nie znaleziono', '2024-02-05 16:45:00', '2024-02-05 16:45:00'),
(4, 'Która metoda HTTP jest używana do aktualizacji zasobów?', '["GET", "POST", "PUT", "DELETE"]', 'PUT', '2024-02-05 16:45:00', '2024-02-05 16:45:00'),

-- Quiz 5: Testowanie
(5, 'Co to jest test jednostkowy?', '["Test całej aplikacji", "Test pojedynczej metody", "Test bazy danych", "Test UI"]', 'Test pojedynczej metody', '2024-02-07 11:20:00', '2024-02-07 11:20:00'),
(5, 'Która biblioteka jest używana do testowania w Javie?', '["JUnit", "TestNG", "Mockito", "Wszystkie powyższe"]', 'Wszystkie powyższe', '2024-02-07 11:20:00', '2024-02-07 11:20:00'),
(5, 'Co to jest mock?', '["Prawdziwy obiekt", "Symulowany obiekt", "Baza danych", "Framework"]', 'Symulowany obiekt', '2024-02-07 11:20:00', '2024-02-07 11:20:00'),
(5, 'Która adnotacja oznacza test?', '["@Test", "@Unit", "@Check", "@Verify"]', '@Test', '2024-02-07 11:20:00', '2024-02-07 11:20:00'),
(5, 'Co oznacza TDD?', '["Test-Driven Development", "Type-Driven Development", "Tool-Driven Development", "Time-Driven Development"]', 'Test-Driven Development', '2024-02-07 11:20:00', '2024-02-07 11:20:00');

-- Polubienia postów
INSERT INTO post_likes (post_id, user_id, created_at) VALUES 
(1, 2, '2024-01-10 09:00:00'), (1, 3, '2024-01-10 10:00:00'), (1, 4, '2024-01-10 11:00:00'),
(2, 1, '2024-01-12 12:00:00'), (2, 3, '2024-01-12 13:00:00'), (2, 5, '2024-01-12 14:00:00'),
(3, 1, '2024-01-15 15:00:00'), (3, 2, '2024-01-15 16:00:00'), (3, 4, '2024-01-15 17:00:00'), (3, 5, '2024-01-15 18:00:00'),
(4, 1, '2024-01-18 19:00:00'), (4, 2, '2024-01-18 20:00:00'), (4, 3, '2024-01-18 21:00:00'),
(5, 1, '2024-01-20 22:00:00'), (5, 2, '2024-01-20 23:00:00'), (5, 4, '2024-01-21 00:00:00'), (5, 5, '2024-01-21 01:00:00'),
(6, 2, '2024-01-22 02:00:00'), (6, 3, '2024-01-22 03:00:00'), (6, 4, '2024-01-22 04:00:00'),
(7, 1, '2024-01-25 05:00:00'), (7, 3, '2024-01-25 06:00:00'), (7, 5, '2024-01-25 07:00:00'),
(8, 1, '2024-01-28 08:00:00'), (8, 2, '2024-01-28 09:00:00'), (8, 4, '2024-01-28 10:00:00');

-- Komentarze
INSERT INTO comments (post_id, user_id, content, created_at) VALUES 
(1, 2, 'Świetny artykuł! Bardzo pomocny dla początkujących.', '2024-01-10 09:30:00'),
(1, 3, 'Dodałbym więcej przykładów kodu, ale ogólnie bardzo dobry.', '2024-01-10 10:15:00'),
(2, 1, 'Spring Boot rzeczywiście znacznie upraszcza konfigurację.', '2024-01-12 11:45:00'),
(2, 4, 'Czy możesz dodać przykład z bazą danych?', '2024-01-12 14:20:00'),
(3, 1, 'JPA to must-have dla każdego programisty Java.', '2024-01-15 15:30:00'),
(3, 5, 'Hibernate ma świetną dokumentację.', '2024-01-15 16:45:00'),
(4, 2, 'REST API to podstawa nowoczesnych aplikacji.', '2024-01-18 12:10:00'),
(4, 3, 'Bardzo przydatne informacje o kodach HTTP.', '2024-01-18 13:25:00'),
(5, 1, 'Testowanie to klucz do jakości kodu.', '2024-01-20 17:00:00'),
(5, 4, 'JUnit 5 ma wiele przydatnych funkcji.', '2024-01-20 18:15:00');

-- Post content (treść postów)
INSERT INTO posts_content (post_id, content, created_at, updated_at) VALUES 
(1, '# Wprowadzenie do Javy - Podstawy

Java to obiektowy język programowania stworzony przez firmę Sun Microsystems w 1995 roku. Jest to jeden z najpopularniejszych języków programowania na świecie, używany do tworzenia aplikacji desktopowych, webowych, mobilnych i embedded.

## Podstawowe koncepcje

### 1. Zmienne i typy danych
```java
int liczba = 10;
String tekst = "Hello World";
boolean prawda = true;
double liczbaZmiennoprzecinkowa = 3.14;
```

### 2. Pętle
```java
// Pętla for
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Pętla while
int j = 0;
while (j < 5) {
    System.out.println(j);
    j++;
}
```

### 3. Funkcje
```java
public int dodaj(int a, int b) {
    return a + b;
}
```

## Dlaczego Java?

- **Przenośność**: "Write Once, Run Anywhere"
- **Bezpieczeństwo**: Silne typowanie i zarządzanie pamięcią
- **Wspólnota**: Duża społeczność i bogata ekosystem bibliotek
- **Kariera**: Wysokie zarobki i wiele ofert pracy

Java to doskonały wybór dla początkujących programistów!', '2024-01-10 08:00:00', '2024-01-10 08:00:00'),

(2, '# Spring Boot - Szybki start

Spring Boot to framework, który znacznie upraszcza tworzenie aplikacji Spring. Eliminuje potrzebę ręcznej konfiguracji i pozwala skupić się na logice biznesowej.

## Dlaczego Spring Boot?

- **Auto-konfiguracja**: Automatyczna konfiguracja na podstawie zależności
- **Embedded servers**: Wbudowane serwery (Tomcat, Jetty, Undertow)
- **Starter POMs**: Uproszczone zarządzanie zależnościami
- **Actuator**: Monitoring i metryki out-of-the-box

## Pierwszy projekt

### 1. Utwórz projekt
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.0</version>
</parent>
```

### 2. Dodaj zależności
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 3. Napisz kontroler
```java
@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

### 4. Uruchom aplikację
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## Konfiguracja

Plik `application.properties`:
```properties
server.port=8080
spring.application.name=my-app
```

Spring Boot to rewolucja w świecie Spring Framework!', '2024-01-12 10:30:00', '2024-01-12 10:30:00'),

(3, '# JPA i Hibernate - Podstawy

JPA (Java Persistence API) to standard mapowania obiektowo-relacyjnego w Javie. Hibernate to najpopularniejsza implementacja JPA, która pozwala na pracę z bazami danych w sposób obiektowy.

## Co to jest ORM?

ORM (Object-Relational Mapping) to technika mapowania obiektów programistycznych na rekordy w bazie danych. Zamiast pisać SQL, pracujesz z obiektami Java.

## Podstawowe adnotacje

### @Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false)
    private String username;
    
    @Column(name = "email", unique = true)
    private String email;
}
```

### @Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByUsernameContaining(String username);
}
```

## Operacje CRUD

### Create
```java
User user = new User();
user.setUsername("john");
user.setEmail("john@example.com");
userRepository.save(user);
```

### Read
```java
Optional<User> user = userRepository.findById(1L);
List<User> allUsers = userRepository.findAll();
```

### Update
```java
User user = userRepository.findById(1L).orElseThrow();
user.setUsername("newUsername");
userRepository.save(user);
```

### Delete
```java
userRepository.deleteById(1L);
```

## Relacje

### @OneToMany
```java
@Entity
public class Post {
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments;
}
```

### @ManyToOne
```java
@Entity
public class Comment {
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
```

JPA i Hibernate to potężne narzędzia do pracy z bazami danych!', '2024-01-15 14:20:00', '2024-01-15 14:20:00'),

(4, '# REST API w Spring Boot

REST API to standard komunikacji między aplikacjami. Dowiedz się jak tworzyć RESTful API używając Spring Boot i Spring Web.

## Co to jest REST?

REST (Representational State Transfer) to architektura dla systemów rozproszonych. Opiera się na standardach HTTP i wykorzystuje jego metody do operacji CRUD.

## Metody HTTP

- **GET**: Pobieranie zasobów
- **POST**: Tworzenie nowych zasobów
- **PUT**: Aktualizacja całego zasobu
- **PATCH**: Częściowa aktualizacja
- **DELETE**: Usuwanie zasobów

## Kontroler REST

```java
@RestController
@RequestMapping("/api/posts")
public class PostController {
    
    @Autowired
    private PostService postService;
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return postService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post savedPost = postService.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
        return ResponseEntity.ok(postService.update(id, post));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Kody odpowiedzi HTTP

- **200 OK**: Sukces
- **201 Created**: Zasób utworzony
- **400 Bad Request**: Błędne żądanie
- **404 Not Found**: Nie znaleziono
- **500 Internal Server Error**: Błąd serwera

## Walidacja

```java
@PostMapping
public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
    // Walidacja automatyczna
    return ResponseEntity.ok(postService.save(post));
}
```

REST API to podstawa nowoczesnych aplikacji webowych!', '2024-01-18 11:45:00', '2024-01-18 11:45:00'),

(5, '# Testowanie jednostkowe z JUnit 5

Testowanie to kluczowy element rozwoju oprogramowania. Poznaj JUnit 5 i naucz się pisać skuteczne testy jednostkowe dla swoich aplikacji Java.

## Dlaczego testowanie?

- **Jakość kodu**: Wykrywanie błędów wcześnie
- **Refaktoryzacja**: Bezpieczne zmiany kodu
- **Dokumentacja**: Testy jako żywa dokumentacja
- **Pewność**: Wiara w działanie kodu

## Podstawy JUnit 5

### Struktura testu
```java
@Test
void testDodawania() {
    // Given
    int a = 5;
    int b = 3;
    
    // When
    int wynik = Calculator.add(a, b);
    
    // Then
    assertEquals(8, wynik);
}
```

### Asercje
```java
@Test
void testAsercji() {
    String tekst = "Hello World";
    
    assertEquals("Hello World", tekst);
    assertTrue(tekst.contains("Hello"));
    assertFalse(tekst.isEmpty());
    assertNotNull(tekst);
}
```

## Testowanie z Mockito

### Mockowanie zależności
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void testFindUserById() {
        // Given
        User user = new User("john", "john@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        // When
        Optional<User> result = userService.findById(1L);
        
        // Then
        assertTrue(result.isPresent());
        assertEquals("john", result.get().getUsername());
        verify(userRepository).findById(1L);
    }
}
```

## Testowanie Spring Boot

```java
@SpringBootTest
@AutoConfigureTestDatabase
class PostControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testGetAllPosts() {
        ResponseEntity<Post[]> response = restTemplate.getForEntity("/api/posts", Post[].class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
```

## TDD (Test-Driven Development)

1. **Red**: Napisz test, który nie przechodzi
2. **Green**: Napisz minimalny kod, który przechodzi test
3. **Refactor**: Popraw kod bez zmiany zachowania

Testowanie to inwestycja w przyszłość kodu!', '2024-01-20 16:10:00', '2024-01-20 16:10:00'),

(6, '# Docker dla programistów Java

Docker to narzędzie do konteneryzacji aplikacji. Dowiedz się jak używać Dockera do uruchamiania aplikacji Java w izolowanych środowiskach.

## Co to jest Docker?

Docker to platforma do konteneryzacji aplikacji. Kontenery to lekkie, przenośne pakiety zawierające aplikację i wszystkie jej zależności.

## Zalety Docker

- **Izolacja**: Aplikacje działają w izolowanych środowiskach
- **Przenośność**: "Działa na moim komputerze"
- **Skalowalność**: Łatwe skalowanie aplikacji
- **Spójność**: To samo środowisko wszędzie

## Dockerfile dla Java

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/JustDrinkJava-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

## Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/justdrinkjava
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: justdrinkjava
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Podstawowe komendy

```bash
# Budowanie obrazu
docker build -t justdrinkjava .

# Uruchomienie kontenera
docker run -p 8080:8080 justdrinkjava

# Uruchomienie z Docker Compose
docker-compose up

# Zatrzymanie
docker-compose down
```

## Multi-stage builds

```dockerfile
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/JustDrinkJava-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

Docker to niezbędne narzędzie dla nowoczesnych programistów!', '2024-01-22 09:30:00', '2024-01-22 09:30:00'),

(7, '# Wzorce projektowe w Javie

Wzorce projektowe to sprawdzone rozwiązania problemów programistycznych. Poznaj najważniejsze wzorce i ich implementacje w Javie.

## Co to są wzorce projektowe?

Wzorce projektowe to gotowe rozwiązania typowych problemów w projektowaniu oprogramowania. Zostały spopularyzowane przez "Gang of Four" w książce "Design Patterns".

## Kategorie wzorców

### 1. Wzorce kreacyjne
- **Singleton**: Pojedyncza instancja klasy
- **Factory**: Tworzenie obiektów
- **Builder**: Budowanie złożonych obiektów

### 2. Wzorce strukturalne
- **Adapter**: Dostosowanie interfejsów
- **Decorator**: Dodawanie funkcjonalności
- **Proxy**: Kontrola dostępu do obiektów

### 3. Wzorce behawioralne
- **Observer**: Powiadomienia o zmianach
- **Strategy**: Wymienne algorytmy
- **Command**: Enkapsulacja żądań

## Singleton

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;
    
    private DatabaseConnection() {
        this.connectionString = "jdbc:postgresql://localhost:5432/db";
    }
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public void connect() {
        System.out.println("Łączenie z bazą: " + connectionString);
    }
}
```

## Factory

```java
public interface Animal {
    void makeSound();
}

public class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof!");
    }
}

public class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meow!");
    }
}

public class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type.toLowerCase()) {
            case "dog":
                return new Dog();
            case "cat":
                return new Cat();
            default:
                throw new IllegalArgumentException("Nieznany typ zwierzęcia");
        }
    }
}
```

## Observer

```java
public interface Observer {
    void update(String message);
}

public class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyObservers(String news) {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}

public class NewsChannel implements Observer {
    private String name;
    
    public NewsChannel(String name) {
        this.name = name;
    }
    
    public void update(String news) {
        System.out.println(name + " otrzymał wiadomość: " + news);
    }
}
```

## Strategy

```java
public interface PaymentStrategy {
    void pay(int amount);
}

public class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Płatność kartą kredytową: " + amount + " zł");
    }
}

public class PayPalPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Płatność PayPal: " + amount + " zł");
    }
}

public class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}
```

Wzorce projektowe to klucz do pisania elastycznego i utrzymywalnego kodu!', '2024-01-25 13:15:00', '2024-01-25 13:15:00'),

(8, '# Czysty kod w Javie

Pisanie czystego kodu to sztuka. Poznaj zasady SOLID, konwencje nazewnictwa i najlepsze praktyki pisania czytelnego kodu Java.

## Co to jest czysty kod?

Czysty kod to kod, który jest łatwy do zrozumienia, modyfikacji i rozszerzania. Jest napisany z myślą o innych programistach, którzy będą go czytać i utrzymywać.

## Zasady SOLID

### 1. Single Responsibility Principle (SRP)
```java
// Źle - klasa ma wiele odpowiedzialności
public class UserManager {
    public void saveUser(User user) { /* ... */ }
    public void sendEmail(User user) { /* ... */ }
    public void generateReport() { /* ... */ }
}

// Dobrze - każda klasa ma jedną odpowiedzialność
public class UserRepository {
    public void save(User user) { /* ... */ }
}

public class EmailService {
    public void sendEmail(User user) { /* ... */ }
}

public class ReportGenerator {
    public void generateReport() { /* ... */ }
}
```

### 2. Open/Closed Principle (OCP)
```java
// Rozszerzalne bez modyfikacji
public interface PaymentProcessor {
    void processPayment(double amount);
}

public class CreditCardProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        // Implementacja dla karty kredytowej
    }
}

public class PayPalProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        // Implementacja dla PayPal
    }
}
```

### 3. Liskov Substitution Principle (LSP)
```java
// Podklasy mogą zastąpić klasy bazowe
public class Rectangle {
    protected int width, height;
    
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

public class Square extends Rectangle {
    public void setWidth(int width) {
        this.width = width;
        this.height = width; // Zachowanie kwadratu
    }
}
```

## Konwencje nazewnictwa

### Klasy i interfejsy
```java
public class UserService { }        // PascalCase
public interface PaymentProcessor { } // PascalCase
```

### Metody i zmienne
```java
public void calculateTotal() { }    // camelCase
private String userName;            // camelCase
public static final int MAX_SIZE = 100; // UPPER_SNAKE_CASE
```

### Stałe
```java
public static final String DATABASE_URL = "jdbc:postgresql://localhost:5432/db";
public static final int DEFAULT_TIMEOUT = 5000;
```

## Najlepsze praktyki

### 1. Znaczące nazwy
```java
// Źle
public List<String> getData() { }

// Dobrze
public List<String> getActiveUserEmails() { }
```

### 2. Krótkie metody
```java
// Maksymalnie 20-30 linii
public void processOrder(Order order) {
    validateOrder(order);
    calculateTotal(order);
    applyDiscount(order);
    saveOrder(order);
    sendConfirmation(order);
}
```

### 3. Komentarze
```java
// Tylko gdy kod nie jest samodokumentujący
public double calculateCompoundInterest(double principal, double rate, int years) {
    // Wzór: A = P(1 + r)^n
    return principal * Math.pow(1 + rate, years);
}
```

### 4. Obsługa błędów
```java
public User findUserById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("Użytkownik nie znaleziony: " + id));
}
```

## Refaktoryzacja

### Usuwanie duplikacji
```java
// Przed
public void processUsers(List<User> users) {
    for (User user : users) {
        if (user.isActive()) {
            sendWelcomeEmail(user);
        }
    }
}

public void processAdmins(List<User> users) {
    for (User user : users) {
        if (user.isAdmin()) {
            sendAdminEmail(user);
        }
    }
}

// Po
public void processUsers(List<User> users, Predicate<User> filter, Consumer<User> action) {
    users.stream()
         .filter(filter)
         .forEach(action);
}
```

Czysty kod to inwestycja w przyszłość projektu!', '2024-01-28 10:45:00', '2024-01-28 10:45:00');

-- Ranking użytkowników
INSERT INTO users_ranking (user_id, total_score, ranking, updated_at) VALUES 
(1, 150, 1, '2024-01-30 10:00:00'),
(2, 120, 2, '2024-01-30 10:00:00'),
(3, 95, 3, '2024-01-30 10:00:00'),
(4, 80, 4, '2024-01-30 10:00:00'),
(5, 65, 5, '2024-01-30 10:00:00'); 