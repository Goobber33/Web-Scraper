# 🌐 Web Scraper with React Frontend

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![React](https://img.shields.io/static/v1?style=for-the-badge&message=React&color=61DAFB&logo=React&logoColor=FFFFFF&label=)
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![MongoDB](https://img.shields.io/static/v1?style=for-the-badge&message=MongoDB&color=47A248&logo=MongoDB&logoColor=FFFFFF&label=)

This project is a web scraper that fetches data from various websites and saves the extracted data to a MongoDB Atlas database. It also provides a user-friendly frontend built with React and TypeScript, allowing users to view and interact with the scraped data.

## ✨ Features

- Scrape data from multiple websites using Axios and Cheerio
- Save scraped data to MongoDB Atlas
- Rate limiting to control the number of concurrent requests
- Frontend built with React and TypeScript
- Responsive and user-friendly design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- Yarn (v1.x)
- MongoDB Atlas account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/goobber33/web-scraper.git
cd web-scraper-react
```

2. Install backend dependencies:

```bash
yarn install
```

3. Install frontend dependencies:

```bash
cd client
yarn install
```

4. Create a `.env` file in the root directory of the project and add your MongoDB Atlas connection string:

```bash
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_DATABASE_NAME=your_database_name
MONGODB_COLLECTION_NAME=your_collection_name
```

Replace the placeholders with your actual MongoDB Atlas credentials.

### Running the Application

1. Start the backend server:

```bash
yarn start
```

2. In a separate terminal, navigate to the `client` directory and start the frontend development server:

```bash
cd client
yarn start
```

The React app will now be running on `http://localhost:3000`.

## 💡 Real-world Applications
Web scraperS have various practical applications, such as:

- Market research: Collect data on competitors, pricing, product offerings, and customer reviews for better-informed business decisions.
- News aggregation: Collect and display the latest news articles or blog posts from multiple sources in a single place.
- Job boards: Scrape job listings from various websites to provide a comprehensive and up-to-date list of job opportunities for job seekers.
- Social media monitoring: Collect data from social media platforms to monitor brand mentions, customer sentiment, or trends.
- Price comparison: Gather price data from multiple online retailers to create price comparison websites.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

