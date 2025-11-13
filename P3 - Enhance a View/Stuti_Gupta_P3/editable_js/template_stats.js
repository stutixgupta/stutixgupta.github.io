/**
 * STATS VIEW
 * Show Aggregate Statistics and Insights - Good for Understanding the Big Picture
 */


function showStats(data) {
  const total = data.length;


  // TODO: Implement this Function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data


  // Ratings
  const ratings = data.map((d) => Number(d.rating) || 0);
  const avgRating =
    ratings.reduce((s, v) => s + v, 0) / (ratings.filter((r) => r > 0).length || 1);


  // Prices
  const prices = data.map((d) => Number(d.price) || 0).filter((p) => p > 0);
  const avgPrice = prices.reduce((s, v) => s + v, 0) / (prices.length || 1);
  const maxPrice = Math.max(...prices);
  const maxItem = data.find((d) => Number(d.price) === maxPrice);


  // Most Common Cuisine
  const cuisineCounts = data.reduce((acc, r) => {
    acc[r.cuisine] = (acc[r.cuisine] || 0) + 1;
    return acc;
  }, {});
  const sortedCuisines = Object.entries(cuisineCounts).sort((a, b) => b[1] - a[1]);
  const mostCommonCuisine = sortedCuisines.length ? sortedCuisines[0][0] : "N/A";


  // Price Distribution
  const buckets = {
    "<$100": prices.filter((p) => p < 100).length,
    "$100–299": prices.filter((p) => p >= 100 && p < 300).length,
    "$300–599": prices.filter((p) => p >= 300 && p < 600).length,
    "$600–999": prices.filter((p) => p >= 600 && p < 1000).length,
    "$1,000+": prices.filter((p) => p >= 1000).length,
  };


  /* HTML */
  return `
    <h2 class="view-title">
      <img src="data:image/svg+xml;base64,PHN2ZyB..." class="view-icon" alt="Statistics Icon">
      Statistics View
    </h2>

    <p class="view-description">
      Explore insights visually — interactive charts and summary statistics derived from real restaurant data.
    </p>

    <div class="stats-grid">
      <div class="stat-card"><div class="stat-number">${total}</div><div class="stat-label">Total Restaurants</div></div>
      <div class="stat-card"><div class="stat-number">${avgRating.toFixed(2)}</div><div class="stat-label">Average Rating</div></div>
      <div class="stat-card"><div class="stat-number">$${Math.round(avgPrice).toLocaleString()}</div><div class="stat-label">Average Price</div></div>
      <div class="stat-card"><div class="stat-number">${maxItem ? maxItem.name : "N/A"}</div><div class="stat-label">Highest Price (${maxPrice ? "$" + maxPrice.toLocaleString() : "N/A"})</div></div>
      <div class="stat-card"><div class="stat-number">${mostCommonCuisine}</div><div class="stat-label">Most Common Cuisine</div></div>
    </div>

    <section class="chart-section">
  <h3 class="chart-title">Cuisine Distribution</h3>
  <div class="chart-wrapper">
    <ul id="leftLabels" class="chart-labels left"></ul>
    <canvas id="cuisineChart"></canvas>
    <ul id="rightLabels" class="chart-labels right"></ul>
  </div>

  <h3 class="chart-title" style="margin-top: 2em;">Price Range Distribution</h3>
  <canvas id="priceChart"></canvas>
</section>
  `;
}

export default showStats;