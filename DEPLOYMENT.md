# 📦 Deployment & Installation Guide

## Wymagania Systemowe

### Minimum
- Windows 7+ / Mac OS 10.12+ / Linux
- 200MB wolnego miejsca
- Internet (tylko do instalacji)

### Recommended
- Windows 10+ / Mac OS 12+ / Linux (Ubuntu 20+)
- 500MB wolnego miejsca
- Modern browser (Chrome, Firefox, Safari, Edge)

---

## Instalacja Dla Użytkownika Końcowego

### Opcja 1: Instalator Windows (Recommended)

1. **Pobierz instalator**
   - Pobierz `autism-app-installer.exe` z [website]

2. **Uruchom instalator**
   - Double-click na `.exe` plik
   - Zaakceptuj User Account Control
   - Postępuj zgodnie z instrukcjami

3. **Uruchom aplikację**
   - Aplikacja pojawi się w Start Menu
   - Lub desktop shortcut

### Opcja 2: Instalacja Manualna

1. **Pobierz Node.js**
   - Pobierz z https://nodejs.org/ (v16+ LTS)
   - Zainstaluj (next, next, finish)

2. **Pobierz aplikację**
   - Pobierz `autism-app-v1.0.0.zip` z [website]
   - Rozpakuj do folderu

3. **Otwórz terminal w folderze aplikacji**
   ```bash
   cd "Apka dla dzieci z autyzmem"
   ```

4. **Zainstaluj zależności**
   ```bash
   npm install
   ```

5. **Uruchom aplikację**
   ```bash
   npm start
   ```
   - Aplikacja otworzy się w przeglądarce

### Opcja 3: Portable Version

1. **Pobierz**
   - `autism-app-portable.zip`

2. **Rozpakuj**
   - Rozpakuj wszędzie

3. **Uruchom**
   - Double-click `start.bat` (Windows)
   - Or `start.sh` (Mac/Linux)

---

## Instalacja na Schulach / Instytucjach

### Multi-Computer Setup

1. **Przygotuj folder sieciowy**
   ```
   \\server\autism-app\
   ```

2. **Zainstaluj na każdym komputerze**
   - Skopiuj folder aplikacji
   - Uruchom instalator

3. **Ustawienia sieciowe (optional)**
   - Sync settings z centralnego serwera
   - Backup danych

### Deployment Script
```bash
# install-all-computers.bat
@echo off
for /f "tokens=1,2 delims= " %%A in (computers.txt) do (
    echo Installing on %%A
    psexec \\%%A cmd /c "cd C:\autism-app && npm install && npm start"
)
```

---

## Cloud Deployment (Future)

### Docker Support
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Build Docker Image
```bash
docker build -t autism-app:1.0 .
docker run -p 3000:3000 autism-app:1.0
```

### Docker Compose
```yaml
version: '3'
services:
  app:
    image: autism-app:1.0
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_DEBUG=false
    volumes:
      - ./data:/app/data
```

---

## Update Process

### Automatic Updates
1. Aplikacja sprawdza aktualizacje przy uruchomieniu
2. Jeśli dostępna jest nowa wersja, wyświetla powiadomienie
3. Użytkownik może zaakceptować update
4. Aplikacja się restartuje

### Manual Update
```bash
cd "Apka dla dzieci z autyzmem"
git pull origin main
npm install
npm start
```

### Update Script
```bash
#!/bin/bash
# update.sh

echo "Checking for updates..."
git fetch origin
git pull origin main
npm install
npm run build

echo "Update complete!"
echo "Run 'npm start' to launch"
```

---

## Backup & Recovery

### Backup Danych
```bash
# Backup user data
tar -czf backup-$(date +%Y%m%d).tar.gz ~/.autism-app-data/

# Restore from backup
tar -xzf backup-20240131.tar.gz -C ~/
```

### Folder Danych
- Windows: `C:\Users\[Username]\AppData\Local\autism-app\`
- Mac: `~/Library/Application Support/autism-app/`
- Linux: `~/.local/share/autism-app/`

### LocalStorage Backup
```javascript
// Export
const data = localStorage.getItem('autism-app-store')
const blob = new Blob([data], { type: 'application/json' })
const url = URL.createObjectURL(blob)
// Download

// Import
const imported = JSON.parse(imported_json)
localStorage.setItem('autism-app-store', JSON.stringify(imported))
```

---

## Troubleshooting Installation

### Problem: "Node.js not found"
**Solution:**
```bash
# Check Node version
node --version

# If not found, reinstall Node.js from https://nodejs.org/
```

### Problem: "Port 3000 already in use"
**Solution:**
```bash
# Use different port
npm start -- --port 3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Problem: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If still fails:
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Application won't start"
**Solution:**
```bash
# Check console for errors
npm start

# Look for error messages
# Clear browser cache (Ctrl+Shift+Delete)
# Try different browser

# Check logs:
npm start 2>&1 | tee app.log
```

---

## Performance Optimization

### For Older Computers

```bash
# Build optimized version
npm run build

# Serve from build folder (faster)
npm install -g serve
serve -s build -l 3000
```

### Memory Usage
- Typical: 150-200MB
- With multiple games open: 250-300MB
- Max safe: 512MB (for older devices)

### Caching
```javascript
// Enable service worker for offline
// Add to public/index.html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
</script>
```

---

## Security Considerations

### Data Protection
- ✅ All data stored locally
- ✅ No personal information transmitted
- ✅ No cookies or tracking
- ✅ Offline-first architecture

### Updates
- ✅ Verify installation from trusted source
- ✅ Keep Node.js updated
- ✅ Regular security audits

---

## Uninstallation

### Windows
1. Go to Settings → Apps → Apps & features
2. Find "Autism - Assistant for Children"
3. Click Uninstall
4. Confirm

### Mac
1. Open Finder → Applications
2. Find "Autism"
3. Drag to Trash
4. Empty Trash

### Linux
```bash
# If installed via package manager
sudo apt remove autism-app

# If installed manually
rm -rf ~/autism-app/
```

### Keep Data (After Uninstall)
Data is stored in system AppData folder and won't be deleted.

To completely remove:
- Windows: `%APPDATA%\autism-app\`
- Mac: `~/Library/Application Support/autism-app/`
- Linux: `~/.local/share/autism-app/`

---

## Support

### If Installation Fails

**Before contacting support, try:**
1. ✅ Check internet connection
2. ✅ Run as Administrator (Windows)
3. ✅ Disable antivirus temporarily
4. ✅ Update browser
5. ✅ Clear cache
6. ✅ Restart computer

**Contact Support:**
- 📧 Email: support@example.com
- 💬 Live Chat: [website]
- 📞 Phone: [number]
- 🕐 Hours: Monday-Friday 9AM-5PM CET

**Include in support request:**
- Windows/Mac/Linux version
- Error message (screenshot)
- npm version
- Browser name and version

---

## System Requirements (Detailed)

### OS Support
| OS | Version | Status |
|---|---|---|
| Windows | 7+ | ✅ Supported |
| Windows | 8/8.1 | ✅ Supported |
| Windows | 10/11 | ✅ Recommended |
| macOS | 10.12+ | ✅ Supported |
| macOS | 11+ | ✅ Recommended |
| Linux | Ubuntu 18.04+ | ✅ Supported |
| Linux | Ubuntu 20.04+ | ✅ Recommended |

### Browser Support
| Browser | Version | Status |
|---|---|---|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| IE 11 | - | ❌ Not Supported |

---

**Installation Complete! 🎉**

Read [QUICKSTART.md](QUICKSTART.md) for next steps.
