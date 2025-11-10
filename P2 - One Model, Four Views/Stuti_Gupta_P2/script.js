// Import Functions
import showCards from './editable_js/template_cards.js';
import showCategories from './editable_js/template_category.js';
import showStats from './editable_js/template_stats.js';
import showTable from './editable_js/template_table.js';
import loadData from './editable_js/load_data.js';


// =============================
// DISPLAY MANAGEMENT - PROVIDED
// =============================

/**
 * Update the Display with new Content
 */
function updateDisplay(content) {
  document.getElementById("data-display").innerHTML = content;
}


/**
 * Update Button States
 */
function updateButtonStates(activeView) {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(`btn-${activeView}`).classList.add("active");
}


/**
 * Show Loading State
 */
function showLoading() {
  updateDisplay('<div class="loading">Loading data from API...</div>');
}


/**
 * Show Error State
 */
 /*HTML*/ 
function showError(message) {
  updateDisplay(`
                <div class="error">
                    <h3>Error Loading Data</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `);
}


// ================================
// Helper: Create and Init Range UI
// ================================

function initPriceRangeButtons(data) {


  // Remove any Previous Range UI
  const existing = document.getElementById("price-range-wrapper");
  if (existing) existing.remove();


  // Price Ranges
  const ranges = [
    { label: "< $100", min: 0, max: 99 },
    { label: "$100 - $299", min: 100, max: 299 },
    { label: "$300 - $599", min: 300, max: 599 },
    { label: "$600 - $999", min: 600, max: 999 },
    { label: "$1,000 >", min: 1000, max: Infinity }
  ];


  // Create Wrapper HTML
  const html = `
    <div id="price-range-wrapper" class="range-block">
      <div class="range-selector" aria-label="Price range selector">
        ${ranges.map((r, i) => `<button class="view-button range-button" data-idx="${i}">${r.label}</button>`).join("")}
      </div>
      <div id="price-range-result" class="range-result" aria-live="polite">
        <p class="range-count">Choose a price range to see results.</p>
        <ul class="range-list" style="display:none;"></ul>
      </div>
    </div>
  `;


  // Append to Data-Display
  const container = document.getElementById("data-display");
  if (!container) return;
  container.insertAdjacentHTML("beforeend", html);


  // Attach Click Handlers
  const buttons = container.querySelectorAll(".range-button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
btn.classList.add("active");
      const idx = Number(btn.dataset.idx);
      const range = ranges[idx];


      // Filter Data using Numeric Price
      const matched = data.filter((r) => {
        const p = Number(r.price);
        if (isNaN(p)) return false;
        return p >= range.min && p <= range.max;
      });


      // Update UI
      const result = document.getElementById("price-range-result");
      const countEl = result.querySelector(".range-count");
      const listEl = result.querySelector(".range-list");

      countEl.textContent = `Number of Restaurants: ${matched.length}`;
      if (matched.length === 0) {
        listEl.style.display = "none";
        listEl.innerHTML = "";
      } else {
        const names = matched.slice(0, 10).map((m) => `<li>${m.name}</li>`).join("");
        listEl.innerHTML = names;
        listEl.style.display = "block";
      }
    });
  });
}


// =====================================
// APPLICATION INITIALIZATION - PROVIDED
// =====================================

/**
 * Main Application Function - Handles Data Loading and Button Setup
 * This Pattern always Works - No Timing Issues!
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Starting application...");


  try {
    // Load Data Once
    showLoading();
    const data = await loadData();
    console.log(`Loaded ${data.length} items from API`);


    // Set up Button Event Handlers - This Pattern always Works!
    document.getElementById("btn-cards").onclick = () => {
      updateDisplay(showCards(data));
      updateButtonStates("cards");
    };

    document.getElementById("btn-table").onclick = () => {
      updateDisplay(showTable(data));
      updateButtonStates("table");
    };

    document.getElementById("btn-categories").onclick = () => {
      updateDisplay(showCategories(data));
      updateButtonStates("categories");
    };

    document.getElementById("btn-stats").onclick = () => {
  updateDisplay(showStats(data));
  updateButtonStates("stats");
  initPriceRangeButtons(data); // Create the Price-Range Buttons
};


  // Show Initial View
    updateDisplay(showCards(data));
    updateButtonStates("cards");

    console.log("Application Ready!");
  } catch (error) {
    console.error("Application Failed to Start:", error);
    showError(error.message);
  }


  // Main Title Hover
  const title = document.getElementById("site-title");
  const colors = [
  getComputedStyle(document.documentElement).getPropertyValue("--primary-color").trim(),
  getComputedStyle(document.documentElement).getPropertyValue("--secondary-color").trim(),
  "#dc6955"
];
let colorIndex = 0;

if (title) {
  title.addEventListener("mouseenter", () => {
    title.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length; // Color Cycle
  });

  title.addEventListener("mouseleave", () => {
    title.style.color = "white"; // Return to White
  });
}
});


// REFLECTION

// For this project, I used the Restaurant Dataset API because it has tons of info about restaurant names, locations, ratings, prices, cuisines, and even contact information. I thought it would be fun to explore patterns in food and pricing across neighborhoods. Especially as a student, I can't think of anything except food these days, and the second thing that makes me happy is a good night’s sleep.

// The Card View shows each restaurant on its own card. You get the basics - name, cuisine, price, rating, all in one place. It’s super easy to scroll through and just see what’s out there without feeling lost in numbers. Perfect for when you just want a quick look at a bunch of restaurants.

// The Table View puts everything in neat rows and columns. You can see ratings, prices, and other details side by side. It’s great if you want to find something specific or compare a bunch of restaurants at once. A bit more data-heavy, but useful if you like seeing all the numbers laid out.

// The Category View groups restaurants by cuisine. You can see which foods are most common, their average ratings, and prices. It’s really helpful for spotting trends, like which cuisines are popular or more expensive, without having to check each restaurant one by one.

// The Statistics View is all about the big picture. It shows the total number of restaurants, average rating and price, the most common cuisine, and how prices are spread out. Honestly, this view makes it super easy to get a quick sense of the overall patterns without getting lost in the details.

// At first, showing the price ranges was a bit tricky because the data was vertical and kind of hard to read. I fixed it by adding clickable buttons for each price range, so you can instantly see how many restaurants fall into each one. It makes the info way easier to follow and way more interactive.

// I think Statistics View is the most useful for the dataset because it gives a simple summary of everything at a glance. If someone just wanted to get the main ideas, like which cuisines are popular, which restaurants are expensive, average ratings, overall trends and patterns, this view shows it all without having to dig through every single restaurant.