# MessMate – Smart Hostel Mess Management & Food Waste Reduction Platform

> **Tagline:** "Eat smart. Waste less."

MessMate is a modern, responsive web application engineered for college hostel residents and mess management teams. It bridges advance attendance communication to eliminate avoidable kitchen preparation waste while elevating student dining satisfaction through transparent menus, real-time reviews, and sustainability intelligence.

---

## 🥗 Core Features

### 1. Daily Platter Dashboard (`/`)
- **4 Daily Meals:** Real-time schedule for Breakfast, Lunch, Evening Snacks, and Dinner.
- **Realistic Indian Mess Menus:** Authentic dishes such as Aloo Paratha with Curd, Rajma Chawal, Samosas, Hyderabadi Dum Biryani, Paneer Butter Masala, and Chole Bhature.
- **Campus Selector:** Switch between hostels (*Aryabhata Hall, Gargi Hall, Bhaskara Mega Mess, CV Raman*).
- **Live Headcount Estimator:** Real-time forecast of attending students vs. confirmed skips.
- **Filters:** Quick filter by meal type or *Pure Veg*.

### 2. Meal Skip Engine (Core Waste Reduction Feature)
- **Interactive Attendance Switch:** One-click toggle between *Attending* and *Skipping*.
- **Instant Headcount & Waste Update:** Immediately updates estimated kitchen batch requirements and avoids preparation of ~350g raw ingredients per skip.
- **Celebratory Feedback:** Confetti feedback and informative toast notifications.
- **Undo Anytime:** Switch back to *Attending* without friction if plans change.
- **Duplicate-Proof & Date-Scoped:** Independent tracking per date and meal type persisted in `LocalStorage`.

### 3. Food Waste Savings Tracker & Analytics (`/tracker`)
- **Transparent Estimation Model:** 1 confirmed skip notification = 1 potentially avoidable food portion (350g benchmark).
- **Interactive Slider:** Adjust the portion assumption (200g - 500g) with live recalculations across the platform.
- **Recharts Visualizations:**
  - *Daily Skips Stacked Bar Chart:* Breakdown by meal category over the last 7 days.
  - *Weekly Sustainability Trajectory:* Area chart of food kilograms and greenhouse emissions avoided.
  - *Meal Skip Donut Chart:* Analysis showing Dinner as the #1 skipped meal (38%).
- **Ecological Impact Metrics:** Quantifies avoided agricultural water consumption (L) and carbon footprint ($CO_2e$).
- **Dynamic Achievement System:**
  - 👣 *First Step* (1 skip)
  - 🛡️ *Waste Warrior* (10 skips)
  - 🌿 *Green Champion* (25 skips)
  - 🏆 *Planet Protector* (50 skips)
  - 👑 *Earth Guardian* (100 skips)
- **Hostel Leaderboard:** Friendly inter-hostel waste reduction rankings.

### 4. Student Meal Ratings & Reviews (`/ratings`)
- **5-Star Rating Control:** Overall experience score.
- **Detailed Sub-Criteria:** Food Quality, Taste & Spicing, Portion Size, Hygiene / Counter Presentation.
- **Community Review Stream:** Real-time hostel feedback feed with helpful likes and custom tags (*#Crispy & Fresh, #Soft Rotis, #Too Spicy*).
- **Duplicate Prevention:** Prevents rating spam by allowing seamless editing of existing ratings for the same meal.

### 5. 7-Day Weekly Menu Calendar (`/weekly`)
- **Full Monday – Sunday Schedule:** Browse weekly offerings.
- **Advance Pre-Skipping:** Plan weekend leaves or eating out in advance so mess staff can adjust grocery procurement.
- **7-Day Comparison Mode:** Compare all dinners or lunches side-by-side.

### 6. Profile & Dining Preferences (`/profile`)
- **Student ID:** Name, Roll Number, Room Allocation.
- **Dietary Categories:** Pure Veg, Non-Veg, Jain, Vegan, Eggetarian.
- **Portion Preferences:** Light (250g), Standard (350g), Hearty (450g).
- **Cutoff Reminders:** Notification preferences before kitchen preparation starts.
- **Export & Reset:** Export skip history as JSON; reset demo data with confirmation dialogs.

---

## 🎨 Visual Design System

Designed with inspiration from Swiggy, Notion, and Linear:
- **Background:** `#FAF9F6` (Alabaster Warm White)
- **Primary:** `#234D3B` (Deep Forest Green)
- **Accent:** `#E99A48` (Warm Spice Orange)
- **Secondary:** `#E9F0E9` (Soft Sage)
- **Text:** `#252D27` (Deep Charcoal)
- **Cards:** Crisp white with 16px border-radius, soft shadows (`shadow-soft`), and subtle borders.
- **Typography:** Inter with clear hierarchy and status badges.

---

## 🛠️ Tech Stack

- **React 18** (Vite build system)
- **JavaScript (ES6+)**
- **Tailwind CSS** (Custom extended palette and typography)
- **Lucide React** (Modern clean iconography)
- **React Router v6** (Client-side routing with responsive mobile tab navigation)
- **Recharts** (Interactive Area, Bar, and Pie analytics)
- **Canvas Confetti** (Eco-celebration effects)
- **LocalStorage Engine** (State persistence with custom event dispatching)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

