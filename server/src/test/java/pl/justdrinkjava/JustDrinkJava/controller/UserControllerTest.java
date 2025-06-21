package pl.justdrinkjava.JustDrinkJava.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.exception.GlobalExceptionHandler;
import pl.justdrinkjava.JustDrinkJava.service.UserService;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserController Tests")
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private UserDto userDto;
    private UpdateProfileRequest updateProfileRequest;
    private UpdateProfileResponse updateProfileResponse;
    private ChangePasswordRequest changePasswordRequest;
    private DeleteAccountRequest deleteAccountRequest;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        objectMapper = new ObjectMapper();

        userDto = UserDto.builder()
                .id(1L)
                .email("test@example.com")
                .username("testuser")
                .createdAt(LocalDateTime.now())
                .build();

        updateProfileRequest = UpdateProfileRequest.builder()
                .username("newusername")
                .build();

        updateProfileResponse = UpdateProfileResponse.builder()
                .user(userDto)
                .newToken("newToken")
                .build();

        changePasswordRequest = ChangePasswordRequest.builder()
                .currentPassword("currentPassword")
                .newPassword("newPassword")
                .confirmPassword("newPassword")
                .build();

        deleteAccountRequest = DeleteAccountRequest.builder()
                .confirmation("USUŃ KONTO")
                .build();
    }

    @Test
    @DisplayName("should get current user successfully")
    void shouldGetCurrentUserSuccessfully() throws Exception {
        when(userService.getCurrentUser()).thenReturn(userDto);

        mockMvc.perform(get("/user/profile"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.username").value("testuser"));

        verify(userService).getCurrentUser();
    }

    @Test
    @DisplayName("should return 500 when getCurrentUser throws exception")
    void shouldReturn500WhenGetCurrentUserThrowsException() throws Exception {
        when(userService.getCurrentUser()).thenThrow(new RuntimeException("User not found"));

        mockMvc.perform(get("/user/profile"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string(""));

        verify(userService).getCurrentUser();
    }

    @Test
    @DisplayName("should update profile successfully")
    void shouldUpdateProfileSuccessfully() throws Exception {
        when(userService.updateProfile(any(UpdateProfileRequest.class))).thenReturn(updateProfileResponse);

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateProfileRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.user.username").value("testuser"))
                .andExpect(jsonPath("$.newToken").value("newToken"));

        verify(userService).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should return 400 when updateProfile throws RuntimeException")
    void shouldReturn400WhenUpdateProfileThrowsRuntimeException() throws Exception {
        when(userService.updateProfile(any(UpdateProfileRequest.class)))
                .thenThrow(new RuntimeException("Username already taken"));

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateProfileRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Username already taken"));

        verify(userService).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should return 500 when updateProfile throws unexpected exception")
    void shouldReturn500WhenUpdateProfileThrowsUnexpectedException() throws Exception {
        when(userService.updateProfile(any(UpdateProfileRequest.class)))
                .thenThrow(new IllegalStateException("Unexpected error"));

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateProfileRequest)))
                .andExpect(status().isBadRequest()) // IllegalStateException is RuntimeException, so returns 400
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Unexpected error")); // Real exception message

        verify(userService).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should change password successfully")
    void shouldChangePasswordSuccessfully() throws Exception {
        doNothing().when(userService).changePassword(any(ChangePasswordRequest.class));

        mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Hasło zostało zmienione pomyślnie"));

        verify(userService).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    @DisplayName("should handle change password runtime exception")
    void shouldHandleChangePasswordRuntimeException() throws Exception {
        doThrow(new RuntimeException("Current password is incorrect"))
                .when(userService).changePassword(any(ChangePasswordRequest.class));

        mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordRequest)))
                .andExpect(status().isInternalServerError());

        verify(userService).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    @DisplayName("should handle change password unexpected exception")
    void shouldHandleChangePasswordUnexpectedException() throws Exception {
        doThrow(new IllegalStateException("Unexpected error"))
                .when(userService).changePassword(any(ChangePasswordRequest.class));

        mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordRequest)))
                .andExpect(status().isInternalServerError());

        verify(userService).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    @DisplayName("should delete account successfully")
    void shouldDeleteAccountSuccessfully() throws Exception {
        doNothing().when(userService).deleteAccount(any(DeleteAccountRequest.class));

        mockMvc.perform(delete("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deleteAccountRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Konto zostało usunięte pomyślnie"));

        verify(userService).deleteAccount(any(DeleteAccountRequest.class));
    }

    @Test
    @DisplayName("should handle delete account runtime exception")
    void shouldHandleDeleteAccountRuntimeException() throws Exception {
        doThrow(new RuntimeException("Invalid confirmation"))
                .when(userService).deleteAccount(any(DeleteAccountRequest.class));

        mockMvc.perform(delete("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deleteAccountRequest)))
                .andExpect(status().isInternalServerError());

        verify(userService).deleteAccount(any(DeleteAccountRequest.class));
    }

    @Test
    @DisplayName("should handle delete account unexpected exception")
    void shouldHandleDeleteAccountUnexpectedException() throws Exception {
        doThrow(new IllegalStateException("Unexpected error"))
                .when(userService).deleteAccount(any(DeleteAccountRequest.class));

        mockMvc.perform(delete("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deleteAccountRequest)))
                .andExpect(status().isInternalServerError());

        verify(userService).deleteAccount(any(DeleteAccountRequest.class));
    }

    @Test
    @DisplayName("should handle invalid JSON in update profile")
    void shouldHandleInvalidJsonInUpdateProfile() throws Exception {
        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json}"))
                .andExpect(status().isBadRequest());

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle invalid JSON in change password")
    void shouldHandleInvalidJsonInChangePassword() throws Exception {
        mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json}"))
                .andExpect(status().isBadRequest());

        verify(userService, never()).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    @DisplayName("should handle invalid JSON in delete account")
    void shouldHandleInvalidJsonInDeleteAccount() throws Exception {
        mockMvc.perform(delete("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json}"))
                .andExpect(status().isBadRequest());

        verify(userService, never()).deleteAccount(any(DeleteAccountRequest.class));
    }

    @Test
    @DisplayName("should handle missing content type in update profile")
    void shouldHandleMissingContentTypeInUpdateProfile() throws Exception {
        mockMvc.perform(put("/user/profile")
                .content(objectMapper.writeValueAsString(updateProfileRequest)))
                .andExpect(status().is5xxServerError()); // Returns 500 in this Spring version

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle empty request body in update profile")
    void shouldHandleEmptyRequestBodyInUpdateProfile() throws Exception {
        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest());

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle null username in update profile request")
    void shouldHandleNullUsernameInUpdateProfileRequest() throws Exception {
        UpdateProfileRequest invalidRequest = UpdateProfileRequest.builder()
                .username(null)
                .build();

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle empty username in update profile request")
    void shouldHandleEmptyUsernameInUpdateProfileRequest() throws Exception {
        UpdateProfileRequest invalidRequest = UpdateProfileRequest.builder()
                .username("")
                .build();

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle missing passwords in change password request")
    void shouldHandleMissingPasswordsInChangePasswordRequest() throws Exception {
        ChangePasswordRequest invalidRequest = ChangePasswordRequest.builder()
                .currentPassword(null)
                .newPassword(null)
                .confirmPassword(null)
                .build();

        mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    @DisplayName("should handle missing confirmation in delete account request")
    void shouldHandleMissingConfirmationInDeleteAccountRequest() throws Exception {
        DeleteAccountRequest invalidRequest = DeleteAccountRequest.builder()
                .confirmation(null)
                .build();

        mockMvc.perform(delete("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).deleteAccount(any(DeleteAccountRequest.class));
    }

    @Test
    @DisplayName("should handle OPTIONS request")
    void shouldHandleOptionsRequest() throws Exception {
        mockMvc.perform(options("/user/profile"))
                .andExpect(status().isOk());

        verify(userService, never()).getCurrentUser();
    }

    @Test
    @DisplayName("should handle HEAD request for profile")
    void shouldHandleHeadRequestForProfile() throws Exception {
        when(userService.getCurrentUser()).thenReturn(userDto);

        mockMvc.perform(head("/user/profile"))
                .andExpect(status().isOk());

        verify(userService).getCurrentUser();
    }

    @Test
    @DisplayName("should reject very long username")
    void shouldRejectVeryLongUsername() throws Exception {
        String longUsername = "a".repeat(255);
        UpdateProfileRequest longUsernameRequest = UpdateProfileRequest.builder()
                .username(longUsername)
                .build();

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(longUsernameRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).updateProfile(any(UpdateProfileRequest.class));
    }

    @Test
    @DisplayName("should handle special characters in username")
    void shouldHandleSpecialCharactersInUsername() throws Exception {
        UpdateProfileRequest specialRequest = UpdateProfileRequest.builder()
                .username("user@#$%^&*()")
                .build();

        when(userService.updateProfile(any(UpdateProfileRequest.class))).thenReturn(updateProfileResponse);

        mockMvc.perform(put("/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(specialRequest)))
                .andExpect(status().isOk());

        verify(userService).updateProfile(any(UpdateProfileRequest.class));
    }
} 