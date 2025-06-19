package pl.justdrinkjava.JustDrinkJava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.justdrinkjava.JustDrinkJava.dto.BaseResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
public class HealthController {
    
    @GetMapping("/status")
    public ResponseEntity<BaseResponse> getHealthStatus() {
        BaseResponse response = BaseResponse.builder()
                .status("UP")
                .message("Aplikacja działa poprawnie")
                .timestamp(LocalDateTime.now())
                .build();
        
        return ResponseEntity.ok(response);
    }
    
        
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();
        
        Runtime runtime = Runtime.getRuntime();
        info.put("timestamp", LocalDateTime.now());
        info.put("status", "UP");
        info.put("memory", Map.of(
            "total", runtime.totalMemory(),
            "free", runtime.freeMemory(),
            "used", runtime.totalMemory() - runtime.freeMemory(),
            "max", runtime.maxMemory()
        ));
        info.put("processors", runtime.availableProcessors());
        info.put("javaVersion", System.getProperty("java.version"));
        
        return ResponseEntity.ok(info);
    }

} 