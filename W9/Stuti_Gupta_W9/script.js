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


  // Create the Price-Range Buttons
  initPriceRangeButtons(data);
};


  // Show Initial View
    updateDisplay(showCards(data));
    updateButtonStates("cards");

    console.log("Application Ready!");
  } catch (error) {
    console.error("Application Failed to Start:", error);
    showError(error.message);
  }
});


// REFLECTION

// For this project, I chose the Restaurant Dataset API because it provides detailed information about restaurants, including their names, locations, ratings, prices, cuisines, and contact information. I thought it would be interesting to explore patterns in food options and pricing across different neighborhoods. Especially as a student, I can't think of anything except food these days, and the second thing that makes me happy is a good night’s sleep.

// The Card View emphasizes individual restaurants. Each card displays the main details, including name, cuisine, price, and rating. This view is ideal for those who want to browse and compare restaurants quickly. You can see individual restaurants’ information visually without being overwhelmed by numbers or tables.

// The Table View emphasizes organized data. All restaurants are shown in a structured table format with rows and columns. This view makes it easy to sort, scan, or compare specific details, such as ratings or prices, across many restaurants. It is more practical for finding exact numbers or making detailed comparisons.

// The Category View groups restaurants by cuisine type. It emphasizes relationships and patterns within the data, showing which types of food are more common, their average ratings, and prices. This view is helpful for spotting trends, such as which cuisine is most common or which types have higher ratings on average.

// The Statistics View highlights overall patterns and key insights. It displays the total number of restaurants, their average rating and price, the most common cuisine, and the price distribution. This view provides a quick overview of the dataset, helping to identify general trends that are harder to notice in other views, such as the number of restaurants falling under each price range.

// I believe the Statistics View is the most useful for this dataset because it provides a concise summary of the entire dataset at a glance. If someone wanted to make decisions quickly or understand patterns in pricing, ratings, and cuisine types, this view provides the essential information efficiently.

// One challenge I encountered was displaying the price distribution in a clear and interactive way. Initially, the data was presented vertically and was difficult to read. I solved it by creating buttons for each price range under the Statistics View, so users can click and immediately see how many restaurants fall into that range. This made the data more readable and interactive without overwhelming the user.