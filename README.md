# Advanced Calculator Web App

A fully functional advanced calculator web application with offline support, currency converter, scientific mode, and persistent history management using localStorage and Service Worker.

## Features

### Core Calculator Features
- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷), Percentage (%)
- **Calculation History**: All calculations are automatically saved with timestamps
- **Persistent History**: History is stored in localStorage and persists even after closing and reopening the app
- **Clear History Button**: Manually delete all history with a single click
- **Copy Result**: Copy calculation results to clipboard with one click
- **Export History**: Export all calculation history as CSV file for external use

### Scientific Calculator Mode
- **Trigonometric Functions**: sin, cos, tan (in degrees)
- **Power Functions**: x², x³
- **Logarithmic Functions**: log (base 10), ln (natural logarithm)
- **Mathematical Constants**: π (pi), e (Euler's number)
- **Advanced Functions**: Square root (√), Factorial (n!), Reciprocal (1/x)
- **Mode Toggle**: Easy switch between basic and scientific modes

### Currency Converter
- **Live Exchange Rates**: Fetches real-time rates from exchangerate-api.com
- **20+ Currencies**: Supports USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD, INR, MXN, SGD, HKD, NOK, KRW, TRY, RUB, BRL, ZAR
- **Offline Support**: Shows last cached exchange rates when offline
- **Bidirectional Conversion**: Swap currencies with one click
- **Live Updates**: Rates update automatically when online

### User Interface
- **Dark Mode Toggle**: Switch between light and dark themes with persistent preference
- **Responsive Design**: Fully mobile-friendly interface
- **Smooth Animations**: Button animations and transitions for better UX
- **Tab Navigation**: Easy switching between Calculator and Currency Converter
- **Error Handling**: Displays "Invalid Input" messages instead of breaking

### Offline Support
- **Service Worker**: Full offline functionality after first load
- **Cached Files**: All HTML, CSS, and JavaScript files are cached
- **Progressive Web App**: Can be installed as a standalone app on mobile devices
- **No Internet Required**: All basic calculations work completely offline

### Keyboard Support
- **Number Keys**: 0-9 for input
- **Operators**: +, -, *, / for operations
- **Enter/=**: Calculate result
- **Backspace**: Delete last digit
- **Escape**: Clear calculator

## File Structure

```
advanced_calculator/
├── index.html           # Main HTML file with calculator and currency converter UI
├── style.css           # Complete styling with dark mode and responsive design
├── script.js           # Calculator logic, scientific functions, and currency converter
├── service-worker.js   # Service Worker for offline caching
├── manifest.json       # PWA manifest for app installation
└── README.md          # This file
```

## Installation & Usage

### Local Development
1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The app will automatically register the Service Worker for offline support

### As a Progressive Web App
1. Open the app in a modern browser (Chrome, Firefox, Edge, Safari)
2. Click the install button (usually in the address bar or menu)
3. The app will be installed as a standalone application
4. Works offline after first load

## Technical Details

### Calculator Class
- Manages calculator state and operations
- Handles scientific functions
- Manages calculation history with localStorage
- Supports CSV export functionality

### Currency Converter Class
- Fetches exchange rates from exchangerate-api.com
- Caches rates in localStorage for offline use
- Detects online/offline status
- Provides bidirectional currency conversion

### Service Worker
- Implements cache-first strategy for static assets
- Network-first strategy for API calls
- Automatic cache updates
- Graceful fallback for offline scenarios

### Data Storage
- **localStorage**: Stores calculator history and exchange rates
- **Browser Cache**: Managed by Service Worker for offline access

## Browser Compatibility

- Chrome/Chromium 40+
- Firefox 44+
- Safari 11.1+
- Edge 15+
- Opera 27+

## API Used

- **exchangerate-api.com**: Free tier for currency exchange rates
  - No authentication required
  - Rate limit: 1,500 requests/month (free tier)
  - Supports 160+ currencies

## Performance

- **First Load**: ~50KB total (HTML, CSS, JS)
- **Offline**: Instant response, no network calls
- **Currency Conversion**: <500ms with online connection
- **Calculations**: <1ms for all operations

## Accessibility

- Keyboard navigation support
- Clear visual feedback for all interactions
- High contrast in both light and dark modes
- Semantic HTML structure
- ARIA labels for screen readers

## Future Enhancements

- Graphing calculator with function plotting
- Matrix operations
- Unit converter (length, weight, temperature)
- Calculation templates for common formulas
- Custom themes and color schemes
- Voice input for calculations
- Calculation sharing via QR code

## License

This project is open source and available for personal and commercial use.

## Support

For issues, feature requests, or improvements, please refer to the code comments or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready
