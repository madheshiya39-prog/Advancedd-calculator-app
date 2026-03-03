# Advanced Calculator - APK Build Guide

## Quick Start (Using GitHub Actions - Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click **New Repository**
3. Name it: `advanced-calculator-app`
4. Choose **Public** (for free GitHub Actions)
5. Click **Create Repository**

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /path/to/advanced_calculator_project
git add .
git commit -m "Initial commit: Advanced Calculator with Capacitor"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/advanced-calculator-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: GitHub Actions Will Build Automatically

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see "Build APK" workflow running
4. Wait for it to complete (usually 5-10 minutes)
5. Once complete, click on the workflow run
6. Scroll down to **Artifacts** section
7. Download `advanced-calculator-debug.apk`

### Step 4: Install on Android Device

1. Transfer the APK to your Android phone
2. Open a file manager on your phone
3. Tap the APK file
4. Tap **Install**
5. Done! The app is now installed

---

## Alternative: Build Locally

If you prefer to build on your machine:

### Requirements

- **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- **Java JDK 11** - [Download](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Android SDK** - [Download Android Studio](https://developer.android.com/studio)
- **Gradle** (comes with Android Studio)

### Local Build Steps

```bash
# 1. Clone or extract the project
cd advanced_calculator_project

# 2. Install dependencies
npm install

# 3. Sync with Android
npx cap sync android

# 4. Build APK
cd android
./gradlew assembleDebug

# 5. APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Project Structure

```
advanced_calculator_project/
├── advanced_calculator/          # Web app files
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── service-worker.js
│   ├── manifest.json
│   └── README.md
├── android/                      # Android project
│   ├── app/
│   ├── gradle/
│   └── build.gradle
├── capacitor.config.json         # Capacitor config
├── package.json                  # Node dependencies
├── .github/
│   └── workflows/
│       └── build-apk.yml        # GitHub Actions workflow
└── APK_BUILD_GUIDE.md           # This file
```

---

## Features Included in APK

✅ **Calculator Operations**
- Basic math: +, −, ×, ÷, %
- Scientific mode: sin, cos, tan, √, x², x³, log, ln, π, e, n!, 1/x
- Calculation history with timestamps
- Persistent history (survives app restart)

✅ **Currency Converter**
- 20+ currencies
- Live exchange rates
- Offline mode with cached rates
- Swap currencies

✅ **User Interface**
- Dark mode toggle
- Responsive mobile design
- Smooth animations
- Tab navigation

✅ **Offline Support**
- Works completely offline
- All data stored locally
- Service Worker caching

✅ **Additional Features**
- Copy result to clipboard
- Export history as CSV
- Keyboard support
- Error handling

---

## Troubleshooting

### GitHub Actions Build Fails

**Problem**: Workflow shows red X  
**Solution**: 
- Check the workflow logs (click on the failed run)
- Ensure all files are committed and pushed
- Try re-running the workflow

### APK Won't Install

**Problem**: "App not installed" error  
**Solution**:
- Enable "Unknown Sources" in Android settings
- Ensure you have enough storage space
- Try uninstalling any previous version first

### App Crashes on Startup

**Problem**: App crashes immediately  
**Solution**:
- Check Android version compatibility (requires Android 5.0+)
- Clear app cache and data
- Reinstall the app

### Can't Find APK Download

**Problem**: No artifacts in GitHub Actions  
**Solution**:
- Wait for workflow to complete (green checkmark)
- Scroll down in the workflow run page
- Look for "Artifacts" section on the right side

---

## Building Release APK (Signed)

For production release, you'll need to sign the APK:

1. Generate a keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2. Update `android/app/build.gradle` with signing config

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

---

## Uploading to Google Play Store

To publish on Google Play:

1. Create a [Google Play Developer Account](https://play.google.com/console) ($25 one-time fee)
2. Create a new app
3. Generate signed release APK (see above)
4. Upload APK and fill in app details
5. Submit for review

---

## Support & Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Android Development**: https://developer.android.com
- **Calculator App README**: See `advanced_calculator/README.md`

---

## Version Info

- **Capacitor**: v5.x
- **Node.js**: v16+
- **Java**: JDK 11
- **Android**: API 21+ (Android 5.0+)
- **Gradle**: 7.x

---

**Last Updated**: March 2026  
**Status**: Production Ready
