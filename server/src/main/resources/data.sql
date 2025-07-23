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

-- Ranking użytkowników
INSERT INTO users_ranking (user_id, total_score, ranking, updated_at) VALUES 
(1, 150, 1, '2024-01-30 10:00:00'),
(2, 120, 2, '2024-01-30 10:00:00'),
(3, 95, 3, '2024-01-30 10:00:00'),
(4, 80, 4, '2024-01-30 10:00:00'),
(5, 65, 5, '2024-01-30 10:00:00'); 