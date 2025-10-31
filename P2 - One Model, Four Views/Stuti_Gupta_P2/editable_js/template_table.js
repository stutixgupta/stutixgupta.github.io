/**
 * TABLE VIEW
 * Display Data in Sortable Rows - Good for Scanning Specific Information
 * Columns: Name, Cuisine, Rating, Price, Location, Specialties, Contact
 */


function showTable(data) {


  // Rows
  const rows = data
    .map(
      (r, idx) => `
      <tr data-index="${idx}">
        <td class="cell-name">${r.name}</td>
        <td class="cell-cuisine">${r.cuisine}</td>
        <td class="cell-rating" data-value="${r.rating}">${r.rating ? r.rating : "N/A"}</td>
        <td class="cell-price" data-value="${r.price}">${r.priceDisplay}</td>
        <td class="cell-neighborhood">${r.neighborhood}</td>
        <td class="cell-specialties">${r.specialties ? r.specialties.join(", ") : "N/A"}</td>
        <td class="cell-phone">${r.phone}</td>
      </tr>`
    )
    .join("");


// TODO: Implement this Function
// Requirements:
// - Show data in a table format
// - Include all important fields
// - Make it easy to scan tand compare
// - Consider adding sorting functionality


  /*HTML*/ 
  return `
    <h2 class="view-title">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzY5NTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10YWJsZS1pY29uIGx1Y2lkZS10YWJsZSI+PHBhdGggZD0iTTEyIDN2MTgiLz48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PHBhdGggZD0iTTMgOWgxOCIvPjxwYXRoIGQ9Ik0zIDE1aDE4Ii8+PC9zdmc+" class="view-icon" alt="Table Icon">
  Table View
</h2>
    <p class="view-description">Scan and sort restaurant details. Click on column headers to sort.</p>

    
    <table class="restaurant-table" id="restaurant-table">
      <thead>
        <tr>
          <th data-key="name">Name</th>
          <th data-key="cuisine">Cuisine</th>
          <th data-key="rating">Rating</th>
          <th data-key="price">Price</th>
          <th data-key="neighborhood">Neighborhood</th>
          <th data-key="specialties">Specialties</th>
          <th data-key="phone">Phone</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>


    <script>
      // Sorting Script
      (function() {
        const table = document.getElementById("restaurant-table");
        if (!table) return;
        const tbody = table.querySelector("tbody");
        const getRows = () => Array.from(tbody.querySelectorAll("tr"));


        function sortBy(key, numeric = false, asc = true) {
          const rows = getRows();
          rows.sort((a, b) => {
            const aCell = a.querySelector('.cell-' + key);
            const bCell = b.querySelector('.cell-' + key);
            let aVal = aCell ? (numeric ? Number(aCell.dataset.value || aCell.textContent.trim()) : aCell.textContent.trim().toLowerCase()) : "";
            let bVal = bCell ? (numeric ? Number(bCell.dataset.value || bCell.textContent.trim()) : bCell.textContent.trim().toLowerCase()) : "";
            if (aVal < bVal) return asc ? -1 : 1;
            if (aVal > bVal) return asc ? 1 : -1;
            return 0;
          });
          // Sorted Rows
          rows.forEach(r => tbody.appendChild(r));
        }


        // Click Handlers to Headers
        table.querySelectorAll("th[data-key]").forEach(th => {
          let asc = true;
          th.style.cursor = "pointer";
          th.addEventListener("click", () => {
            const key = th.dataset.key;
            const numeric = key === "rating" || key === "price";
            sortBy(key, numeric, asc);
            asc = !asc;
          });
        });
      })();
    </script>
  `;
}


export default showTable;