# Real-Time Cryptocurrency Dashboard with Routing and Overview Feature

## Objective:
The goal of this project is to develop a responsive web application that displays real-time and historical data for selected cryptocurrencies using React, Redux, and Chart.js. The app includes multiple routes for easier navigation, featuring a cryptocurrency dashboard, an overview page, and a history page.

## Assignment Deliverables:

### Functional Requirements:

#### 1. Dashboard Layout:
- **Header:**
  - Title of the application.
  - Dropdown menu to select a cryptocurrency (e.g., Bitcoin, Ethereum).
  - Navigation menu with links to:
    - Dashboard
    - Overview
    - History

- **Main Routes:**
  - **Dashboard Route:**
    - **Current Price Display:** Show the current price of the selected cryptocurrency.
    - Display the percentage change over the last 24 hours.
    - **Historical Data Chart:** Line chart using Chart.js to visualize the price trend over the past 7 days.

  - **Overview Route:**
    - Display key details about the selected cryptocurrency, such as:
      - Market Cap
      - Total Supply
      - Circulating Supply
      - All-time High price
      - Rank
    - Include a brief description of the cryptocurrency's purpose and usage.

  - **History Route:**
    - Table showing historical price data (price, date, and 24-hour volume).
    - Include a search or filter option to refine the data.

- **Footer:**
  - Display the last updated time.

### Routing Setup:
Use **React Router** to define the following routes:
1. `/dashboard`: Default route displaying the main cryptocurrency dashboard.
2. `/overview`: Displays detailed information about the selected cryptocurrency.
3. `/history`: Displays historical data in a tabular format.

### State Management:
Use **Redux** to manage:
1. **Selected Cryptocurrency:** Current selection made via dropdown.
2. **Price Data:** Current price and percentage change.
3. **Historical Data:** 7-day price history.
4. **Overview Data:** Market cap, supply details, rank, and description.

### Data Fetching:
1. **Current Price:**
   - Fetch the current price and 24-hour percentage change using the **CoinGecko API**.
2. **Historical Data:**
   - Retrieve the past 7 days of price history for the selected cryptocurrency.
3. **Overview Data:**
   - Fetch detailed information like market cap, supply details, rank, and a brief description.
4. **Optional Real-Time Updates:**
   - Use **WebSocket** integration to receive live price updates.

### Features and Functionality:

#### Routes and Navigation:
1. **Dashboard:**
   - Displays live data and a historical chart.
   - Dropdown to select a cryptocurrency.

2. **Overview:**
   - Shows details and a description of the selected cryptocurrency.

3. **History:**
   - Displays a tabular view of historical data with filtering/search options.

#### User Interactions:
1. **Dropdown Selection:** Dynamically updates the dashboard and other views.
2. **Navigation:** Smooth navigation between routes using React Router.

### Styling and Design:
1. Responsive design for both desktop and mobile.
2. Used a **TailwindCSS**
3. Smooth transitions between routes.



### Clone this repository:
To get started with this project, clone the repository:

```bash
git clone https://github.com/gauravydav/CryptoDashboard.git
cd CryptoDashboard
 ```

 1:Install dependecies 

  ```bash
  npm install
  ```


  2:Start the development server.
   ```bash
   npm start
   ```

## Thankyou


