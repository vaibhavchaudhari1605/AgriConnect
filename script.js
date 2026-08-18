/* Global helper to set nav active link */

// Function to change language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-' + lang + ']');
    elements.forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// Existing DOMContentLoaded code unchanged above this point...

// Add fertilizers and pesticides data for AI bot recommendations
const fertilizers = [
    { name: "Urea", price: "450", image: "urea.png", desc: "High nitrogen fertilizer for heavy feeders." },
    { name: "Ammonium Sulphate", price: "520", image: "ammoniumsulphate.jpg", desc: "Balanced sulphur source." },
    { name: "NPK 24-24-0", price: "600", image: "npk.webp", desc: "Complete NPK blend for balanced nutrition." },
    { name: "Super Phosphate", price: "480", image: "superphosphate.png", desc: "Good phosphorus source for root development." },
    { name: "Potash", price: "550", image: "potash.avif", desc: "Potassium source for fruit quality and stress tolerance." },
    { name: "Zinc Sulphate", price: "490", image: "zinc-sulphate.jpeg", desc: "Micronutrient supplement for deficiency correction." },
    { name: "Borax", price: "510", image: "borax.jpg", desc: "Boron source for flowering and fruit set." },
    { name: "Calcium Nitrate", price: "590", image: "calciumnitrate.jpg", desc: "Calcium and nitrogen for quality growth." },
    { name: "Bio Fertilizer", price: "400", image: "biofertilizer.jpg", desc: "Eco-friendly biofertilizer to improve soil microbes." },
    { name: "Organic Compost", price: "350", image: "orgcompost.jpg", desc: "Rich organic compost to improve soil structure." },
    { name: "Neem Cake", price: "300", image: "neemcake.webp", desc: "Natural pest deterrent and fertilizer." },
    { name: "Gypsum", price: "420", image: "gypsum.jpg", desc: "Improves soil structure and reduces sodium." }
];

const pesticides = [
    { name: "Coragen Insecticide", price: "129", image: "Coragen Insectiside.webp", desc: "Chlorantraniliprole 18.5% SC by FMC." },
    { name: "EBS Ventricillium Lecanii", price: "540", image: "EBS Ventricillium.webp", desc: "Verticillium Lecanii 2.0% AS." },
    { name: "EM-1 Insecticide", price: "215", image: "EM-1 Insecticide.webp", desc: "(Emamectin Benzoate 5% SG) for Caterpillars other pests." },
    { name: "Confidor Insecticide", price: "427", image: "Confidor Insecticide.webp", desc: "Imidacloprid 17.8% SL." },
    { name: "Amistar Top Fungicide", price: "565", image: "Amistar Top Fungicide.webp", desc: "Azoxystrobin 18.2% + Difenoconazole 11.4% w/w SC." },
    { name: "Solomon Insecticide", price: "330", image: "Solomon Insecticide.webp", desc: "(Beta-Cyfluthrin 8.49% + Imidacloprid 19.81% OD) - Broad Spectrum Insecticide." },
    { name: "Rogor Insecticide", price: "119", image: "Rogor Insecticide.webp", desc: "Dimethoate 30% EC for pests, aphids, thrips, mites and scale insects." },
    { name: "Dhanpreet Insecticide", price: "143", image: "Dhanpreet Insecticide.jpg", desc: "Control Aphids, Whiteflies, Thrips & Jassids." },
    { name: "Fame Insecticide", price: "229", image: "Fame Insecticide.webp", desc: "Flubendiamide 480SC for Lepidoptera Pest Control." },
    { name: "Alanto Insecticide", price: "437", image: "Alanto Insecticide.webp", desc: "-Thiacloprid 21.70% SC for Pest Control." },
    { name: "Curacron Insecticide", price: "122", image: "Curacron Insecticide.webp", desc: "Profenofos 50% EC Broad-Spectrum Pest Control." },
    { name: "Shinwa Insecticide", price: "420", image: "Shinwa Insecticide.webp", desc: "Fluxametamide 10% EC for Broad Pest Control." }
];

// Sample data for Krushi Kendras (simulated)
const krushiKendras = {
    maharashtra: [
        { name: "Krushi Kendra Pune", address: "Shivaji Nagar, Pune", contact: "020-12345678" },
        { name: "Krushi Kendra Mumbai", address: "Andheri, Mumbai", contact: "022-87654321" }
    ],
    karnataka: [
        { name: "Krushi Kendra Bangalore", address: "Rajajinagar, Bangalore", contact: "080-11223344" },
        { name: "Krushi Kendra Mysore", address: "Vijayanagar, Mysore", contact: "0821-55667788" }
    ],
    uttarpradesh: [
        { name: "Krushi Kendra Lucknow", address: "Hazratganj, Lucknow", contact: "0522-33445566" },
        { name: "Krushi Kendra Kanpur", address: "Civil Lines, Kanpur", contact: "0512-77889900" }
    ],
    tamilnadu: [
        { name: "Krushi Kendra Chennai", address: "T. Nagar, Chennai", contact: "044-22334455" },
        { name: "Krushi Kendra Coimbatore", address: "RS Puram, Coimbatore", contact: "0422-66778899" }
    ]
};

// Sample subsidy data (percentage rates for fertilizers/pesticides)
const subsidyRates = {
    maharashtra: { fertilizer: 15, pesticide: 10 },
    karnataka: { fertilizer: 17, pesticide: 12 },
    uttarpradesh: { fertilizer: 16, pesticide: 11 },
    tamilnadu: { fertilizer: 14, pesticide: 13 }
};

// Function to render featured products on index.html
function renderProducts() {
    const grid = document.getElementById('product-grid');
    const template = document.getElementById('product-template');
    if (!grid || !template) return;

    // Combine fertilizers and pesticides, take first 2 from each
    const allProducts = [...fertilizers.slice(0, 2), ...pesticides.slice(0, 2)];

    allProducts.forEach(product => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.product');

        // Set data attributes for modal
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.img = product.image;
        card.dataset.desc = product.desc;

        // Fill in content
        const img = card.querySelector('.product-img');
        img.src = product.image;
        img.alt = product.name;

        const title = card.querySelector('.product-title');
        title.textContent = product.name;

        const meta = card.querySelector('.product-meta');
        meta.textContent = product.desc;

        const price = card.querySelector('.price');
        price.textContent = `₹${product.price}`;

        const netPrice = card.querySelector('.net-price');
        netPrice.textContent = `Net: ₹${product.price}`; // For now, same as price

        // Add event listeners
        const detailsBtn = card.querySelector('.btn-details');
        detailsBtn.addEventListener('click', (e) => {
            openDetails(e);
        });

        const buyBtn = card.querySelector('.btn-buy');
        buyBtn.addEventListener('click', () => {
            // Add to buy items logic
            const buyItems = JSON.parse(localStorage.getItem('agriBuy')) || [];
            buyItems.push({ name: product.name, price: product.price, img: product.image });
            localStorage.setItem('agriBuy', JSON.stringify(buyItems));
            alert(`Added "${product.name}" to buy items!`);
        });

        grid.appendChild(clone);
    });
}

function getRecommendations() {
    const diseaseSelect = document.getElementById('diseaseSelect');
    const cropSelect = document.getElementById('cropSelect');
    const soilSelect = document.getElementById('soilSelect');
    const weatherSelect = document.getElementById('weatherSelect');
    const locationSelect = document.getElementById('locationSelect');

    const disease = diseaseSelect ? diseaseSelect.value.trim().toLowerCase() : '';
    const crop = cropSelect ? cropSelect.value.trim().toLowerCase() : '';
    const soil = soilSelect ? soilSelect.value.trim().toLowerCase() : '';
    const weather = weatherSelect ? weatherSelect.value.trim().toLowerCase() : '';
    const location = locationSelect ? locationSelect.value.trim().toLowerCase() : '';

    const resultsContainer = document.getElementById('recommendationResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (!disease && !crop && !soil && !weather && !location) {
        resultsContainer.innerHTML = '<p>Please select at least one option for AI-powered recommendations.</p>';
        return;
    }

    let recommendedFerts = [];
    let recommendedPests = [];
    let advice = '';

    // Base recommendations on disease
    if (disease === 'blight') {
        recommendedFerts = fertilizers.filter(f => ['super phosphate', 'potash'].includes(f.name.toLowerCase()));
        recommendedPests = pesticides.filter(p => ['amistar top fungicide'].includes(p.name.toLowerCase()));
        advice += 'For blight, ensure good drainage and avoid overhead watering. ';
    } else if (disease === 'aphids') {
        recommendedFerts = fertilizers.filter(f => ['neem cake', 'bio fertilizer'].includes(f.name.toLowerCase()));
        recommendedPests = pesticides.filter(p => ['rogor insecticide', 'dhanpreet insecticide'].includes(p.name.toLowerCase()));
        advice += 'Aphids thrive in dry conditions; introduce natural predators like ladybugs. ';
    } else if (disease === 'caterpillar') {
        recommendedFerts = fertilizers.filter(f => ['urea'].includes(f.name.toLowerCase()));
        recommendedPests = pesticides.filter(p => ['em-1 insecticide'].includes(p.name.toLowerCase()));
        advice += 'Monitor for caterpillar eggs on leaves and remove manually if possible. ';
    } else if (disease === 'rust') {
        recommendedFerts = fertilizers.filter(f => ['zinc sulphate', 'potash'].includes(f.name.toLowerCase()));
        recommendedPests = pesticides.filter(p => ['amistar top fungicide'].includes(p.name.toLowerCase()));
        advice += 'Rust spreads in humid conditions; space plants for better air circulation. ';
    } else if (disease === 'powdery mildew') {
        recommendedFerts = fertilizers.filter(f => ['bio fertilizer'].includes(f.name.toLowerCase()));
        recommendedPests = pesticides.filter(p => ['amistar top fungicide'].includes(p.name.toLowerCase()));
        advice += 'Powdery mildew prefers dry leaves; water at soil level to avoid wetting foliage. ';
    }

    // Adjust based on soil type
    if (soil === 'sandy') {
        advice += 'Sandy soil drains quickly; use slow-release fertilizers and mulch to retain moisture. ';
        recommendedFerts = recommendedFerts.concat(fertilizers.filter(f => ['organic compost'].includes(f.name.toLowerCase())));
    } else if (soil === 'clay') {
        advice += 'Clay soil retains water; improve drainage and avoid overwatering. ';
        recommendedFerts = recommendedFerts.concat(fertilizers.filter(f => ['gypsum'].includes(f.name.toLowerCase())));
    } else if (soil === 'loam') {
        advice += 'Loam soil is ideal; maintain with balanced nutrients. ';
    }

    // Adjust based on weather
    if (weather === 'rainy') {
        advice += 'In rainy weather, reduce pesticide applications to avoid runoff. ';
        recommendedPests = recommendedPests.filter(p => p.name.toLowerCase().includes('fungicide')); // Prefer fungicides in rain
    } else if (weather === 'dry') {
        advice += 'Dry conditions increase pest pressure; ensure adequate irrigation. ';
        recommendedFerts = recommendedFerts.concat(fertilizers.filter(f => ['urea', 'ammonium sulphate'].includes(f.name.toLowerCase())));
    } else if (weather === 'sunny') {
        advice += 'Sunny weather promotes growth; monitor for sunburn on leaves. ';
    }

    // Adjust based on crop
    if (crop === 'wheat') {
        advice += 'Wheat prefers well-drained soil; harvest when grains are hard. ';
    } else if (crop === 'rice') {
        advice += 'Rice needs flooded conditions; ensure proper water management. ';
    } else if (crop === 'maize') {
        advice += 'Maize requires nitrogen-rich fertilizers; watch for corn borers. ';
    } else if (crop === 'soybean') {
        advice += 'Soybean fixes nitrogen; supplement with phosphorus. ';
    } else if (crop === 'sugarcane') {
        advice += 'Sugarcane needs potassium for sugar content; harvest when mature. ';
    }

    // Default if no specific matches
    if (!recommendedFerts.length) recommendedFerts = fertilizers.slice(0, 3);
    if (!recommendedPests.length) recommendedPests = pesticides.slice(0, 3);

    // Remove duplicates
    recommendedFerts = [...new Set(recommendedFerts)];
    recommendedPests = [...new Set(recommendedPests)];

    // Helper to create product card html string
    function createCard(product) {
        return `
            <article class="card product" data-name="${product.name}" data-price="${product.price}" data-img="${product.image}" data-desc="${product.desc}">
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <div class="card-actions"><button onclick="openDetails(event)">View Details</button></div>
            </article>
        `;
    }

    // Set up containers for fertilizers and pesticides
    resultsContainer.innerHTML = '<div id="recommendedFertilizers" class="grid grid-4"></div><div id="recommendedPesticides" class="grid grid-4"></div><div id="additionalInfo" class="additional-info-container"><div id="aiAdvice" class="info-box"></div><div id="subsidyInfo" class="info-box"></div><div id="krushiKendra" class="info-box"></div></div>';

    const fertContainer = document.getElementById('recommendedFertilizers');
    const pestContainer = document.getElementById('recommendedPesticides');

    // Display Recommended Fertilizers
    if (recommendedFerts.length) {
        fertContainer.innerHTML += '<h3>Recommended Fertilizers</h3>';
        recommendedFerts.forEach(fert => {
            fertContainer.innerHTML += createCard(fert);
        });
    }

    // Display Recommended Pesticides
    if (recommendedPests.length) {
        pestContainer.innerHTML += '<h3>Recommended Pesticides</h3>';
        recommendedPests.forEach(pest => {
            pestContainer.innerHTML += createCard(pest);
        });
    }

    // Display AI Advice
    const aiAdviceDiv = document.getElementById('aiAdvice');
    if (advice) {
        aiAdviceDiv.innerHTML = '<h3>AI Personalized Advice</h3><p>' + advice + '</p>';
    } else {
        aiAdviceDiv.innerHTML = '<h3>AI Personalized Advice</h3><p>Select disease, crop, soil, weather, or location for personalized recommendations.</p>';
    }

    // Display Subsidy Info
    const subsidyInfoDiv = document.getElementById('subsidyInfo');
    if (location && subsidyRates[location]) {
        const rates = subsidyRates[location];
        subsidyInfoDiv.innerHTML = '<h3>Government Subsidy Information</h3>';
        subsidyInfoDiv.innerHTML += `<p>Fertilizer subsidy: ${rates.fertilizer}% | Pesticide subsidy: ${rates.pesticide}% in ${location.charAt(0).toUpperCase() + location.slice(1)}.</p>`;
    } else {
        subsidyInfoDiv.innerHTML = '<h3>Government Subsidy Information</h3><p>Select a location to view subsidy rates for fertilizers and pesticides.</p>';
    }

    // Display Nearest Krushi Kendra
    const krushiKendraDiv = document.getElementById('krushiKendra');
    if (location && krushiKendras[location]) {
        const kendras = krushiKendras[location];
        krushiKendraDiv.innerHTML = '<h3>Nearest Verified Krushi Kendra</h3>';
        kendras.forEach(kendra => {
            krushiKendraDiv.innerHTML += `<p><strong>${kendra.name}</strong><br>Address: ${kendra.address}<br>Contact: ${kendra.contact}</p>`;
        });
    } else {
        krushiKendraDiv.innerHTML = '<h3>Nearest Verified Krushi Kendra</h3><p>Select a location to find the nearest Krushi Kendra for support and resources.</p>';
    }
}

/* Open details modal for a clicked product (fertilizers + crops) */
function openDetails(e) {
    // prevent bubbling if button within card
    const btn = e.currentTarget || e.target;
    // card is parent article element
    const card = btn.closest('.product');
    if (!card) return;
    const name = card.dataset.name || '';
    const price = card.dataset.price || '';
    const img = card.dataset.img || (card.querySelector('img') ? card.querySelector('img').src : '');
    const desc = card.dataset.desc || '';

    const modal = document.getElementById('detailsModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalPrice').textContent = price ? `₹${price}` + (card.querySelector('.price') && card.querySelector('.price').textContent.includes('/') ? ' / unit' : '') : '';
    document.getElementById('modalDesc').textContent = desc;
    const imgEl = document.getElementById('modalImg');
    imgEl.src = img;
    imgEl.alt = name;
    window.scrollTo(0, 0);
}

/* Close modal */
function closeModal() {
    const modal = document.getElementById('detailsModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
}

/* Simulate buy */
function buyItem() {
    const name = document.getElementById('modalName').textContent || 'item';
    const priceText = document.getElementById('modalPrice').textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
    const img = document.getElementById('modalImg').src;

    const buyItems = JSON.parse(localStorage.getItem('agriBuy')) || [];
    buyItems.push({ name, price, img });
    localStorage.setItem('agriBuy', JSON.stringify(buyItems));
    alert(`Added "${name}" to buy items!`);
    closeModal();
}

/* Add to cart from modal */
function addToCartFromModal() {
    const name = document.getElementById('modalName').textContent;
    const priceText = document.getElementById('modalPrice').textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
    const img = document.getElementById('modalImg').src;

    const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    cart.push({ name, price, img });
    localStorage.setItem('agriCart', JSON.stringify(cart));
    alert(`Added "${name}" to the cart!`);
    closeModal();
}


/* Filter products by name (fert, pest, or crop) */
function filterProducts(type) {
    let inputId, gridId;
    if (type === 'fert') {
        inputId = 'fertSearch';
        gridId = 'fertGrid';
    } else if (type === 'pest') {
        inputId = 'pestSearch';
        gridId = 'fertGrid'; // Note: pesticides.html uses 'fertGrid' for grid id
    } else if (type === 'crop') {
        inputId = 'cropSearch';
        gridId = 'cropGrid';
    } else {
        return;
    }
    const input = document.getElementById(inputId);
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product'));
    cards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        card.style.display = name.includes(q) ? '' : 'none';
    });
}

/* Sort products inside a grid (by price) */
function sortProducts(type) {
    let selId, gridId;
    if (type === 'fert') {
        selId = 'fertSort';
        gridId = 'fertGrid';
    } else if (type === 'pest') {
        selId = 'pestSort';
        gridId = 'fertGrid'; // Note: pesticides.html uses 'fertGrid' for grid id
    } else {
        return;
    }
    const sel = document.getElementById(selId);
    if (!sel || !sel.value || sel.value === 'default') return;
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll('.product'));
    const asc = sel.value === 'price-asc';
    items.sort((a, b) => {
        const pa = Number(a.dataset.price) || 0;
        const pb = Number(b.dataset.price) || 0;
        return asc ? pa - pb : pb - pa;
    });
    // re-append in sorted order
    items.forEach(i => grid.appendChild(i));
}

/* --- New functionality for login, farmer details and cart --- */
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current nav link (existing)
    const navLinks = document.querySelectorAll('.main-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
    });

    // Language selection functionality
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
        // Load saved language on page load
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        languageSelect.value = savedLang;
        changeLanguage(savedLang);
    }

    // Render featured products on index.html
    if (path === 'index.html') {
        renderProducts();
    }

    // Login popup management for 'Account' link click
    const accountNavLink = document.querySelector('.main-nav a[href="account.html"]');
    if (accountNavLink) {
        accountNavLink.addEventListener('click', function (e) {
            e.preventDefault();
            showLoginPopup();
        });
    }

    // Function to create/show login popup dynamically
    function showLoginPopup() {
        // If login already done, directly open account page
        if (localStorage.getItem('farmerLogin')) {
            window.location.href = 'account.html';
            return;
        }

        // Create popup div
        let popup = document.getElementById('loginPopup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'loginPopup';
            popup.classList.add('colorful-login-popup');  // Add class instead of inline styles

            popup.innerHTML = `
                    <h2>Farmer Login</h2>
                    <form id="popupLoginForm">
                        <label for="popupFarmerName">Farmer Name:</label><br/>
                        <input type="text" id="popupFarmerName" name="popupFarmerName" required /><br/>
                        <label for="popupEmailOrMobile">Email ID or Mobile No.:</label><br/>
                        <input type="text" id="popupEmailOrMobile" name="popupEmailOrMobile" required /><br/>
                        <button type="submit">Login</button>
                    </form>
                    <button id="popupCloseBtn" class="popup-close-btn">Close</button>
                `;
            document.body.appendChild(popup);


            // Close button handler
            document.getElementById('popupCloseBtn').addEventListener('click', () => {
                popup.remove();
            });

            // Login form submission handler
            document.getElementById('popupLoginForm').addEventListener('submit', e => {
                e.preventDefault();
                const name = document.getElementById('popupFarmerName').value.trim();
                const emailOrMobile = document.getElementById('popupEmailOrMobile').value.trim();
                if (name && emailOrMobile) {
                    localStorage.setItem('farmerLogin', JSON.stringify({ farmerName: name, emailOrMobile }));
                    alert('Login successful!');
                    popup.remove();
                    window.location.href = 'account.html';
                } else {
                    alert('Please enter all required fields.');
                }
            });
        } else {
            popup.style.display = 'block';
        }
    }

    // Subsidy Estimator form handling
    const subsidyForm = document.getElementById('subsidy-form');
    if (subsidyForm) {
        subsidyForm.addEventListener('submit', e => {
            e.preventDefault();
            const prodType = document.getElementById('prod-type').value;
            const state = document.getElementById('state').value;

            // Subsidy rates and prices (example data)
            // Rates are percentage of base price used for subsidy amount calculation
            const subsidyData = {
                seeds: {
                    maharashtra: { rate: 25, basePrice: 1250 },
                    karnataka: { rate: 20, basePrice: 1200 },
                    uttarpradesh: { rate: 22, basePrice: 1300 },
                    tamilnadu: { rate: 18, basePrice: 1275 }
                },
                fertiliser: {
                    maharashtra: { rate: 15, basePrice: 1150 },
                    karnataka: { rate: 17, basePrice: 1100 },
                    uttarpradesh: { rate: 16, basePrice: 1180 },
                    tamilnadu: { rate: 14, basePrice: 1125 }
                },
                pesticide: {
                    maharashtra: { rate: 10, basePrice: 1050 },
                    karnataka: { rate: 12, basePrice: 1100 },
                    uttarpradesh: { rate: 11, basePrice: 1075 },
                    tamilnadu: { rate: 13, basePrice: 1090 }
                }
            };

            if (!subsidyData[prodType] || !subsidyData[prodType][state]) {
                document.getElementById('subsidy-result').textContent = 'Subsidy information not available for the selected options.';
                return;
            }

            const { rate, basePrice } = subsidyData[prodType][state];
            const subsidyAmount = basePrice * rate / 100;
            const netPrice = basePrice - subsidyAmount;

            const formattedResult = `
                <strong>Estimated subsidy for ${capitalizeFirstLetter(prodType)} in ${capitalizeFirstLetter(state.replace(/([a-z])([A-Z])/g, '$1 $2'))}:</strong><br/>
                Rate: ${rate.toFixed(1)}% &bull; Subsidy amount (per unit sample): ₹${subsidyAmount.toFixed(0)} &bull; Estimated net price: ₹${netPrice.toFixed(0)}
            `;

            const resultDiv = document.getElementById('subsidy-result');
            resultDiv.innerHTML = formattedResult;
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Farmer details form handler
    const detailsForm = document.getElementById('farmer-details-form');
    if (detailsForm) {
        detailsForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(detailsForm);
            const farmerDetails = {};

            // Helper function to save and display details
            function saveAndDisplayDetails() {
                localStorage.setItem('farmerDetails', JSON.stringify(farmerDetails));
                displayFarmerDetails(farmerDetails);
                alert('Farmer details saved.');
                // Reset form but then repopulate to keep data in inputs
                detailsForm.reset();

                const storedDetails = localStorage.getItem('farmerDetails');
                if (storedDetails) {
                    const details = JSON.parse(storedDetails);
                    // Repopulate the form fields with saved data
                    const fields = [
                        'name',
                        'gender',
                        'dob',
                        'email',
                        'mobile',
                        'address',
                        'aadharCardNo'
                    ];
                    fields.forEach(field => {
                        const input = document.getElementById(field);
                        if (input && details[field]) {
                            input.value = details[field];
                        }
                    });
                }
            }

            // Process form fields including image asynchronously
            const imageFile = formData.get('farmerImage');
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    // Add image as base64 string
                    farmerDetails.farmerImage = event.target.result;
                    // Add other form entries except image
                    formData.forEach((value, key) => {
                        if (key !== 'farmerImage') {
                            farmerDetails[key] = value;
                        }
                    });
                    saveAndDisplayDetails();
                };
                reader.readAsDataURL(imageFile);
            } else {
                // No new image file selected
                // Retrieve existing farmerDetails from localStorage to preserve image
                const storedDetails = localStorage.getItem('farmerDetails');
                let existingFarmDetails = {};
                if (storedDetails) {
                    existingFarmDetails = JSON.parse(storedDetails);
                }

                formData.forEach((value, key) => {
                    farmerDetails[key] = value;
                });

                // Preserve existing farmerImage if present
                if (existingFarmDetails.farmerImage) {
                    farmerDetails.farmerImage = existingFarmDetails.farmerImage;
                }

                saveAndDisplayDetails();
            }
        });

        // Display farmer details if stored when page loads
        const storedDetails = localStorage.getItem('farmerDetails');
        if (storedDetails) {
            const details = JSON.parse(storedDetails);
            displayFarmerDetails(details);

            // Also populate form fields with stored values to keep inputs filled
            const fields = [
                'name',
                'gender',
                'dob',
                'email',
                'mobile',
                'address',
                'aadharCardNo'
            ];
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input && details[field]) {
                    input.value = details[field];
                }
            });
        }
    }

    // Display farmer details in the display div
    function displayFarmerDetails(details) {
        const container = document.getElementById('farmer-details-display');
        if (!container) return;
        container.innerHTML = '';

        // Create image container
        if (details.farmerImage) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('farmer-image-container');

            const img = document.createElement('img');
            img.src = details.farmerImage;
            img.alt = "Farmer Image";
            imgContainer.appendChild(img);

            container.appendChild(imgContainer);
        }

        // Create details container
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('farmer-details-container');

        // Define fields from the form actually present
        const fields = [
            { label: 'Name', key: 'name' },
            { label: 'Gender', key: 'gender' },
            { label: 'Date of Birth', key: 'dob' },
            { label: 'Email', key: 'email' },
            { label: 'Mobile No.', key: 'mobile' },
            { label: 'Address', key: 'address' },
            { label: 'Aadhar Card No.', key: 'aadharCardNo' }
        ];

        fields.forEach(({ label, key }) => {
            if (details[key]) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${label}:</strong> ${details[key]}`;
                detailsContainer.appendChild(p);
            }
        });

        container.appendChild(detailsContainer);
    }

    // Add to cart functionality on product detail modal's "Add to Cart" button
    const addToCartBtn = document.querySelector('.cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const name = document.getElementById('modalName').textContent;
            const priceText = document.getElementById('modalPrice').textContent;
            const price = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
            const img = document.getElementById('modalImg').src;

            const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
            cart.push({ name, price, img });
            localStorage.setItem('agriCart', JSON.stringify(cart));
            alert(`Added "${name}" to the cart!`);
        });
    }

    // Cart functionality - Render products from localStorage
    if (path === 'cart.html') {
        const buyItemsContainer = document.getElementById('buy-items');
        const cartItemsContainer = document.getElementById('cart-items');
        const itemsTotalContainer = document.getElementById('items-total');

        const buyItems = JSON.parse(localStorage.getItem('agriBuy')) || [];
        const cartItems = JSON.parse(localStorage.getItem('agriCart')) || [];

        function renderBuyItems() {
            buyItemsContainer.innerHTML = '';
            if (buyItems.length === 0) {
                buyItemsContainer.textContent = 'Your buy list is empty.';
                return;
            }
            buyItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('buy-item');
                itemDiv.style.borderBottom = '1px solid #ccc';
                itemDiv.style.padding = '8px 0';
                itemDiv.style.display = 'flex';
                itemDiv.style.alignItems = 'center';
                itemDiv.style.gap = '15px';

                // Add product image
                if (item.img) {
                    const img = document.createElement('img');
                    img.src = item.img;
                    img.alt = item.name || 'Product Image';
                    img.style.width = '60px';
                    img.style.height = '60px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '6px';
                    itemDiv.appendChild(img);
                }

                const infoDiv = document.createElement('div');
                infoDiv.style.flexGrow = '1';

                const name = document.createElement('p');
                name.textContent = item.name || 'Unnamed product';
                infoDiv.appendChild(name);

                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;
                const totalPrice = price * quantity;
                const priceP = document.createElement('p');
                priceP.textContent = `Price: ₹${totalPrice} (₹${price} x ${quantity})`;
                infoDiv.appendChild(priceP);

                itemDiv.appendChild(infoDiv);

                // Add Quantity selector
                const quantitySelect = document.createElement('select');
                quantitySelect.style.backgroundColor = 'yellow';
                quantitySelect.style.border = '1px solid #ccc';
                quantitySelect.style.padding = '5px';
                quantitySelect.style.borderRadius = '4px';
                quantitySelect.style.marginLeft = '10px';
                const options = ['1', '2', '3', '4', '5', 'more'];
                options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    if (opt === quantity.toString()) option.selected = true;
                    quantitySelect.appendChild(option);
                });
                quantitySelect.addEventListener('change', () => {
                    const newQty = quantitySelect.value === 'more' ? prompt('Enter quantity:') : quantitySelect.value;
                    if (newQty && !isNaN(newQty)) {
                        buyItems[index].quantity = Number(newQty);
                        localStorage.setItem('agriBuy', JSON.stringify(buyItems));
                        renderBuyItems();
                        renderTotal();
                    } else {
                        quantitySelect.value = quantity.toString();
                    }
                });
                itemDiv.appendChild(quantitySelect);

                // Add Buy Now button
                const buyNowBtn = document.createElement('button');
                buyNowBtn.textContent = 'Buy Now';
                buyNowBtn.style.backgroundColor = 'green';
                buyNowBtn.style.color = 'white';
                buyNowBtn.style.border = 'none';
                buyNowBtn.style.padding = '5px 10px';
                buyNowBtn.style.borderRadius = '4px';
                buyNowBtn.style.cursor = 'pointer';
                buyNowBtn.style.marginLeft = '10px';
                buyNowBtn.addEventListener('click', () => {
                    alert(`Purchase completed for "${item.name}"!`);
                });
                itemDiv.appendChild(buyNowBtn);

                // Add Remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-btn');
                removeBtn.style.backgroundColor = 'red';
                removeBtn.style.color = 'white';
                removeBtn.style.border = 'none';
                removeBtn.style.padding = '5px 10px';
                removeBtn.style.borderRadius = '4px';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.marginLeft = '10px';
                removeBtn.addEventListener('click', () => {
                    buyItems.splice(index, 1);
                    localStorage.setItem('agriBuy', JSON.stringify(buyItems));
                    renderBuyItems();
                    renderTotal();
                });
                itemDiv.appendChild(removeBtn);

                buyItemsContainer.appendChild(itemDiv);
            });
        }

        function renderCartItems() {
            cartItemsContainer.innerHTML = '';
            if (cartItems.length === 0) {
                cartItemsContainer.textContent = 'Your cart is empty.';
                return;
            }
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.style.borderBottom = '1px solid #ccc';
                itemDiv.style.padding = '8px 0';
                itemDiv.style.display = 'flex';
                itemDiv.style.alignItems = 'center';
                itemDiv.style.gap = '15px';

                // Add product image
                if (item.img) {
                    const img = document.createElement('img');
                    img.src = item.img;
                    img.alt = item.name || 'Product Image';
                    img.style.width = '60px';
                    img.style.height = '60px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '6px';
                    itemDiv.appendChild(img);
                }

                const infoDiv = document.createElement('div');
                infoDiv.style.flexGrow = '1';

                const name = document.createElement('p');
                name.textContent = item.name || 'Unnamed product';
                infoDiv.appendChild(name);

                const price = Number(item.price) || 0;
                const priceP = document.createElement('p');
                priceP.textContent = `Price: ₹${price}`;
                infoDiv.appendChild(priceP);

                itemDiv.appendChild(infoDiv);

                // Add Remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-btn');
                removeBtn.style.backgroundColor = 'red';
                removeBtn.style.color = 'white';
                removeBtn.style.border = 'none';
                removeBtn.style.padding = '5px 10px';
                removeBtn.style.borderRadius = '4px';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.marginLeft = '10px';
                removeBtn.addEventListener('click', () => {
                    cartItems.splice(index, 1);
                    localStorage.setItem('agriCart', JSON.stringify(cartItems));
                    renderCartItems();
                    renderTotal();
                });
                itemDiv.appendChild(removeBtn);

                cartItemsContainer.appendChild(itemDiv);
            });
        }

        function renderTotal() {
            const buyTotal = buyItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
            const cartTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
            const grandTotal = buyTotal + cartTotal;
            itemsTotalContainer.textContent = `Total: ₹${grandTotal}`;
        }

        renderBuyItems();
        renderCartItems();
        renderTotal();
    }
});
