# 🎮 Autyzm - Asystent dla Dzieci

**Zaawansowana aplikacja wspierająca rozwój i naukę dzieci z autyzmem**

## 📋 Cechy aplikacji

- ✨ **20 mini gier** edukacyjnych i angażujących
- 📚 **Biblioteka 2000+ słów** w 200+ językach
- 🎯 **Personalizacja** - ustawienia dla każdego dziecka
- 📊 **Statystyki postępu** - wykresy i raporty PDF
- ♿ **Dostępność** - obsługa alternatywnych trybow wyświetlania
  - Wysoki kontrast
  - Tryb czarno-biały
  - Brak animacji
  - Duże przyciski
  - Wyłączanie dźwięków
- 🌐 **200+ języków** do wyboru
- 📱 **Responsywny** - obsługa ekranów dotykowych i myszy
- 💾 **Bez logowania** - proste i szybkie

## 🎮 Gry w aplikacji

1. **Memoria** - Gra pamięciowa
2. **Dopasowywanie** - Połącz przedmioty z nazwami
3. **Quiz Słów** - Zgadnij słowo z obrazka
4. **Poznaj Emocje** - Rozpoznawanie emocji
5. **Sortowanie Kolorów** - Pogrupuj wedługolorów
6. **Sekwencje** - Ułóż w odpowiedniej kolejności
7. **Liczenie** - Policz przedmioty
8. **Sortowanie Kategorii** - Pogrupuj w kategorie
9. **Kształty** - Dopasuj kształty
10. **Znajdź Przedmiot** - Wyszukiwanie wzrokowe
11. **Puzzle** - Złóż puzzle
12. **Dopasowanie Dźwięków** - Rozpoznawanie dźwięków
13. **Gra Parami** - Znajdź pary
14. **Sekwencje Czynności** - Wykonaj w kolejności
15. **Matematyka** - Proste działania
16. **Burzenie Budynków** - Buduj i burz
17. **Klikanie** - Reaguj na pojawiające się przyciski
18. **Samochodziki** - Rowernik samochodem
19. **Przeciągnij i Upuść** - Drag & Drop
20. **Szybkie Dopasowanie** - Gra na szybkość

## 🛠️ Instalacja

### Wymagania
- Node.js 16+ 
- npm lub yarn

### Kroki

1. **Klonuj repozytorium**
```bash
git clone <URL>
cd "Apka dla dzieci z autyzmem"
```

2. **Zainstaluj zależności**
```bash
npm install
# lub
yarn install
```

3. **Uruchom aplikację**
```bash
npm start
# lub
yarn start
```

4. **Buduj aplikację** (do produkcji)
```bash
npm run build
# lub
yarn build
```

## 📝 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── common/         # Komponenty wspólne (ButtonBig, Card)
│   ├── layout/         # Layout (Header, Navigation)
│   └── games/          # Komponenty gier
├── pages/              # Główne strony aplikacji
│   ├── HomePage.jsx
│   ├── GamesPage.jsx
│   ├── LibraryPage.jsx
│   ├── StatisticsPage.jsx
│   └── SettingsPage.jsx
├── data/               # Dane aplikacji
│   ├── wordsBase.js    # Baza słów
│   └── gamesConfig.js  # Konfiguracja gier
├── store/              # Stan aplikacji (Zustand)
│   └── appStore.js
├── i18n/               # Konfiguracja języków
│   └── config.js
├── utils/              # Funkcje pomocnicze
│   └── helpers.js
├── styles/             # Style globalne
│   └── variables.css
├── App.jsx
├── index.jsx
└── index.css
```

## 🎨 Personalizacja

### Ustawienia dostępności
- **Dźwięk** - Włącz/wyłącz, regulacja głośności
- **Wizualna** - Wysoki kontrast, czarno-biały, brak animacji
- **Rozmiary** - Przycisków, tekstu
- **Gry** - Wyłączanie timerów

### Profil dziecka
- Imię
- Wiek
- Poziom trudności (łatwy/średni/trudny)
- Zainteresowania
- Nadwrażliwości

## 📊 Statystyki

Aplikacja śledzi:
- Słów opanowanych
- Gier zagranych
- Procent poprawnych odpowiedzi
- Ulubione gry
- Postęp czasowy

### Eksport do PDF
Możliwość eksportowania raportu dla terapeuty lub logopedy

## 🌍 Obsługiwane języki

Aplikacja obsługuje **200+ języków** w tym:
- 🇵🇱 Polski
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇫🇷 Français
- 🇪🇸 Español
- I wiele więcej...

## 💾 Przechowywanie danych

Wszystkie dane są przechowywane **lokalnie** (localStorage):
- Ustawienia
- Profil dziecka
- Słowa niestandardowe
- Statystyki
- Postęp nauki

**Brak przesyłania danych na serwery!**

## 🎓 Możliwości edukacyjne

### Biblioteka słów
- 2000+ słów wbudowanych
- Możliwość dodawania własnych słów
- Dodawanie własnych obrazów
- Dodawanie własnych dźwięków
- Tworzenie własnych kategorii

### Tworzenie własnych gier
- Możliwość tworzenia gier z własnymi grafikami
- Niestandardowe kategorie
- Dostosowanie do potrzeb dziecka

## 🔒 Bezpieczeństwo

- ✅ Brak zbierania danych osobowych
- ✅ Brak logowania
- ✅ Dane przechowywane lokalnie
- ✅ Brak reklam
- ✅ Brak śledzenia

## 💰 Cena

**259 PLN - jednorazowy zakup**

Zawiera:
- Pełną aplikację z wszystkimi grami
- Bibliotekę 2000+ słów
- Wszystkie funkcjonalności
- Darmowe aktualizacje

## 🚀 Plany rozwoju

- [ ] Więcej gier (do 30+)
- [ ] Więcej słów (do 5000+)
- [ ] Offline support (PWA)
- [ ] Synchronizacja między urządzeniami
- [ ] Materiały dla terapeutów
- [ ] Integracja z systemami edukacyjnymi

## 📧 Kontakt i wsparcie

- 📧 Email: [email@example.com]
- 🌐 Strona: [website]
- 💬 Forum: [forum]

## 📄 Licencja

Prywatne - Wszystkie prawa zastrzeżone

## 👨‍👩‍👧‍👦 Dla rodziców

Ta aplikacja została stworzona z myślą o dzieciach z autyzmem. Może być pomocna dla:
- Dzieci ze spektrum autyzmu (ASD)
- Dzieci z opóźnieniem mowy
- Dzieci z trudnościami w komunikacji
- Dzieci z nadwrażliwością sensoryczną

## ⚠️ Ważne

Ta aplikacja **nie jest substytutem** dla profesjonalnego wsparcia terapeutycznego. Zalecamy konsultację z logopedą lub terapeutą specjalizującym się w pracy z dziećmi z autyzmem.

---

**Stworzone z ❤️ dla każdego dziecka**
