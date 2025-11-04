/**
 * CARD VIEW
 * Display Data as Browsable Cards - Good for Comparing Individual Items
 * Groups: Name, Cuisine, Rating, Price, Location, Specialties, Contact
 */


function showCards(data) {
  const cards = data
    .map((r) => `
      <div class="restaurant-card">
        <h3 class="card-name">${r.name || "Unnamed Restaurant"}</h3>


      <p class="card-field"><strong>Cuisine:</strong> ${r.cuisine || "Other"}</p>
        <p class="card-field"><strong>Rating:</strong> ${r.rating ? r.rating + " ★" : "N/A"}</p>
        <p class="card-field"><strong>Price:</strong> ${r.priceDisplay || "N/A"}</p>
        <p class="card-field"><strong>Location:</strong> ${r.neighborhood || "Unknown"}</p>
        <p class="card-field"><strong>Specialties:</strong> ${r.specialties ? r.specialties.join(", ") : "Chef's choice"}</p>
        <p class="card-field"><strong>Contact:</strong> ${r.phone || "—"}</p>
      </div>
    `)
    .join("");


  /*HTML*/ 
  return `
    <h2 class="view-title">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzY5NTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS13YWxsZXQtY2FyZHMtaWNvbiBsdWNpZGUtd2FsbGV0LWNhcmRzIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PHBhdGggZD0iTTMgOWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDIiLz48cGF0aCBkPSJNMyAxMWgzYy44IDAgMS42LjMgMi4xLjlsMS4xLjljMS42IDEuNiA0LjEgMS42IDUuNyAwbDEuMS0uOWMuNS0uNSAxLjMtLjkgMi4xLS45SDIxIi8+PC9zdmc+" class="view-icon" alt="Card View Icon">
  Card View
</h2>
    <p class="view-description">
      Browse restaurants as cards — good for browsing, quick impressions, and visual comparison.
    </p>
    <div class="card-grid">${cards}</div>
  `;
}


export default showCards;