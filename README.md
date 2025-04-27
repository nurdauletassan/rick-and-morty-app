# 🛸 Rick and Morty App

A web application that allows users to search and view information about characters, episodes, and locations from the **Rick and Morty** animated series.

## 📖 Project Description

The application is built using the public [Rick and Morty API](https://rickandmortyapi.com/documentation).  
Users can:
- Search for characters by name
- View character cards with an image, name, status, species, and current location
- Navigate through pages of characters using pagination
- See smooth loading skeletons while data is loading
- Switch to the dark/light theme
  
## 🛠️ Tech Stack

- **React** — JavaScript library for building user interfaces
- **Axios** — HTTP client for making API requests
- **CSS** — for styling without using CSS frameworks
- **Rick and Morty API** — data source for characters, episodes, and locations

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nurdauletassan/rick-and-morty-app.git
   cd rick-and-morty-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```
s

## 📐 Design and Development Process

- Started with setting up the basic React application structure
- Implemented a search and pagination component
- Connected to the API using Axios and handled loading states
- Added **SkeletonCard** components to display loading skeletons while waiting for data
- Created a clean, responsive card layout displaying character images, names, status, species, and current location

## 💡 Unique Approaches and Solutions

- **Skeleton Loaders** are used during data loading to improve user experience
- Used **plain CSS** for full control over styling, without relying on frameworks

## ⚖️ Trade-offs
- Currently implemented search by name and pagination, without filters for status, species, and gender

## 🐞 Known Issues
- When searching for characters with no results, an error message is displayed, but similar names are not suggested

## 📊 Why This Tech Stack?

- **React** — a popular, flexible, and convenient tool for building single-page applications
- **Axios** — a simple and understandable client for working with APIs
- **Rick and Morty API** — open and free, perfectly suited for a pet project with JSON structure
- Plain **CSS** — for practice without ready-made style libraries and custom design

## 🎥 Demo Video



## 📌 Future Enhancements

- Add filtering characters by status, species, and gender
- Integrate AI API for generating character descriptions
- Implement component testing
```
