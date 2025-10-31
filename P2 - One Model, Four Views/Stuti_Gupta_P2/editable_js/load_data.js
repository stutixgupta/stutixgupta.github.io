// =======================
// DATA LOADING - Modified
// =======================


/**
 * Load Data from API - Prince George's County Open Data (Restaurants)
 */


/**
 * Choose Random Element
 */
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}


/**
 * Generate Fake Phone
 */
function fakePhone() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `(301) 555-${String(n).padStart(4, "0")}`;
}


/**
 * Generate Price Number
 */
function randomPrice(min = 30, max = 1500) {
  const val = Math.round((min + Math.random() * (max - min)) / 10) * 10;
  return val;
}


/**
 * Map an Inspection Score
 */
function scoreToRating(score) {
  if (!score && score !== 0) return (3 + Math.random() * 1.5).toFixed(1); // fallback
  const s = Number(score);
  const r = Math.max(1, Math.min(5, (s / 100) * 4 + 1)); // scale 0->1 to 100->5
  return (Math.round(r * 10) / 10).toFixed(1);
}


async function loadData() {
  try {


    // TODO: Replace with chosen API
    // Examples:
    // const response = await fetch('https://data.princegeorgescountymd.gov/resource/xxxx.json');
    // const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY');
    // const data = await response.json();


    const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$limit=60";
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("API response not OK");
    const raw = await response.json();


// Curated List of Cuisines and Specialties
    const CUISINES = [
      "American", "Italian", "Mexican", "Japanese", "Korean", "Chinese", "Indian",
      "Vietnamese", "Mediterranean", "Thai", "French", "Burger", "Pizza", "Seafood"
    ];


    const SPECIALTIES = {
      "American": ["Burgers", "Sandwiches", "Brunch"],
      "Italian": ["Pasta", "Pizza", "Risotto"],
      "Mexican": ["Tacos", "Burritos", "Quesadillas"],
      "Japanese": ["Sushi", "Ramen", "Tempura"],
      "Korean": ["BBQ", "Kimchi", "Bibimbap"],
      "Chinese": ["Dim Sum", "Noodles", "Stir-Fry"],
      "Indian": ["Curry", "Naan", "Biryani"],
      "Vietnamese": ["Pho", "Banh Mi", "Spring Rolls"],
      "Mediterranean": ["Meze", "Kebab", "Falafel"],
      "Thai": ["Pad Thai", "Curry", "Satay"],
      "French": ["Pastries", "Wine", "Cheese"],
      "Burger": ["Cheeseburger", "Fries", "Shakes"],
      "Pizza": ["Wood-Fired Pizza", "Neapolitan", "Calzones"],
      "Seafood": ["Oysters", "Grilled Fish", "Lobster"]
    };


    // Transform and Enrich
    const cleaned = raw
      .map((item) => {


        // API Mapping
        const name = item.name || item.business_name || "Unnamed Restaurant";
        const city = item.city || item.town || "Unknown";
        const address = item.address_line_1 || item.address || "";
        const zip = item.zip || item.postal_code || "";
        const neighborhood = [address, city, zip].filter(Boolean).join(", ") || "Unknown";


        // Choose Cuisine
        const cuisine = item.category || item.type || sample(CUISINES);


        // Rating
        const inspection_score = item.inspection_score ? Number(item.inspection_score) : null;
        const rating = Number(scoreToRating(inspection_score));


        // Price
        const price = randomPrice(30, 1500);


        // Specialties
        const specs = SPECIALTIES[cuisine] ? sample(SPECIALTIES[cuisine]) : "Chef's Choice";


        // Phone
        const phone = item.phone || item.telephone || fakePhone();


        return {
          original: item,
          name,
          cuisine,
          rating,
          price,
          priceDisplay: `$${price.toLocaleString()}`,
          neighborhood,
          specialties: Array.isArray(item.specialties) && item.specialties.length ? item.specialties : [specs],
          phone,
          inspection_score: inspection_score || null,
          inspection_date: item.inspection_date || item.date || null
        };
      })


      .filter((r) => r.name)
      .slice(0, 42);


    console.log("Loaded and Enriched", cleaned.length, "Records");
    return cleaned;
    

    // Simulate API Delay
    // Await New Promise ((resolve) => setTimeout(resolve, 1000));
    // return mockRestaurantData;


  } catch (err) {
    console.error("Load Data Error:", err);
    throw new Error("Could not load Data from API");
  }
}
export default loadData;