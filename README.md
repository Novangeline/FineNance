# FineNance
A financial management app build from ground up, slowly adding more features to it.
It's funny that the reason I started this project is because I don't know where my $800 went in 10 days.

# 🧾 Key Features

## ✅ Implemented
- [x] React project setup using `create-react-app`
- [x] Basic app structure using functional components
- [x] Add Spending Form with fields: date, name, cost, category
- [x] State management with `useState` to track spending
- [x] Form submission passes data to parent (`onAdd`)
- [x] Prettier setup for consistent formatting
- [x] Delete row from spending list  
- [x] Table displaying all added spending  
- [x] Dropdown to filter and view different months  
- [x] Show total spending for the selected month  
- [x] Setup `Supabase` for backend
- [x] Rename labels and text to reflect "Spending" instead of "Expense"  

## 🔧 TO-DO

### 🔹 Easy

### 🟡 Medium
- [ ] Upload spending data via CSV  
- [ ] Spending chart/graph visualization (e.g., Pie or Bar chart using `recharts` or `chart.js`)  
- [ ] Categorize and color-code rows by category

### 🔴 Advanced
- [ ] AI Chatbot to manage expenses using GitHub Copilot / OpenAI  
- [ ] Predictive budget suggestions based on monthly trends  
- [ ] Monthly spending report generator (PDF or export)  
- [ ] PWA support for offline use  

## ⚙️ Settings Features

### 🌗 Theme Toggle
- Switch between Light mode and Dark mode.

### 📊 Chart Type Preference
- Choose between:
  - 📈 Line Chart
  - 📊 Bar Chart

---

### 💡 Optional Future Ideas

#### 📅 Default View
- Select default landing page:
  - View All
  - View by Month
  - View by Year

#### 🔔 Spending Threshold Alerts
- Get notified when monthly spending exceeds a user-defined threshold.

#### 🗂 Category Customization
- Add, rename, or hide spending categories.

#### 🌍 Currency Preference
- Choose display currency (e.g. AUD, IDR, etc.)


## ✨ Optional Animations (Polish & Delight)

Add subtle and delightful transitions to elevate the UX of FineNance:

| Animation Idea              | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| 🎯 **Month Picker Fade/Slide**  | Animate the month picker dropdown with a fade-in or slide-down effect        |
| 🚀 **Table Row Transition**     | Animate new spendings sliding in or fading in when inserted                  |
| 🔄 **Tab Content Fade**        | Smooth transition between “View All” and “View by Month” tabs                |
| 💡 **Button Hover Glow**       | Soft glowing hover effect on action buttons (Add, Edit, Delete)              |
| 📆 **Bubble Bounce**           | Subtle bounce animation on the month bubble when toggled                     |
| ✨ **Toast Slide In**          | Slide-in success or error messages with auto-dismiss behavior                |
| 📊 **Chart Reveal**            | Fade or grow chart bars/pie slices when the chart loads                      |
| 🖍 **Editable Row Pulse**      | Light pulsing effect on a table row while in edit mode                       |
| 📦 **Add Spending Pop**        | Pop/scale effect on successful addition of a spending                        |
| 🎠 **Carousel Swipe Motion**   | Smooth left/right transition for monthly view carousel navigation            |

### Tools to Consider:
- [`framer-motion`](https://www.framer.com/motion/) – elegant animations for React/Next.js
- Tailwind CSS `transition`, `duration`, and `ease-*` utilities
- `react-transition-group` (optional, alternative)

> Implementing these is optional but highly recommended for premium UX polish.
