# Advanced Calculator - Mobile App Project

A fully functional advanced calculator application built with Capacitor, featuring offline support, scientific mode, currency converter, and persistent history.

## 📱 Quick Start

### Option 1: Download Pre-built APK (Easiest)
- GitHub Actions automatically builds the APK
- Download from the Actions tab in your GitHub repository
- Install directly on your Android device

### Option 2: Build Locally
```bash
npm install
npx cap sync android
cd android && ./gradlew assembleDebug
```

### Option 3: Use GitHub Actions (Recommended)
1. Push code to GitHub
2. GitHub Actions builds automatically
3. Download APK from Artifacts

**See [APK_BUILD_GUIDE.md](./APK_BUILD_GUIDE.md) for detailed instructions**

---

## ✨ Features

### Calculator
- Basic operations: +, −, ×, ÷, %
- Scientific mode: trigonometry, logarithms, constants
- Calculation history with timestamps
- Persistent history (survives app restart)
- Copy result to clipboard
- Export history as CSV

### Currency Converter
- 20+ supported currencies
- Live exchange rates
- Offline mode with cached rates
- Bidirectional conversion
- Swap currencies instantly

### User Experience
- Dark mode toggle
- Responsive mobile design
- Smooth animations
- Keyboard support
- Error handling

### Offline Support
- Works completely offline
- Service Worker caching
- Local data storage
- No internet required for calculations

---

## 📁 Project Structure

```
.
├── advanced_calculator/          # Web app source
│   ├── index.html               # Main UI
│   ├── style.css                # Styling
│   ├── script.js                # Logic
│   ├── service-worker.js        # Offline support
│   ├── manifest.json            # PWA config
│   └── README.md                # App documentation
├── android/                      # Android project
├── capacitor.config.json         # Capacitor config
├── package.json                  # Dependencies
├── .github/workflows/
│   └── build-apk.yml           # CI/CD workflow
├── APK_BUILD_GUIDE.md           # Build instructions
└── README.md                     # This file
```

---

## 🔧 Requirements

### For GitHub Actions Build (Recommended)
- GitHub account (free)
- Git installed
- No local setup needed!

### For Local Build
- Node.js v16+
- Java JDK 11
- Android SDK
- Gradle

---

## 🚀 Build Instructions

### Using GitHub Actions (Easiest)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/advanced-calculator-app.git
   git push -u origin main
   ```

2. **Wait for Build**
   - Go to repository → Actions tab
   - Watch "Build APK" workflow complete
   - Takes 5-10 minutes

3. **Download APK**
   - Click completed workflow
   - Scroll to Artifacts
   - Download `advanced-calculator-debug.apk`

4. **Install on Phone**
   - Transfer APK to Android device
   - Open file manager
   - Tap APK → Install

### Local Build

```bash
# Install dependencies
npm install

# Sync with Android
npx cap sync android

# Build debug APK
cd android
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📋 System Requirements

| Component | Version |
|-----------|---------|
| Node.js | v16+ |
| Java JDK | 11 |
| Android API | 21+ (Android 5.0+) |
| Gradle | 7.x |
| Capacitor | v5.x |

---

## 🎯 Features in Detail

### Calculator Operations
- **Basic**: Addition, Subtraction, Multiplication, Division, Percentage
- **Scientific**: sin, cos, tan, √, x², x³, log, ln, π, e, n!, 1/x
- **History**: Automatic saving with timestamps, persistent storage
- **Export**: CSV format for external analysis

### Currency Converter
- **Currencies**: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD, INR, MXN, SGD, HKD, NOK, KRW, TRY, RUB, BRL, ZAR
- **Rates**: Live from exchangerate-api.com
- **Offline**: Last cached rate shown when offline
- **Conversion**: Real-time bidirectional conversion

### User Interface
- **Themes**: Light and dark modes
- **Responsive**: Optimized for all screen sizes
- **Animations**: Smooth transitions and effects
- **Accessibility**: Keyboard support, clear labels

---

## 🔒 Security & Privacy

- ✅ All data stored locally on device
- ✅ No user tracking
- ✅ No personal data collection
- ✅ Works offline - no data sent to servers
- ✅ Open source code

---

## 📦 Build Output

After successful build, you'll get:
- `app-debug.apk` - Debug APK for testing
- `app-release.apk` - Signed release APK (if configured)

---

## 🐛 Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Ensure all files are committed
- Try re-running the workflow

### APK Won't Install
- Enable "Unknown Sources" in settings
- Check Android version (5.0+)
- Clear previous installation

### App Crashes
- Check logcat output
- Ensure Android 5.0 or higher
- Clear app cache

See [APK_BUILD_GUIDE.md](./APK_BUILD_GUIDE.md) for more troubleshooting.

---

## 📚 Documentation

- **App Features**: See `advanced_calculator/README.md`
- **Build Guide**: See `APK_BUILD_GUIDE.md`
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Dev**: https://developer.android.com

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Consult Capacitor documentation
4. Check Android documentation

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready ✅

Built with ❤️ using Capacitor
