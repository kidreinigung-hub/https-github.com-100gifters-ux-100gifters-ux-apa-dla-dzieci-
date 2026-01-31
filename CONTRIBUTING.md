# Jak Wnieść Wkład - Contributing

Dziękujemy za zainteresowanie projektem Autyzm App! 

## Zasady Contributing

Zanim zaproponujesz zmiany, przeczytaj poniższe wytyczne.

## Typy Wkładów

### 1. Zgłaszanie Błędów (Bug Reports)
```markdown
**Opis problemu:**
Krótko opisz co się stało

**Kroki do reprodukcji:**
1. Wykonaj ...
2. Następnie ...
3. Zobaczysz ...

**Oczekiwane zachowanie:**
Co powinno się stać

**Faktyczne zachowanie:**
Co się stało

**Środowisko:**
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Device: Desktop/Mobile/Tablet
```

### 2. Propozycje Funkcji (Feature Requests)
```markdown
**Problem, który rozwiązuje:**
Wyjaśnij problem

**Proponowane rozwiązanie:**
Opisz rozwiązanie

**Alternatywy:**
Inne podejścia

**Kontekst dodatkowy:**
Dodaj screen, zdjęcia, itp.
```

### 3. Ulepszenia (Improvements)
- Optymalizacja kodu
- Poprawa UI/UX
- Lepsze tłumaczenia
- Dokumentacja

## Jak Wnieść Kod

### 1. Fork Repository
```bash
git clone <URL>
cd "Apka dla dzieci z autyzmem"
```

### 2. Utwórz Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Wprowadź Zmiany
- Przestrzegaj stylów kodu
- Dodaj komentarze gdzie potrzeba
- Testuj na różnych urządzeniach

### 4. Commit i Push
```bash
git add .
git commit -m "Add feature: your feature description"
git push origin feature/your-feature-name
```

### 5. Utwórz Pull Request
- Opisz co zmienili
- Linki do Issues
- Screenshots (jeśli UI)

## Standardy Kodowania

### JavaScript/React
```javascript
// Naming conventions
const myVariable = 'value'        // camelCase
const MyComponent = () => {}      // PascalCase
const MY_CONSTANT = 'value'       // UPPER_SNAKE_CASE

// Import order
import React from 'react'
import { useState } from 'react'
import external from 'external-lib'
import local from './local'

// Component structure
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null)
  
  const handleClick = () => {
    // Handler logic
  }
  
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

export default MyComponent
```

### CSS/SCSS
```css
/* Use CSS modules */
.className {
  display: flex;
  gap: var(--spacing-md);
}

/* Use variables */
background-color: var(--color-primary);
font-size: var(--font-size-medium);
```

### Dostępność
```javascript
// Zawsze dodawaj aria labels
<button aria-label="Zamknij menu">×</button>

// Obsługuj keyboard
onKeyPress={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction()
  }
}}

// Testuj z czytnikami ekranu
// Testuj z dużymi przyciskami
```

## Testowanie

### Przed Pull Request
- [ ] Testy manualne na desktop
- [ ] Testy manualne na mobile
- [ ] Sprawdzenie w DevTools (Console)
- [ ] Test dostępności (keyboard nav)
- [ ] Test wielojęzyczności (co najmniej 2 języki)
- [ ] Test ustawień dostępności

### Polecenie Testów
```bash
npm test
```

## Dokumentacja

### Dodaj dokumentację dla:
- Nowych komponentów
- Nowych funkcji
- API zmian
- Breaking changes

```javascript
/**
 * Krótki opis
 * 
 * @param {type} paramName - Opis parametru
 * @returns {type} Opis zwracanej wartości
 * 
 * @example
 * const result = myFunction(param)
 */
export const myFunction = (paramName) => {
  // Implementation
}
```

## Proces Review

1. **Automatyczne Sprawdzenia**
   - Linting (ESLint)
   - Type checking
   - Build success

2. **Code Review**
   - Sprawdzenie kodu
   - Sugestie ulepszeń
   - Request changes (jeśli potrzeba)

3. **Approval**
   - 👍 Zatwierdzenie
   - Merge do main

## Obszary Współpracy

### Gry 🎮
- Brakuje: 17 gier (20 zaplanowanych)
- Struktura jest gotowa
- Dodaj nową grę w `src/components/games/`

### Słowa 📚
- Brakuje: 1800+ słów
- Dodaj słowa w `src/data/wordsBase.js`
- Każdy język potrzebuje pełnej bazy

### Tłumaczenia 🌍
- Brakuje: 197 języków (3 są complete)
- Tłumacz codzienny w `src/i18n/config.js`
- Pomocni tłumacze są mile widziani

### Grafiki 🎨
- Brakuje: Obrazki dla wszystkich słów
- Potrzebne: SVG lub PNG (przezroczyste)
- Konwencja nazewnictwa: lowercase-with-dashes

### Dźwięki 🔊
- Brakuje: Wymowa słów w różnych językach
- Format: MP3 (128kbps)
- Długość: 1-3 sekundy

## Code of Conduct

### Oczekujemy:
- ✅ Szacunku dla innych
- ✅ Konstruktywnej krytyki
- ✅ Skupienia na problemie, nie osobie
- ✅ Inclusivity (wszystkie perspektywy)

### Niedopuszczalne:
- ❌ Harassment
- ❌ Discriminatory language
- ❌ Trolling
- ❌ Spam

## Licencja

Przez contributing, zgadzasz się że Twój kod będzie pod licencją opisaną w LICENSE.md

## Kontakt

- 📧 Email: [contact@example.com]
- 💬 Discord: [link]
- 🐦 Twitter: [@handle]

## Dziękujemy! 🙏

Każdy wkład, niezależnie od rozmiaru, jest cenny dla tej misji!

---

**Razem tworzymy lepszą edukację dla dzieci z autyzmem.**
