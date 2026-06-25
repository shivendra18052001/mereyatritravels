// js/app.js

// 1. Comprehensive Travel Matrix Dataset Database
const MereYatriTravelsDatabase = [
    { id: 1, name: "Leh-Ladakh Tour", vibes: ["Adventure"], bestMonths: ["June", "October"], baseRoutePricePerDay: 2500, description: "Conquer absolute high mountain terrain passes and valley trails.", allowedCars: ["SUV (Scorpio/Innova)", "4x4 Traveler Overlander"] },
    { id: 2, name: "Goa Beach Hopping", vibes: ["Beach"], bestMonths: ["October", "December", "January"], baseRoutePricePerDay: 1500, description: "Cruise through pristine coastal highway tracks and sandy beaches.", allowedCars: ["Sedan (Dzire/Etios)", "Hatchback (Swift)"] },
    { id: 3, name: "Rishikesh Spiritual Escape", vibes: ["Spiritual"], bestMonths: ["January", "October"], baseRoutePricePerDay: 1200, description: "Travel directly to serene riverside mountain ghats and camp sites.", allowedCars: ["Sedan (Dzire/Etios)", "SUV (Scorpio/Innova)"] },
    { id: 4, name: "Jim Corbett Safari Trail", vibes: ["Nature"], bestMonths: ["January", "June", "December"], baseRoutePricePerDay: 1800, description: "Navigate deep wilderness forestry reserve paths safely.", allowedCars: ["SUV (Scorpio/Innova)", "4x4 Traveler Overlander"] }
];

// Car pricing multipliers setup rate limits
const VehicleRateEngine = {
    "Hatchback (Swift)": 1200,
    "Sedan (Dzire/Etios)": 1800,
    "SUV (Scorpio/Innova)": 3000,
    "4x4 Traveler Overlander": 4500
};

// 2. DOM Elements Mapping
const daysInput = document.getElementById('daysInput');
const daysDisplay = document.getElementById('daysDisplay');
const searchEngineForm = document.getElementById('searchEngineForm');
const fleetCardContainer = document.getElementById('fleetCardContainer');

const bookingModal = document.getElementById('bookingModal');
const modalBox = document.querySelector('.id-modal-box');
const closeModalBtn = document.getElementById('closeModalBtn');
const finalBookingForm = document.getElementById('finalBookingForm');

// State trackers variables memory storage
let activeBookingState = null;

// Real-time track listener update display indicator loop
daysInput.addEventListener('input', (e) => {
    daysDisplay.textContent = `${e.target.value} ${parseInt(e.target.value) === 1 ? 'Day' : 'Days'}`;
});

// 3. Search and UI Render Matching Engine Workflows
function processSearchPipeline(event) {
    if(event) event.preventDefault();

    const selectedVibe = document.getElementById('vibeInput').value;
    const selectedMonth = document.getElementById('monthInput').value;
    const tripDaysCount = parseInt(daysInput.value);

    // Filter locations out matching targets criteria
    const filteredLocations = MereYatriTravelsDatabase.filter(loc => {
        return loc.vibes.includes(selectedVibe) && loc.bestMonths.includes(selectedMonth);
    });

    renderMarketplaceCards(filteredLocations, tripDaysCount);
}

function renderMarketplaceCards(locations, dayCount) {
    fleetCardContainer.innerHTML = '';

    if(locations.length === 0) {
        fleetCardContainer.className = "block text-center";
        fleetCardContainer.innerHTML = `
            <div class="bg-white p-12 rounded-3xl text-slate-400 border border-dashed border-slate-200 font-medium">
                No active routes found for this custom profile selection combo. Try changing the target month selection!
            </div>`;
        return;
    }

    fleetCardContainer.className = "grid grid-cols-1 md:grid-cols-2 gap-8";

    locations.forEach(location => {
        location.allowedCars.forEach((car, index) => {
            const dailyCarCost = VehicleRateEngine[car];
            const cumulativeTotalBill = (location.baseRoutePricePerDay + dailyCarCost) * dayCount;

            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-200 card-scale-up flex flex-col justify-between";
            
            card.innerHTML = `
                <div class="p-6">
                    <div class="flex justify-between items-start gap-4 mb-2">
                        <h3 class="text-xl font-bold text-slate-900">${location.name}</h3>
                        <span class="bg-orange-50 text-orange-600 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                            ₹${cumulativeTotalBill} Total
                        </span>
                    </div>
                    <p class="text-slate-500 text-sm mb-4 leading-relaxed">${location.description}</p>
                    
                    <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                            <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Assigned Vehicle</p>
                            <p class="text-sm font-extrabold text-slate-800">${car}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Daily Fare</p>
                            <p class="text-sm font-extrabold text-slate-800">₹${location.baseRoutePricePerDay + dailyCarCost}/d</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 pt-0">
                    <button onclick="initiateCheckoutProcess('${location.name}', '${car}', ${dayCount}, ${cumulativeTotalBill})" 
                            class="w-full bg-slate-900 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors duration-150">
                        Book This Vehicle
                    </button>
                </div>
            `;
            fleetCardContainer.appendChild(card);
        });
    });
}

// 4. Booking System Checkout State Control Overlay Workflows
window.initiateCheckoutProcess = function(destinationName, carModel, days, totalCost) {
    // Save current active entity records values state
    activeBookingState = { destinationName, carModel, days, totalCost };

    // Hydrate checkout overlay invoice elements structures view fields dynamically
    document.getElementById('billDest').textContent = destinationName;
    document.getElementById('billCar').textContent = carModel;
    document.getElementById('billDays').textContent = `${days} ${days === 1 ? 'Day' : 'Days'}`;
    document.getElementById('billTotal').textContent = `₹${totalCost}`;

    // Reveal UI overlay windows screen viewport layouts smoothly
    bookingModal.classList.remove('hidden');
    setTimeout(() => {
        modalBox.classList.add('modal-active');
    }, 10);
};

function terminateCheckoutOverlay() {
    modalBox.classList.remove('modal-active');
    setTimeout(() => {
        bookingModal.classList.add('hidden');
        finalBookingForm.reset();
    }, 150);
}

closeModalBtn.addEventListener('click', terminateCheckoutOverlay);

// Handle final customer form pipeline execution data save loop triggers
finalBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const passengerName = document.getElementById('custName').value;
    const passengerPhone = document.getElementById('custPhone').value;

    // Create the final alert payload profile response object record
    const confirmedReceiptPayload = {
        customer: passengerName,
        contact: passengerPhone,
        tripDetails: activeBookingState,
        bookingTimestamp: new Date().toISOString()
    };

    // Alert completion simulation response output notice 
    alert(`🎉 Booking Confirmed Successfully via MereYatriTravels!\n\nThank you ${confirmedReceiptPayload.customer}. Our driver will contact you on ${confirmedReceiptPayload.contact} shortly regarding your trip to ${confirmedReceiptPayload.tripDetails.destinationName}.`);
    
    terminateCheckoutOverlay();
});

// Run filter matching layout rendering engine operations safely on load
document.addEventListener('DOMContentLoaded', () => {
    processSearchPipeline();
});
searchEngineForm.addEventListener('submit', processSearchPipeline);