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
    "$100-299": prices.filter((p) => p >= 100 && p < 300).length,
    "$300-599": prices.filter((p) => p >= 300 && p < 600).length,
    "$600-999": prices.filter((p) => p >= 600 && p < 1000).length,
    "$1,000+": prices.filter((p) => p >= 1000).length
  };


  // Bucket Bar Width - Helper
  const maxBucket = Math.max(...Object.values(buckets), 1);


  /*HTML*/
  // Build stat cards
  return `
    <h2 class="view-title">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzY5NTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1jb2x1bW4tYmlnLWljb24gbHVjaWRlLWNoYXJ0LWNvbHVtbi1iaWciPjxwYXRoIGQ9Ik0zIDN2MTZhMiAyIDAgMCAwIDIgMmgxNiIvPjxyZWN0IHg9IjE1IiB5PSI1IiB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgcng9IjEiLz48cmVjdCB4PSI3IiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI5IiByeD0iMSIvPjwvc3ZnPg==" class="view-icon" alt="Statistics Icon">
  Statistics View
</h2>
    <p class="view-description">A snapshot of the dataset — totals, averages, top items, and a price distribution.</p>


    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${total}</div>
        <div class="stat-label">Total Restaurants</div>
      </div>


      <div class="stat-card">
        <div class="stat-number">${avgRating.toFixed(2)}</div>
        <div class="stat-label">Average Rating</div>
      </div>


      <div class="stat-card">
        <div class="stat-number">$${Math.round(avgPrice).toLocaleString()}</div>
        <div class="stat-label">Average Price</div>
      </div>


      <div class="stat-card">
        <div class="stat-number">${maxItem ? maxItem.name : "N/A"}</div>
        <div class="stat-label">Highest Price (${maxPrice ? "$" + maxPrice.toLocaleString() : "N/A"})</div>
      </div>


      <div class="stat-card">
        <div class="stat-number">${mostCommonCuisine}</div>
        <div class="stat-label">Most Common Cuisine</div>
      </div>
    </div>


    <section>
      <h4 class="price-distribution-title">Price Distribution</h4>
    </section>
  `;
}


export default showStats;