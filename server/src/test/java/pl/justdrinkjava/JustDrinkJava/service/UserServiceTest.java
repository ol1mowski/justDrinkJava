package pl.justdrinkjava.JustDrinkJava.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserService userService;

    private User user;
    private UpdateProfileRequest updateProfileRequest;
    private ChangePasswordRequest changePasswordRequest;
    private DeleteAccountRequest deleteAccountRequest;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .email("test@example.com")
                .username("testuser")
                .password("encodedPassword")
                .createdAt(LocalDateTime.now())
                .build();

        updateProfileRequest = UpdateProfileRequest.builder()
                .username("newusername")
                .build();

        changePasswordRequest = ChangePasswordRequest.builder()
                .currentPassword("currentPassword")
                .newPassword("newPassword")
                .confirmPassword("newPassword")
                .build();

        deleteAccountRequest = DeleteAccountRequest.builder()
                .confirmation("USUŃ KONTO")
                .build();

        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
    }

    @Test
    @DisplayName("should get current user successfully by username")
    void shouldGetCurrentUserSuccessfullyByUsername() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        UserDto result = userService.getCurrentUser();

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getCreatedAt()).isEqualTo(user.getCreatedAt());

        verify(userRepository).findByUsername("testuser");
        verify(userRepository, never()).findByEmail(anyString());
    }

    @Test
    @DisplayName("should get current user successfully by email when username not found")
    void shouldGetCurrentUserSuccessfullyByEmailWhenUsernameNotFound() {
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByUsername("test@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        UserDto result = userService.getCurrentUser();

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        assertThat(result.getUsername()).isEqualTo("testuser");

        verify(userRepository).findByUsername("test@example.com");
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    @DisplayName("should throw exception when current user not found")
    void shouldThrowExceptionWhenCurrentUserNotFound() {
        when(authentication.getName()).thenReturn("nonexistent");
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getCurrentUser())
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(userRepository).findByUsername("nonexistent");
        verify(userRepository).findByEmail("nonexistent");
    }

    @Test
    @DisplayName("should update profile successfully")
    void shouldUpdateProfileSuccessfully() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newusername")).thenReturn(Optional.empty());
        
        // Create updated user that will be returned by save()
        User updatedUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .username("newusername") // Updated username
                .password("encodedPassword")
                .createdAt(user.getCreatedAt())
                .build();
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);
        when(jwtService.generateToken(any())).thenReturn("newToken");

        UpdateProfileResponse result = userService.updateProfile(updateProfileRequest);

        assertThat(result).isNotNull();
        assertThat(result.getUser()).isNotNull();
        assertThat(result.getUser().getUsername()).isEqualTo("newusername");
        assertThat(result.getNewToken()).isEqualTo("newToken");

        verify(userRepository).findByUsername("testuser");
        verify(userRepository).findByUsername("newusername");
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(any());
    }

    @Test
    @DisplayName("should update profile without new token when username unchanged")
    void shouldUpdateProfileWithoutNewTokenWhenUsernameUnchanged() {
        updateProfileRequest.setUsername("testuser"); // Same username
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        UpdateProfileResponse result = userService.updateProfile(updateProfileRequest);

        assertThat(result).isNotNull();
        assertThat(result.getUser()).isNotNull();
        assertThat(result.getNewToken()).isNull();

        verify(userRepository).findByUsername("testuser");
        verify(userRepository, never()).findByUsername("newusername");
        verify(userRepository).save(any(User.class));
        verify(jwtService, never()).generateToken(any());
    }

    @Test
    @DisplayName("should throw exception when new username is already taken")
    void shouldThrowExceptionWhenNewUsernameIsAlreadyTaken() {
        User existingUser = User.builder()
                .id(2L)
                .username("newusername")
                .email("other@example.com")
                .build();

        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newusername")).thenReturn(Optional.of(existingUser));

        assertThatThrownBy(() -> userService.updateProfile(updateProfileRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Nazwa użytkownika jest już zajęta");

        verify(userRepository).findByUsername("testuser");
        verify(userRepository).findByUsername("newusername");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("should allow username update to same user")
    void shouldAllowUsernameUpdateToSameUser() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newusername")).thenReturn(Optional.of(user)); // Same user
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any())).thenReturn("newToken");

        UpdateProfileResponse result = userService.updateProfile(updateProfileRequest);

        assertThat(result).isNotNull();
        assertThat(result.getNewToken()).isEqualTo("newToken");

        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("should change password successfully")
    void shouldChangePasswordSuccessfully() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("currentPassword", "encodedPassword")).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("newEncodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        assertThatCode(() -> userService.changePassword(changePasswordRequest))
                .doesNotThrowAnyException();

        verify(userRepository).findByUsername("testuser");
        verify(passwordEncoder).matches("currentPassword", "encodedPassword");
        verify(passwordEncoder).encode("newPassword");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("should throw exception when current password is incorrect")
    void shouldThrowExceptionWhenCurrentPasswordIsIncorrect() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("currentPassword", "encodedPassword")).thenReturn(false);

        assertThatThrownBy(() -> userService.changePassword(changePasswordRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Niepoprawne aktualne hasło");

        verify(passwordEncoder).matches("currentPassword", "encodedPassword");
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("should throw exception when new passwords do not match")
    void shouldThrowExceptionWhenNewPasswordsDoNotMatch() {
        changePasswordRequest.setConfirmPassword("differentPassword");
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("currentPassword", "encodedPassword")).thenReturn(true);

        assertThatThrownBy(() -> userService.changePassword(changePasswordRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Nowe hasła nie są identyczne");

        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("should delete account successfully")
    void shouldDeleteAccountSuccessfully() {
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThatCode(() -> userService.deleteAccount(deleteAccountRequest))
                .doesNotThrowAnyException();

        verify(userRepository).findByUsername("testuser");
        verify(userRepository).delete(user);
    }

    @Test
    @DisplayName("should throw exception when delete confirmation is incorrect")
    void shouldThrowExceptionWhenDeleteConfirmationIsIncorrect() {
        deleteAccountRequest.setConfirmation("WRONG CONFIRMATION");
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> userService.deleteAccount(deleteAccountRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Niepoprawne potwierdzenie usunięcia konta");

        verify(userRepository, never()).delete(any(User.class));
    }

    @Test
    @DisplayName("should throw exception when user not found for profile update")
    void shouldThrowExceptionWhenUserNotFoundForProfileUpdate() {
        when(authentication.getName()).thenReturn("nonexistent");
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.updateProfile(updateProfileRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("should throw exception when user not found for password change")
    void shouldThrowExceptionWhenUserNotFoundForPasswordChange() {
        when(authentication.getName()).thenReturn("nonexistent");
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.changePassword(changePasswordRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("should throw exception when user not found for account deletion")
    void shouldThrowExceptionWhenUserNotFoundForAccountDeletion() {
        when(authentication.getName()).thenReturn("nonexistent");
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.deleteAccount(deleteAccountRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(userRepository, never()).delete(any(User.class));
    }

    @Test
    @DisplayName("should find user by email when username lookup fails for profile update")
    void shouldFindUserByEmailWhenUsernameLookupFailsForProfileUpdate() {
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByUsername("test@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newusername")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any())).thenReturn("newToken");

        UpdateProfileResponse result = userService.updateProfile(updateProfileRequest);

        assertThat(result).isNotNull();
        verify(userRepository).findByUsername("test@example.com");
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    @DisplayName("should find user by email when username lookup fails for password change")
    void shouldFindUserByEmailWhenUsernameLookupFailsForPasswordChange() {
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByUsername("test@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("currentPassword", "encodedPassword")).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("newEncodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        assertThatCode(() -> userService.changePassword(changePasswordRequest))
                .doesNotThrowAnyException();

        verify(userRepository).findByUsername("test@example.com");
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    @DisplayName("should find user by email when username lookup fails for account deletion")
    void shouldFindUserByEmailWhenUsernameLookupFailsForAccountDeletion() {
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByUsername("test@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        assertThatCode(() -> userService.deleteAccount(deleteAccountRequest))
                .doesNotThrowAnyException();

        verify(userRepository).findByUsername("test@example.com");
        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).delete(user);
    }

    @Test
    @DisplayName("should handle null confirmation for account deletion")
    void shouldHandleNullConfirmationForAccountDeletion() {
        deleteAccountRequest.setConfirmation(null);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> userService.deleteAccount(deleteAccountRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Niepoprawne potwierdzenie usunięcia konta");

        verify(userRepository, never()).delete(any(User.class));
    }

    @Test
    @DisplayName("should handle empty confirmation for account deletion")
    void shouldHandleEmptyConfirmationForAccountDeletion() {
        deleteAccountRequest.setConfirmation("");
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> userService.deleteAccount(deleteAccountRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Niepoprawne potwierdzenie usunięcia konta");

        verify(userRepository, never()).delete(any(User.class));
    }
} 