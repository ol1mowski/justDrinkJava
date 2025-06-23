# Przewodnik dla Deweloperów

## Konfiguracja Husky, Prettier i Commitlint

Projekt używa następujących narzędzi do zapewnienia jakości kodu:

### 🐕 Husky - Git Hooks

- **Pre-commit**: Automatycznie formatuje kod przed commitem
- **Commit-msg**: Sprawdza konwencję nazewnictwa commitów

### 💅 Prettier - Formatowanie Kodu

Automatyczne formatowanie dla:

- **Frontend**: JavaScript, TypeScript, React, CSS, JSON, Markdown
- **Backend**: Java, XML, Properties, YAML
- **Dokumentacja**: Markdown

### 📝 Commitlint - Konwencja Commitów

#### Format commita:

```
<typ>: <opis>

[opcjonalne ciało]

[opcjonalne stopka]
```

#### Dozwolone typy:

- `feat`: nowa funkcjonalność
- `fix`: naprawa błędu
- `refactor`: refaktoryzacja kodu
- `docs`: dokumentacja
- `style`: formatowanie, brakujące średniki, itp.
- `test`: dodanie testów
- `chore`: zadania konserwacyjne
- `perf`: poprawa wydajności
- `ci`: continuous integration
- `build`: system budowania
- `revert`: cofnięcie zmian

#### Przykłady poprawnych commitów:

```bash
feat: add user authentication system
fix: resolve database connection issue
refactor: extract common utility functions
docs: update API documentation
style: format code with prettier
test: add unit tests for user service
```

## Dostępne Komendy

### Formatowanie kodu:

```bash
# Formatuj wszystkie pliki
npm run format

# Sprawdź formatowanie bez zmian
npm run format:check

# Formatuj tylko frontend
npm run format:client

# Formatuj tylko backend
npm run format:server
```

### Praca z projektem:

```bash
# Zainstaluj zależności
npm install

# Uruchom frontend
npm run dev:client

# Zbuduj frontend
npm run build

# Uruchom linting
npm run lint
```

## Workflow Developera

1. **Przed rozpoczęciem pracy:**

   ```bash
   git pull origin main
   npm install
   ```

2. **Podczas pracy:**
   - Kod jest automatycznie formatowany przy zapisie (jeśli skonfigurowane w IDE)
   - Lub uruchom `npm run format` ręcznie

3. **Przed commitem:**
   - Husky automatycznie uruchomi `lint-staged` (formatowanie)
   - Sprawdzi konwencję nazewnictwa commita

4. **Commit:**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

## Konfiguracja IDE

### VS Code (.vscode/settings.json):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[java]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### IntelliJ IDEA:

1. Zainstaluj plugin "Prettier"
2. File → Settings → Tools → File Watchers → Add Prettier
3. Skonfiguruj automatyczne formatowanie przy zapisie

## Rozwiązywanie Problemów

### Błędy commitlint:

```bash
# Sprawdź ostatni commit
npx commitlint --from HEAD~1 --to HEAD --verbose

# Edytuj ostatni commit
git commit --amend -m "feat: poprawny format commita"
```

### Błędy formatowania:

```bash
# Napraw wszystkie pliki
npm run format

# Sprawdź które pliki mają problemy
npm run format:check
```

### Pominięcie hooków (tylko w wyjątkowych sytuacjach):

```bash
# Pomiń pre-commit hook
git commit --no-verify -m "feat: emergency fix"

# Pomiń commit-msg hook
git commit --no-verify -m "temporary commit"
```

## Struktura Plików

```
justDrinkJava/
├── .husky/                 # Git hooks
│   ├── pre-commit         # Lint-staged hook
│   └── commit-msg         # Commitlint hook
├── .prettierrc            # Konfiguracja Prettier
├── .prettierignore        # Pliki ignorowane przez Prettier
├── commitlint.config.js   # Konfiguracja Commitlint
├── package.json           # Główna konfiguracja projektu
├── client/                # Frontend React
└── server/                # Backend Spring Boot
```
