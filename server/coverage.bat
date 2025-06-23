@echo off
echo 📊 Generowanie raportu pokrycia testami...
echo.

call mvnw.cmd clean org.jacoco:jacoco-maven-plugin:0.8.12:prepare-agent test org.jacoco:jacoco-maven-plugin:0.8.12:report

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Raport wygenerowany pomyślnie!
    echo 🌐 Otwieranie raportu HTML...
    echo.
    start target\site\jacoco\index.html
    echo 📁 Raport znajduje się w: target\site\jacoco\index.html
) else (
    echo.
    echo ❌ Błąd podczas generowania raportu!
    echo Sprawdź logi powyżej dla szczegółów.
)

pause 