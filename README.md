Here is a `README.md` for your GitHub repository that presents the information in a clear and visually appealing format, similar to the example you provided:

---

# LinkedIn Profile Scraper

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-brightgreen.svg)
![JXA](https://img.shields.io/badge/JXA-Automation-blue.svg)
![LinkedIn](https://img.shields.io/badge/LinkedIn-Scraper-orange.svg)

A **JavaScript for Automation (JXA)** script to scrape profile data from **LinkedIn** directly from the active tab of your browser. This tool can extract key information such as name, job title, and current company from a LinkedIn profile, streamlining the process of data collection.

## 🚀 Features

- **Multi-browser support**: Works with Google Chrome, Arc, and Safari.
- **Seamless integration**: Automatically detects the active browser and tab.
- **Profile data extraction**: Scrapes the name, headline, company, and job title from LinkedIn profiles.
- **Minimal setup**: No additional dependencies required.

## 📋 Prerequisites

- macOS (JavaScript for Automation is a Mac-only feature)
- LinkedIn account
- Supported browser: **Google Chrome**, **Arc**, or **Safari**

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/linkedin-profile-scraper.git
   cd linkedin-profile-scraper
   ```

2. **Run the script using JXA:**
   - Open the **Script Editor** on macOS.
   - Copy and paste the JavaScript code into the editor.
   - Click on the "Run" button.

## 🛠️ Usage

1. Open a LinkedIn profile in one of the supported browsers (**Google Chrome**, **Arc**, or **Safari**).
2. Run the JXA script in **Script Editor**.
3. The script will automatically detect the active browser tab and scrape the profile data if a LinkedIn profile is open.

## 📜 Example Output

```text
Name: John Doe
Title: Software Engineer at Tech Company
Company: Tech Company
Job Title: Senior Software Engineer
Profile URL: https://www.linkedin.com/in/johndoe/
```

## 🔍 How It Works

1. **Browser Detection**: The script loops through the list of supported browsers to check if they are running and have an active window.
2. **URL Verification**: It verifies if the active tab is a LinkedIn profile page (`linkedin.com/in/`).
3. **Data Scraping**: Runs JavaScript in the browser context to extract:
   - **Name** from the `.text-heading-xlarge` selector.
   - **Title** from the `.text-body-medium` selector.
   - **Experience Section**: Searches for the most recent job title and company by traversing the DOM structure.

## ⚠️ Limitations

- Works only on macOS with JXA.
- Requires the user to be logged into LinkedIn.
- May not work if LinkedIn changes its DOM structure or class names.

## 👥 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For more information or queries, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Feel free to replace placeholders like `yourusername`, `your-email@example.com`, and `LICENSE` with your actual details.
