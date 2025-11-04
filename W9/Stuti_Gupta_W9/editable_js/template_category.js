/**
 * CATEGORY VIEW
 * Group Data by Categories - Good for Understanding Relationships and Patterns
 */


function showCategories(data) {


  // Group by Cuisine
  const groups = data.reduce((acc, r) => {
    const key = r.cuisine || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  
  const html = Object.entries(groups)
    .map(([cuisine, items]) => {
      const count = items.length;
      const avgRating =
        items.reduce((s, it) => s + (Number(it.rating) || 0), 0) / (count || 1);
      const avgPrice =
        items.reduce((s, it) => s + (Number(it.price) || 0), 0) / (count || 1);


      const list = items
        .map(
          (it) => `
            <div class="category-item">
              <div class="left">
                <div class="item-name">${it.name}</div>
                <div class="item-sub">${it.neighborhood}</div>
              </div>
              <div class="right">
                <div class="item-meta">${it.rating ? it.rating + " ★" : "N/A"}</div>
                <div class="item-meta">${it.priceDisplay}</div>
              </div>
            </div>`
        )
        .join("");


      return `
  <section class="category-section">
    <h3 class="category-header">${cuisine} (${count})</h3>
    <div class="category-avg">
    Avg rating: ${avgRating.toFixed(1)} &nbsp;&nbsp; Avg price: $${Math.round(avgPrice).toLocaleString()}
  </div>
  ${list}
  </section>
`;
    })
    .join("");


  // TODO: Implement this Function
  // Requirements:
  // - Group Data by a Meaningful Category (Cuisine, Neighborhood, Price, etc.)
  // - Show Items within each Group
  // - Make Relationships between Groups Clear
  // - Consider showing Group Statistics


  /*HTML*/
  return `
    <h2 class="view-title">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzY5NTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10YWJsZS1jZWxscy1tZXJnZS1pY29uIGx1Y2lkZS10YWJsZS1jZWxscy1tZXJnZSI+PHBhdGggZD0iTTEyIDIxdi02Ii8+PHBhdGggZD0iTTEyIDlWMyIvPjxwYXRoIGQ9Ik0zIDE1aDE4Ii8+PHBhdGggZD0iTTMgOWgxOCIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48L3N2Zz4=" class="view-icon" alt="Category View Icon">
  Category View
</h2>
    <p class="view-description">Grouped by cuisine. Compare counts and group-level averages to spot concentrations and trends.</p>
    ${html}
  `;
}


export default showCategories;