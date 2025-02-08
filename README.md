# *nyoom* Travel Site

![nyoom](./public/images/nyoom_banner.png)

***Revolutionize Your Travel Experience***

Plan your journeys effortlessly with our all-in-one travel companion! Our platform allows you to track real-time public bus arrival timings, find the shortest and fastest routes to your destination, and stay on top of MRT schedules. With our advanced route optimization algorithm, we combine bus, MRT, and walking options to provide you with the quickest and most efficient way to get where you need to go. Plus, save your favorite routes for easy access and a stress-free commute every time. Whether you're navigating the city for work or play, we’ll make sure you get there faster and smarter.



## 💡 Features

### 🔎 Bus Arrival Times
- Enter a bus stop or bus number to search.
- We can also help you find bus stops near your you.
- Get real-time updates on when the next bus will arrive.
- Set bookmarks to easily access bus times.
### 🗺️ Travel Routes
- Enter a bus stop or MRT station to search.
- Click "Find Routes" to find the shortest route and time taken to your destination.
- Our algorithm is able to navigate through bus stops, MRT stations and calculate walking distance.
- Set bookmarks to easily access your route information.
- Compare with other routes to find the most optimal way to travel.
### 📢 Announcements
- Get live announcements on MRT breakdowns & delays.
- Stay informed on other updates to the site.
### ⚙️ Miscellaneous
- Light and Dark mode support.
- Account-based data saving.



## 📦 Installation & Setup

Install **Node.js** and **npm** [here](https://nodejs.org/en).

```bash
# Clone the repository
git clone https://github.com/bmyj0176/CSADProject.git

# Navigate into the project directory
cd CSADProject

# Install dependencies
npm install <package>
```

Create a `.env` file in the root directory:
```plaintext
REACT_APP_BACKEND_API_URL=http://localhost:5000
LTA_API_KEY=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```
- You can change the backend API URL but you have to expose port 5000 or manually reconfigure to other ports.
- Request an API key from LTA [here](https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html). 
- Setup a Web App on [Firebase Console](https://console.firebase.google.com) and insert your credentials.



## 🛠️ Usage

To run the development server:
```bash
npm start
```
The app will be available at `http://localhost:3000/`.



## 🏗️ Project Structure

```
CSADProject/
│── public/               
│   ├── datasets/          # Static Data & JSON
│   ├── images/            # Source Images & Icons
│   ├── stylesheets/       # Main CSS for Light/Dark Themes
│── server/
│   ├── server.js          # Main Entry Point for Backend Functionalities
│── src/
│   ├── pages/             # React Components & Pages
│   │   ├── Components/    # Reusable Components
│   │   ├── stylesheets/   # CSS Stylesheets
│   ├── utils/             # Helper Functions & Non-Component JS Code
│   ├── index.js           # Main App component
│── package.json           # Dependencies and scripts
```



## 📨 Get in Touch

Report bugs or request features here: [sdmgo15@gmail.com](mailto:sdmgo15@gmail.com)



## ⭐ Credits & Acknowledgements

**Main Contributors:**

- Shaun (Main UI Designer)
- Bryan (Bus Arrival Times Functionality & Authorisation)
- Aqil (UI, Announcements & Database)
- Caleb (Travel Routes Functionality)

**Other Acknowledgements:**

- [LTA DataMall API](https://datamall.lta.gov.sg/content/datamall/en.html)
- [ourhound](https://ourhound.com/transportations-tips-travelling-around-Singapore) (Icons & Images) 
- [cheeaun/sgraildata](https://github.com/cheeaun/sgraildata) (Datasets Used)



---


