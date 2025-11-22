# Unserialize and Compare

A free, privacy-first online tool to unserialize PHP and JSON data, beautify serialized data, and compare multiple results side by side and share it. All processing happens in your browser - no cookies, no tracking, no server storage.

🌐 **Live Site:** [unserializeguru.com](https://unserializeguru.com)

## ✨ Features

- **Unserialize PHP Data** - Automatically detect and unserialize PHP serialized data
- **Unserialize JSON Data** - Parse and beautify JSON data with proper formatting
- **Side-by-Side Comparison** - Compare up to 3 different unserialized data sets simultaneously
- **Beautify Serialized Data** - Format serialized data for easy reading and analysis
- **Shareable Links** - Generate shareable URLs with encoded comparison data
- **100% Client-Side** - All processing happens in your browser
- **Privacy First** - No cookies, no tracking, no server storage
- **Auto-Detection** - Automatically detects PHP vs JSON format
- **Error Handling** - Clear error messages for invalid data
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19.0 or higher (or 22.12.0+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unseriz-and-compare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **php-serialize** - PHP unserialization library
- **pako** - Data compression for URL encoding
- **@tabler/icons-react** - Icon library
- **@vercel/analytics** - Analytics (Vercel deployment)
- **@vercel/speed-insights** - Performance monitoring

## 📁 Project Structure

```
unserializ-and-compare/
├── public/
│   ├── robots.txt          # SEO robots file
│   ├── sitemap.xml        # SEO sitemap
│   └── uac.svg            # Favicon
├── src/
│   ├── components/
│   │   ├── App.jsx        # Main application component
│   │   ├── Form.jsx       # Form component for data input
│   │   └── ResultDisplay.jsx  # Component to display unserialized data
│   ├── utils/
│   │   ├── unserialize.js # Unserialization logic (PHP/JSON)
│   │   └── urlEncoder.js  # URL encoding/decoding utilities
│   ├── App.css            # Main application styles
│   ├── Form.css           # Form component styles
│   ├── ResultDisplay.css  # Result display styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── index.html             # HTML template with SEO meta tags
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🎯 How to Use

1. **Enter Serialized Data**
   - Paste your PHP serialized or JSON data into the textarea
   - Optionally add a title to identify the data
   - Click "Submit"

2. **Compare Multiple Data Sets**
   - Click "Add" to add another data set (up to 3 total)
   - Compare results side by side in a grid layout

3. **Share Comparisons**
   - Click "Share" to copy a shareable link
   - The link contains encoded data that can be shared with others
   - Recipients can open the link to see the same comparison

4. **Remove Entries**
   - Click the × button on any result card to remove it
   - Click "Clear All" to remove all entries

## 🔒 Privacy & Security

- **No Data Storage** - All data is processed in your browser
- **No Cookies** - No cookies are set or used
- **No Tracking** - No user tracking or analytics cookies
- **No Server Processing** - All unserialization happens client-side
- **URL-Based Sharing** - Data is encoded in the URL, not stored on servers

### PHP Unserialization Fails

- Ensure the data is valid PHP serialized format
- Check for any encoding issues
- Try copying the data again to avoid hidden characters

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for developers who need to unserialize and compare data quickly and securely.**
