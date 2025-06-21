package pl.justdrinkjava.JustDrinkJava.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import pl.justdrinkjava.JustDrinkJava.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("UserRepository Tests")
class UserRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    void setUp() {
        user1 = User.builder()
                .email("user1@example.com")
                .username("user1")
                .password("password123")
                .createdAt(LocalDateTime.now())
                .build();

        user2 = User.builder()
                .email("user2@example.com")
                .username("user2")
                .password("password456")
                .createdAt(LocalDateTime.now())
                .build();

        user3 = User.builder()
                .email("test@example.com")
                .username("testuser")
                .password("testpass")
                .createdAt(LocalDateTime.now())
                .build();

        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.persist(user3);
        entityManager.flush();
    }

    @Test
    @DisplayName("should find user by email successfully")
    void shouldFindUserByEmailSuccessfully() {
        Optional<User> result = userRepository.findByEmail("user1@example.com");

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo("user1@example.com");
        assertThat(result.get().getDisplayUsername()).isEqualTo("user1");
    }

    @Test
    @DisplayName("should return empty when user not found by email")
    void shouldReturnEmptyWhenUserNotFoundByEmail() {
        Optional<User> result = userRepository.findByEmail("nonexistent@example.com");

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("should find user by username successfully")
    void shouldFindUserByUsernameSuccessfully() {
        Optional<User> result = userRepository.findByUsername("user2");

        assertThat(result).isPresent();
        assertThat(result.get().getDisplayUsername()).isEqualTo("user2");
        assertThat(result.get().getEmail()).isEqualTo("user2@example.com");
    }

    @Test
    @DisplayName("should return empty when user not found by username")
    void shouldReturnEmptyWhenUserNotFoundByUsername() {
        Optional<User> result = userRepository.findByUsername("nonexistent");

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("should return true when user exists by email")
    void shouldReturnTrueWhenUserExistsByEmail() {
        boolean exists = userRepository.existsByEmail("test@example.com");

        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("should return false when user does not exist by email")
    void shouldReturnFalseWhenUserDoesNotExistByEmail() {
        boolean exists = userRepository.existsByEmail("nonexistent@example.com");

        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("should save and retrieve user correctly")
    void shouldSaveAndRetrieveUserCorrectly() {
        User newUser = User.builder()
                .email("new@example.com")
                .username("newuser")
                .password("newpassword123")
                .createdAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(newUser);

        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getEmail()).isEqualTo("new@example.com");
        assertThat(savedUser.getDisplayUsername()).isEqualTo("newuser");
        assertThat(savedUser.getCreatedAt()).isNotNull();

        Optional<User> found = userRepository.findById(savedUser.getId());
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("new@example.com");
    }

    @Test
    @DisplayName("should find all users")
    void shouldFindAllUsers() {
        List<User> users = userRepository.findAll();

        assertThat(users).hasSize(3);
        assertThat(users).extracting(User::getEmail)
                .containsExactlyInAnyOrder("user1@example.com", "user2@example.com", "test@example.com");
    }

    @Test
    @DisplayName("should delete user by id")
    void shouldDeleteUserById() {
        Long userId = user1.getId();
        assertThat(userRepository.findById(userId)).isPresent();

        userRepository.deleteById(userId);

        assertThat(userRepository.findById(userId)).isEmpty();
        assertThat(userRepository.findAll()).hasSize(2);
    }

    @Test
    @DisplayName("should count users correctly")
    void shouldCountUsersCorrectly() {
        long count = userRepository.count();

        assertThat(count).isEqualTo(3);
    }

    @Test
    @DisplayName("should handle email case sensitivity")
    void shouldHandleEmailCaseSensitivity() {
        Optional<User> result1 = userRepository.findByEmail("USER1@EXAMPLE.COM");
        Optional<User> result2 = userRepository.findByEmail("user1@example.com");

        // H2 is case-sensitive by default
        assertThat(result1).isEmpty();
        assertThat(result2).isPresent();
    }

    @Test
    @DisplayName("should handle username case sensitivity")
    void shouldHandleUsernameCaseSensitivity() {
        Optional<User> result1 = userRepository.findByUsername("USER1");
        Optional<User> result2 = userRepository.findByUsername("user1");

        // H2 is case-sensitive by default
        assertThat(result1).isEmpty();
        assertThat(result2).isPresent();
    }

    @Test
    @DisplayName("should handle null email in findByEmail")
    void shouldHandleNullEmailInFindByEmail() {
        Optional<User> result = userRepository.findByEmail(null);

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("should handle null username in findByUsername")
    void shouldHandleNullUsernameInFindByUsername() {
        Optional<User> result = userRepository.findByUsername(null);

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("should handle null email in existsByEmail")
    void shouldHandleNullEmailInExistsByEmail() {
        boolean exists = userRepository.existsByEmail(null);

        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("should handle empty string email")
    void shouldHandleEmptyStringEmail() {
        Optional<User> result = userRepository.findByEmail("");
        boolean exists = userRepository.existsByEmail("");

        assertThat(result).isEmpty();
        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("should handle empty string username")
    void shouldHandleEmptyStringUsername() {
        Optional<User> result = userRepository.findByUsername("");

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("should handle special characters in email")
    void shouldHandleSpecialCharactersInEmail() {
        User specialUser = User.builder()
                .email("test+special@example.com")
                .username("specialuser")
                .password("password")
                .createdAt(LocalDateTime.now())
                .build();

        entityManager.persist(specialUser);
        entityManager.flush();

        Optional<User> result = userRepository.findByEmail("test+special@example.com");
        boolean exists = userRepository.existsByEmail("test+special@example.com");

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo("test+special@example.com");
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("should handle long email addresses")
    void shouldHandleLongEmailAddresses() {
        String longEmail = "verylongusernamethatexceedsnormallimits@verylongdomainnamethatisunusuallylong.com";
        User longEmailUser = User.builder()
                .email(longEmail)
                .username("longuser")
                .password("password")
                .createdAt(LocalDateTime.now())
                .build();

        entityManager.persist(longEmailUser);
        entityManager.flush();

        Optional<User> result = userRepository.findByEmail(longEmail);
        boolean exists = userRepository.existsByEmail(longEmail);

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo(longEmail);
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("should update user correctly")
    void shouldUpdateUserCorrectly() {
        User existingUser = userRepository.findById(user1.getId()).get();
        // Use reflection to set username field since setter might not be available
        try {
            var usernameField = User.class.getDeclaredField("username");
            usernameField.setAccessible(true);
            usernameField.set(existingUser, "updateduser");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        existingUser.setPassword("newpassword");

        User updatedUser = userRepository.save(existingUser);

        assertThat(updatedUser.getDisplayUsername()).isEqualTo("updateduser");
        assertThat(updatedUser.getPassword()).isEqualTo("newpassword");
        assertThat(updatedUser.getId()).isEqualTo(user1.getId());
        assertThat(updatedUser.getEmail()).isEqualTo(user1.getEmail());
    }

    @Test
    @DisplayName("should handle unicode characters in username")
    void shouldHandleUnicodeCharactersInUsername() {
        User unicodeUser = User.builder()
                .email("unicode@example.com")
                .username("użytkownik")
                .password("password")
                .createdAt(LocalDateTime.now())
                .build();

        entityManager.persist(unicodeUser);
        entityManager.flush();

        Optional<User> result = userRepository.findByUsername("użytkownik");

        assertThat(result).isPresent();
        assertThat(result.get().getDisplayUsername()).isEqualTo("użytkownik");
    }

    @Test
    @DisplayName("should enforce unique username constraint")
    void shouldEnforceUniqueUsernameConstraint() {
        // Username has unique constraint, so duplicate should fail
        User duplicateUsernameUser = User.builder()
                .email("different@example.com")
                .username("user1") // Same username as user1
                .password("password123")
                .createdAt(LocalDateTime.now())
                .build();

        assertThatThrownBy(() -> {
            entityManager.persist(duplicateUsernameUser);
            entityManager.flush();
        }).isInstanceOf(Exception.class);
        
        // Clear the session after exception
        entityManager.clear();

        List<User> users = userRepository.findAll();
        long usersWithSameUsername = users.stream()
                .filter(u -> "user1".equals(u.getDisplayUsername()))
                .count();

        assertThat(usersWithSameUsername).isEqualTo(1);
    }
} 