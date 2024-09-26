# duckduckgo-assigment

A full-stack web application that serves as an API proxy for DuckDuckGo search results and provides a React-based frontend to interact with the API. Users can submit search queries, view paginated results, and access a history of past queries.
Also, the search terms are highlighted and the users can see the number of appearances of the term on the page.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Technical Overview](#technical-overview)

## Technologies Used
- **Backend**: Node.js, Express
- **Frontend**: React, Redux, Vite, SCSS, MUI
- **Storage**: JSON file (for query history persistence)
- **API**: DuckDuckGo API for search results

## Prerequisites
- Node.js (v18.16.0)
- NPM (v9.7.1)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/ariel7590/duckduckgo-assigment.git
    ```

2. Install dependencies:
    ```bash
    npm run install-all
    ```

## Running the Application

To run the application, type:

```bash
    npm start
  ```

## Technical Overview

### Backend
The backend is built with Node.js and Express. It acts as a proxy for DuckDuckGo's search API. There are two main API routes:
- `GET /api/search?q=<query>`: Fetches search results via a query parameter.
- `POST /api/search`: Fetches search results via the request body (JSON format).

All search queries are persisted in a JSON file (`queryHistory.json`).

### Frontend
The frontend is a React application built with Vite. It uses Redux for managing the state of search queries and results. Key features include:
- **Search Input**: Submit queries to the backend API.
- **Paginated Results**: Results are displayed with pagination controls.
- **Highlighting and Counting**: The search term is highlighted in the result titles, and the total appearances are displayed.
- **Search History**: A list of past queries is shown, allowing users to quickly repeat previous searches.

The UI is styled with SCSS, and all API calls are managed via Redux actions.


