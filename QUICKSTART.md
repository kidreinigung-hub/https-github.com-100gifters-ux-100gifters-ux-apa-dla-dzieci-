# 🚀 Szybki Start - Autyzm App

## Instalacja w 5 minut

### 1. Zainstaluj Node.js
Pobierz z https://nodejs.org/ (v16+ lub wyżej)

### 2. Otwórz terminal i przejdź do folderu projektu
```bash
cd "Apka dla dzieci z autyzmem"
```

### 3. Zainstaluj zależności
```bash
npm install
```

### 4. Uruchom aplikację
```bash
npm start
```

Aplikacja otworzy się automatycznie w przeglądarce na `http://localhost:3000`

## 📱 Uruchamianie na urządzeniach

### Windows
```bash
npm start
```

### Mac
```bash
npm start
```

### Linux
```bash
npm start
```

## 🎮 Testowanie aplikacji

1. Kliknij **🎮 Gry** aby zobaczyć listę 20 gier
2. Wybierz grę i poziom trudności
3. Kliknij **Graj**
4. Testuj różne gry

## ⚙️ Konfiguracja

Otwórz **⚙️ Ustawienia**:
- Zmień język (200+ do wyboru)
- Dostosuj dźwięk
- Włącz wysoki kontrast
- Dostosuj rozmiar przycisków

## 🏗️ Budowanie dla produkcji

```bash
npm run build
```

Wynik będzie w folderze `build/`

## 📚 Struktura projektu

- **src/** - Kod źródłowy
  - `components/` - Komponenty React
  - `pages/` - Strony aplikacji
  - `data/` - Dane (słowa, gry)
  - `store/` - Stan aplikacji
  - `i18n/` - Wielojęzyczność
  - `styles/` - Style CSS

## 🐛 Rozwiązywanie problemów

### Problem: Port 3000 jest zajęty
```bash
npm start -- --port 3001
```

### Problem: Błędy npm
```bash
rm -rf node_modules
npm install
```

### Problem: Czyszczenie cache
```bash
npm start -- --reset-cache
```

## 📖 Dokumentacja

- [README.md](README.md) - Pełna dokumentacja
- [package.json](package.json) - Zależności i skrypty

## 💡 Wskazówki

- Aplikacja działa offline
- Wszystkie dane przechowywane lokalnie
- Brak potrzeby logowania
- Obsługa ekranów dotykowych i myszy

## 🆘 Wsparcie

Jeśli masz problemy:
1. Sprawdź czy Node.js jest zainstalowany: `node --version`
2. Sprawdź czy jesteś w poprawnym folderze
3. Usuń `node_modules` i zainstaluj ponownie

---

**Powodzenia! 🎉**
