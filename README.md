# 🌐 Web Scraper with React Frontend

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

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
