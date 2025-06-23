#!/bin/bash

echo "📊 Generowanie raportu pokrycia testami..."
echo ""

./mvnw clean org.jacoco:jacoco-maven-plugin:0.8.12:prepare-agent test org.jacoco:jacoco-maven-plugin:0.8.12:report

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Raport wygenerowany pomyślnie!"
    echo "🌐 Otwieranie raportu HTML..."
    echo ""
    
    # Próba otwarcia raportu w zależności od systemu
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open target/site/jacoco/index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open target/site/jacoco/index.html
    else
        echo "📁 Raport znajduje się w: target/site/jacoco/index.html"
        echo "Otwórz go ręcznie w przeglądarce."
    fi
    
    echo "📁 Raport znajduje się w: target/site/jacoco/index.html"
else
    echo ""
    echo "❌ Błąd podczas generowania raportu!"
    echo "Sprawdź logi powyżej dla szczegółów."
fi 