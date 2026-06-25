// js/engine.js

// Global dataset object acting as the destination micro-database
const MereYatriDatabase = [
    { 
        id: 1, 
        name: "Leh-Ladakh", 
        vibes: ["Adventure", "Nature"], 
        bestMonths: ["June", "July", "August", "September"], 
        estimatedCostPerDay: 4500, 
        description: "High mountain passes, pristine deep blue saltwater lakes, and historic valleys." 
    },
    { 
        id: 2, 
        name: "Goa", 
        vibes: ["Beach", "Relaxation"], 
        bestMonths: ["November", "December", "January", "February"], 
        estimatedCostPerDay: 3500, 
        description: "Golden coast lines, night beach bazaars, and traditional Portuguese architecture." 
    },
    { 
        id: 3, 
        name: "Munnar, Kerala", 
        vibes: ["Nature", "Relaxation"], 
        bestMonths: ["September", "October", "November", "December", "January"], 
        estimatedCostPerDay: 3000, 
        description: "Sprawling wild tea estates, continuous cloud mists, and clean mountain hiking trails." 
    },
    { 
        id: 4, 
        name: "Rishikesh", 
        vibes: ["Spiritual", "Adventure"], 
        bestMonths: ["March", "April", "September", "October"], 
        estimatedCostPerDay: 2000, 
        description: "White-water river sports down the Ganga, evening ghat ceremonies, and global yoga centers." 
    },
    { 
        id: 5, 
        name: "Rajasthan (Jaisalmer)", 
        vibes: ["Culture", "Relaxation"], 
        bestMonths: ["November", "December", "January", "February"], 
        estimatedCostPerDay: 5000, 
        description: "Desert campfires underneath clear starlight horizons, sand dunes, and stone palaces." 
    }
];

/**
 * Filter mechanism to handle matches
 * @param {string} targetedVibe 
 * @param {string} targetedMonth 
 * @param {number} maximumDailyBudget 
 * @returns {Array} Matches array
 */
function queryTravelEngine(targetedVibe, targetedMonth, maximumDailyBudget) {
    return MereYatriDatabase.filter(destination => {
        const checkVibe = destination.vibes.includes(targetedVibe);
        const checkMonth = destination.bestMonths.includes(targetedMonth);
        const checkBudget = destination.estimatedCostPerDay <= maximumDailyBudget;
        
        return checkVibe && checkMonth && checkBudget;
    });
}