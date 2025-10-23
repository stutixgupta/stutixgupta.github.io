// =======================================================
// TUTORIAL 7: SAME DATA, DIFFERENT STORIES
// Information architecture through multiple presentations
// =======================================================



// escapeHtml
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Global variables to store data
let restaurants = [];
let currentView = 'card';

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 7: Multiple data presentations ready!');
    
    // Get UI elements
    const loadButton = document.querySelector('#load-data-button');
    const statusDisplay = document.querySelector('#loading-status');
    const dataSummary = document.querySelector('#data-summary');
    const viewControls = document.querySelector('#view-controls');
    const displayContainer = document.querySelector('#display-container');
    const tutorialInsights = document.querySelector('#tutorial-insights');
    
    // Get view buttons
    const cardViewBtn = document.querySelector('#card-view-btn');
    const tableViewBtn = document.querySelector('#table-view-btn');
    const statsViewBtn = document.querySelector('#stats-view-btn');
    


    // =================================
    // DATA LOADING (Building on Week 6)
    // =================================
    
    loadButton.addEventListener('click', async function() {
        // Step 1: Show loading state
        // Hint: Use the same loading pattern from Tutorial 6

        // MY CODE HERE:
        statusDisplay.classList.remove('success', 'error');
        statusDisplay.classList.add('loading');
        statusDisplay.querySelector('.status-message').textContent = 'Loading restaurant GeoJSON...';
        loadButton.disabled = true;
        loadButton.textContent = 'Loading...';
        
        
        try {
            // Step 2: Load the GeoJSON data
            // Hint: await fetch('restaurants.geojson') - note the .geojson extension
            // Hint: GeoJSON loads exactly like regular JSON

            // MY CODE HERE:
            const response = await fetch('restaurants.geojson');
            if (!response.ok) {
                throw new Error('Network response was not OK: ' + response.status);
            }
            

            // Step 3: Extract restaurant features from GeoJSON
            // Hint: const restaurantData = await response.json();
            // Hint: restaurants = restaurantData.features; (GeoJSON has a 'features' array)

            // MY CODE HERE:
            const restaurantData = await response.json();
            if (!restaurantData.features || !Array.isArray(restaurantData.features)) {
                throw new Error('GeoJSON does not contain features array');
            }
            restaurants = restaurantData.features;
            
            
            // Step 4: Show success and enable interface
            // Hint: Show data summary, enable view controls
            // Hint: Call showDataSummary() and showInitialView()
            
            // MY CODE HERE:
            statusDisplay.classList.remove('loading');
            statusDisplay.classList.add('success');
            statusDisplay.querySelector('.status-message').textContent = `Loaded ${restaurants.length} restaurant records`;
            showDataSummary();
            showInitialView();
            
            
        } catch (error) {
            // Step 5: Handle loading errors

            // MY CODE HERE:
            statusDisplay.classList.remove('loading');
            statusDisplay.classList.add('error');
            statusDisplay.querySelector('.status-message').textContent = 'Error loading data: ' + error.message;
            console.error('Load error:', error);
            loadButton.disabled = false;
            loadButton.textContent = 'Load Restaurant Data';
        }
    });
    


    // ===================================
    // VIEW SWITCHING (Building on Week 4)
    // ===================================
    
    // Card view button
    cardViewBtn.addEventListener('click', function() {
        // Step 6: Switch to card view
        // Hint: Call switchToView('card') and updateViewButtons
        
        // MY CODE HERE:
        updateViewButtons(cardViewBtn);
        switchToView('card'); 
    });
    

    // Table view button
    tableViewBtn.addEventListener('click', function() {
        // Step 7: Switch to table view

        // MY CODE HERE:
        updateViewButtons(tableViewBtn);
        switchToView('table');
    });
    

    // Stats view button
    statsViewBtn.addEventListener('click', function() {
        // Step 8: Switch to stats view

        // MY CODE HERE:
        updateViewButtons(statsViewBtn);
        switchToView('stats');
    });
    


    // ==================================
    // CARD VIEW - "Discover restaurants"
    // ==================================
    
    function showCardView() {
        const cardGrid = document.querySelector('#card-grid');
        cardGrid.innerHTML = '';
        
        // Step 9: Create cards for restaurant discovery
        // Hint: Use restaurants.forEach(function(restaurant) {})
        // Hint: Access restaurant data with restaurant.properties.name, etc.
        // Hint: Focus on: name, location, recent inspection status
        
        // MY CODE HERE:
        // Friendly Message
        if (!restaurants || restaurants.length === 0) {
            cardGrid.innerHTML = '<p>No restaurant data available. Please load the data first.</p>';
            return;
        }


        // Inspection Date
        const sorted = restaurants.slice().sort((a, b) => {
            const da = a.properties && a.properties.inspection_date ? new Date(a.properties.inspection_date) : new Date(0);
            const db = b.properties && b.properties.inspection_date ? new Date(b.properties.inspection_date) : new Date(0);
            return db - da;
        });


        // Limit Number
        const toShow = sorted.slice(0, 100);
        toShow.forEach(function(restaurant) {
            const p = restaurant.properties || {};
            const name = p.name || 'Unknown name';
            const city = p.city || 'Unknown city';
            const date = formatDate(p.inspection_date);
            const status = getComplianceStatus(restaurant); // 'compliant' | 'non-compliant' | 'other'
            const card = document.createElement('div');
            card.className = `restaurant-card ${status === 'compliant' ? 'compliant' : (status === 'non-compliant' ? 'non-compliant' : '')}`;


        // Inner HTML
        card.innerHTML = `
                <div class="card-name">${escapeHtml(name)}</div>
                <div class="card-location">${escapeHtml(city)}</div>
                <div class="card-status ${status === 'compliant' ? 'compliant' : (status === 'non-compliant' ? 'non-compliant' : 'other')}">
                    ${status === 'compliant' ? 'Compliant' : (status === 'non-compliant' ? 'Non-compliant' : 'Unknown')}
                </div>
                <div class="card-date">Last inspection: ${escapeHtml(date)}</div>
            `;
            cardGrid.appendChild(card);
        });

        console.log('Card view: Emphasizing restaurant discovery');
    }
    


    // =====================================
    // TABLE VIEW - "Compare safety records"
    // =====================================
    
    function showTableView() {
        const tableBody = document.querySelector('#inspection-table tbody');
        tableBody.innerHTML = '';
        
        // Step 10: Create table rows for comparison
        // Hint: Show first 50 restaurants to avoid performance issues
        // Hint: Focus on: name, city, inspection_date, inspection_results
        // Hint: Include specific compliance fields for comparison
        
        // MY CODE HERE:
        if (!restaurants || restaurants.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No data. Please load restaurants first.</td></tr>';
            return;
        }


        // Sort by Name
        const sortedByName = restaurants.slice().sort((a, b) => {
            const an = (a.properties && a.properties.name) ? a.properties.name.toLowerCase() : '';
            const bn = (b.properties && b.properties.name) ? b.properties.name.toLowerCase() : '';
            if (an < bn) return -1;
            if (an > bn) return 1;
            return 0;
        });

        const toShow = sortedByName.slice(0, 50);

        toShow.forEach(r => {
            const p = r.properties || {};
            const tr = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.className = 'table-restaurant-name';
            nameCell.textContent = p.name || 'Unknown';
            tr.appendChild(nameCell);

            const cityCell = document.createElement('td');
            cityCell.textContent = p.city || 'Unknown';
            tr.appendChild(cityCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = formatDate(p.inspection_date);
            tr.appendChild(dateCell);

            const resultCell = document.createElement('td');
            // Inspection Results
            const resultText = p.inspection_results || 'Unknown';
            const statusClass = resultText.toLowerCase().includes('non-compliant') ? 'non-compliant' : (resultText.toLowerCase().includes('in compliance') ? 'compliant' : 'other');
            resultCell.innerHTML = `<span class="table-status ${statusClass}">${escapeHtml(resultText)}</span>`;
            tr.appendChild(resultCell);

            // Specific Fields | Common Property Names
            const handWashingCell = document.createElement('td');
            handWashingCell.textContent = p.hand_washing || p.hand_wash || p['hand washing'] || '—';
            tr.appendChild(handWashingCell);

            const tempCell = document.createElement('td');
            tempCell.textContent = p.food_temperature || p['food temperature'] || p.temperature || '—';
            tr.appendChild(tempCell);

            tableBody.appendChild(tr);
        });
        
        console.log('Table view: Emphasizing safety record comparison');
    }
    


    // ===============================
    // STATS VIEW - "Analyze patterns"
    // ===============================
    
    function showStatsView() {
        // Step 11: Calculate aggregate statistics
        // Hint: Use array methods to calculate totals, percentages, patterns
        // Hint: Count compliance vs non-compliance
        // Hint: Group by city and calculate city-level stats
        
        // MY CODE HERE:
        const statsGrid = document.querySelector('#stats-grid');
        const cityStatsContainer = document.querySelector('#city-stats');
        statsGrid.innerHTML = '';
        cityStatsContainer.innerHTML = '';

        if (!restaurants || restaurants.length === 0) {
            statsGrid.innerHTML = '<p>No data to analyze. Load the GeoJSON file first.</p>';
            return;
        }

        const total = restaurants.length;
        const compliantCount = restaurants.filter(r => getComplianceStatus(r) === 'compliant').length;
        const nonCompliantCount = restaurants.filter(r => getComplianceStatus(r) === 'non-compliant').length;
        const otherCount = total - compliantCount - nonCompliantCount;
        const complianceRate = total > 0 ? Math.round((compliantCount / total) * 100) : 0;


        // Stat Cards
        const statCards = [
            { label: 'Total restaurants', value: total },
            { label: 'Compliant (%)', value: `${complianceRate}%` },
            { label: 'Non-compliant', value: nonCompliantCount },
            { label: 'Records w/o clear result', value: otherCount },
        ];

        statCards.forEach(s => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML = `
                <div class="stat-label">${escapeHtml(s.label)}</div>
                <div class="stat-number">${escapeHtml(String(s.value))}</div>
            `;
            statsGrid.appendChild(card);
        });


        // City Stats
        const cityMap = {};
        restaurants.forEach(r => {
            const city = (r.properties && r.properties.city) ? r.properties.city : 'Unknown';
            if (!cityMap[city]) cityMap[city] = { total: 0, compliant: 0 };
            cityMap[city].total += 1;
            if (getComplianceStatus(r) === 'compliant') cityMap[city].compliant += 1;
        });


        // Descending Order
        const cityArray = Object.entries(cityMap).map(([city, counts]) => {
            const rate = counts.total > 0 ? Math.round((counts.compliant / counts.total) * 100) : 0;
            return { city, total: counts.total, compliant: counts.compliant, rate };
        }).sort((a, b) => b.total - a.total);


        // Top 10 Cities
        const topCities = cityArray.slice(0, 10);
        topCities.forEach(c => {
            const row = document.createElement('div');
            row.className = 'city-stat';
            row.innerHTML = `
                <div class="city-name">${escapeHtml(c.city)}</div>
                <div class="city-compliance">${c.compliant}/${c.total} (${c.rate}%)</div>
            `;
            cityStatsContainer.appendChild(row);
        });
        
        console.log('Stats view: Emphasizing county-wide patterns');
    }
    


    // ================
    // HELPER FUNCTIONS
    // ================
    
    // Update UI to show data summary
    function showDataSummary() {
        // Step 12: Calculate and display summary statistics
        // Hint: Count total restaurants, compliance rate, unique cities
        
        // MY CODE HERE:
        if (!restaurants || restaurants.length === 0) return;

        const total = restaurants.length;
        const compliant = restaurants.filter(r => getComplianceStatus(r) === 'compliant').length;
        const complianceRate = total > 0 ? Math.round((compliant / total) * 100) : 0;

        const cities = new Set(restaurants.map(r => (r.properties && r.properties.city) ? r.properties.city : 'Unknown'));
        const cityCount = cities.size;

        document.querySelector('#record-count').textContent = total;
        document.querySelector('#compliance-rate').textContent = complianceRate + '%';
        document.querySelector('#city-count').textContent = cityCount;
        
        dataSummary.classList.remove('hidden');
    }
    

    // Switch between views
    function switchToView(viewName) {
    currentView = viewName;
    

    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    

    // Show selected view panel
    document.querySelector(`#${viewName}-view`).classList.add('active');
    

    // Replace the switch statement with lookup table
    const viewFunctions = {
        'card': showCardView,
        'table': showTableView,
        'stats': showStatsView,
        'default': () => console.error('Unknown view:', viewName)
    };
    
    const viewFunction = viewFunctions[viewName] || viewFunctions['default'];
    viewFunction();
}
    

    // Update view button states
    function updateViewButtons(activeButton) {
        document.querySelectorAll('.view-button').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
    

    // Show the interface after data loads
    function showInitialView() {
        viewControls.classList.remove('hidden');
        displayContainer.classList.remove('hidden');
        tutorialInsights.classList.remove('hidden');
        
        // Show card view by default
        switchToView('card');
    }
    

    // Helper: Determine compliance status
    function getComplianceStatus(restaurant) {
        const result = restaurant.properties.inspection_results;
        if (!result || result === '------') return 'other';
        return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
    }
    
    
    // Helper: Format date for display
    function formatDate(dateString) {
        if (!dateString || dateString === '------') return 'No date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    

    // Helper: Get compliance indicator
    function getComplianceIndicator(value) {
        if (!value || value === '------') return 'N/A';
        return value === 'In Compliance' ? '✓' : '✗';
    }
    
});



// ===================
// DEBUGGING FUNCTIONS
// ===================

// Show current data status
function checkTutorial7Status() {
    console.log('=== Tutorial 7 Status ===');
    console.log('Restaurants loaded:', restaurants.length);
    console.log('Current view:', currentView);
    
    if (restaurants.length > 0) {
        // Show sample restaurant data structure
        console.log('Sample restaurant:', restaurants[0].properties);
        
        // Show compliance breakdown
        const compliant = restaurants.filter(r => getComplianceStatus(r) === 'compliant').length;
        const nonCompliant = restaurants.filter(r => getComplianceStatus(r) === 'non-compliant').length;
        const other = restaurants.length - compliant - nonCompliant;
        
        console.log('Compliance breakdown:');
        console.log(`- Compliant: ${compliant}`);
        console.log(`- Non-compliant: ${nonCompliant}`);
        console.log(`- Other: ${other}`);
        
        // Show city distribution
        const cities = {};
        restaurants.forEach(r => {
            const city = r.properties.city;
            cities[city] = (cities[city] || 0) + 1;
        });
        
        console.log('Top cities:');
        Object.entries(cities)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .forEach(([city, count]) => console.log(`- ${city}: ${count}`));
    }
    console.log('========================');
}


// Manually load data for testing
async function manualLoadTutorial7() {
    try {
        const response = await fetch('restaurants.geojson');
        if (!response.ok) throw new Error('Load failed');
        const data = await response.json();
        restaurants = data.features;
        console.log(`Loaded ${restaurants.length} restaurants`);
        
        // Enable the interface
        document.querySelector('#view-controls').classList.remove('hidden');
        document.querySelector('#display-container').classList.remove('hidden');
        document.querySelector('#tutorial-insights').classList.remove('hidden');
        
        // Show initial view
        switchToView('card');
        return restaurants;
    } catch (error) {
        console.error('Manual load failed:', error);
    }
}


// Test all three views
function testAllViews() {
    if (restaurants.length === 0) {
        console.log('Load data first with manualLoadTutorial7()');
        return;
    }
    
    console.log('Testing all views...');
    
    // Test card view
    switchToView('card');
    setTimeout(() => {
        switchToView('table');
        setTimeout(() => {
            switchToView('stats');
            console.log('All views tested');
        }, 1000);
    }, 1000);
}


// Reset tutorial state
function resetTutorial7() {
    restaurants = [];
    currentView = 'card';
    
    // Reset UI
    document.querySelector('#view-controls').classList.add('hidden');
    document.querySelector('#display-container').classList.add('hidden');
    document.querySelector('#tutorial-insights').classList.add('hidden');
    document.querySelector('#data-summary').classList.add('hidden');
    
    // Reset status
    const statusDisplay = document.querySelector('#loading-status');
    statusDisplay.classList.remove('loading', 'success', 'error');
    statusDisplay.querySelector('.status-message').textContent = 'Ready to load restaurant inspection data';
    
    // Reset load button
    const loadButton = document.querySelector('#load-data-button');
    loadButton.textContent = 'Load Restaurant Data';
    loadButton.disabled = false;
    
    console.log('Tutorial 7 reset');
}


// Helper functions available globally
function getComplianceStatus(restaurant) {
    const result = restaurant.properties.inspection_results;
    if (!result || result === '------') return 'other';
    return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
}

function formatDate(dateString) {
    if (!dateString || dateString === '------') return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function getComplianceIndicator(value) {
    if (!value || value === '------') return 'N/A';
    return value === 'In Compliance' ? '✓' : '✗';
}


// Call these functions in the browser console:
// checkTutorial7Status() - see current state and data analysis
// manualLoadTutorial7() - load data without clicking button
// testAllViews() - automatically test all three views
// resetTutorial7() - reset everything for fresh start