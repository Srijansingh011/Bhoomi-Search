document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchResultsContainer = document.getElementById('search-results');
    const loader = document.getElementById('loader');
    const resultsContent = document.getElementById('results-content');
    const searchInput = document.getElementById('searchInput');

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Mock Database of Land Records ---
    const landRegistryDB = {
        "KH12345": {
            owner: "Ramesh Kumar",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=RK",
            valuation: "₹ 75,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "1 Active Dispute: Boundary Claim",
            summary: "This property is a freehold asset owned by Ramesh Kumar. While all property taxes are up to date, there is an active legal dispute regarding a boundary claim filed by a neighbor. We recommend seeking legal advice before proceeding with any transaction."
        },
        "KH67890": {
            owner: "Sunita Devi",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=SD",
            valuation: "₹ 92,50,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "This is a clear title property owned by Sunita Devi. All taxes have been paid, and there are no active legal disputes on record. The property is suitable for immediate transaction."
        },
        "KH54321": {
            owner: "Amit Singh",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=AS",
            valuation: "₹ 1,10,00,000",
            taxStatus: "Pending: ₹ 25,000",
            disputes: "No Active Disputes",
            summary: "Owned by Amit Singh, this property has a pending tax amount of ₹ 25,000. There are no other legal disputes. The pending tax must be cleared before the sale deed can be executed."
        },
        "KH98765": {
            owner: "Priya Sharma",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=PS",
            valuation: "₹ 68,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "A clear title property owned by Priya Sharma. Records indicate all dues are cleared and there are no legal encumbrances. Suitable for purchase."
        },
        "KH11223": {
            owner: "Manoj Verma",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=MV",
            valuation: "₹ 2,50,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "2 Active Disputes: Inheritance Claim, Right of Way",
            summary: "This high-value property, owned by Manoj Verma, is currently involved in two legal disputes related to inheritance and a right of way. Extreme caution and legal consultation are advised."
        },
        "KH44556": {
            owner: "Geeta Joshi",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=GJ",
            valuation: "₹ 85,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "This property is owned by Geeta Joshi and has a clean record. All taxes are paid, and no disputes are registered against it."
        },
        "KH77889": {
            owner: "Sanjay Gupta",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=SG",
            valuation: "₹ 1,50,00,000",
            taxStatus: "Pending: ₹ 78,000",
            disputes: "1 Active Dispute: Loan Default Notice",
            summary: "Owned by Sanjay Gupta, this property has significant pending taxes and a notice of loan default from a financial institution. This is a high-risk property for any transaction."
        },
        "KH99001": {
            owner: "Anjali Mehta",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=AM",
            valuation: "₹ 55,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "A small plot with a clear title owned by Anjali Mehta. All records are clean, making it a safe investment."
        },
        "KH33445": {
            owner: "Vikram Rathore",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=VR",
            valuation: "₹ 3,20,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "A large commercial property owned by Vikram Rathore. All records are verified and clear of any disputes or pending dues."
        },
        "KH66778": {
            owner: "Deepika Nair",
            photoUrl: "https://placehold.co/100x100/4ADE80/1F2937?text=DN",
            valuation: "₹ 95,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            summary: "This residential property, owned by Deepika Nair, has a clear title and no pending issues according to our records."
        }
    };

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toUpperCase(); // Standardize input
        if (!query) {
            alert('Please enter a Khasra Number / Land ID.');
            return;
        }

        searchResultsContainer.classList.remove('hidden');
        resultsContent.innerHTML = '';
        loader.classList.remove('hidden');

        // Simulate API call and processing
        setTimeout(() => {
            loader.classList.add('hidden');
            const record = landRegistryDB[query];
            if (record) {
                displayResults(record, query);
            } else {
                displayNotFound();
            }
        }, 1500);
    });

    function displayResults(record, propertyId) {
        const taxStatusColor = record.taxStatus === "All Dues Cleared" ? "text-green-300" : "text-red-300";
        const taxStatusIcon = record.taxStatus === "All Dues Cleared" 
            ? `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
            : `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;

        const disputeStatusColor = record.disputes === "No Active Disputes" ? "text-green-300" : "text-red-300";
        const disputeStatusIcon = record.disputes === "No Active Disputes"
            ? `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
            : `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>`;

        const resultHTML = `
            <div class="result-card bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-white mb-2">Simplified Property Report</h2>
                    <p class="text-gray-400">Khasra Number: ${propertyId}</p>
                </div>
                <div class="grid md:grid-cols-2 gap-px bg-gray-700">
                    <div class="bg-gray-800 p-6">
                        <h3 class="font-semibold text-green-400 mb-4">Ownership Details</h3>
                        <div class="flex flex-col items-center text-center">
                            <img src="${record.photoUrl}" alt="Owner Photo" class="w-24 h-24 rounded-full border-4 border-green-400 mb-4">
                            <p class="text-xl font-semibold text-white">${record.owner}</p>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6">
                        <h3 class="font-semibold text-green-400 mb-2">Property Valuation</h3>
                        <p><strong class="text-gray-300">Estimated Value:</strong> ${record.valuation}</p>
                    </div>
                    <div class="bg-gray-800 p-6">
                        <h3 class="font-semibold text-green-400 mb-2">Tax Status</h3>
                        <p class="${taxStatusColor} flex items-center">${taxStatusIcon} ${record.taxStatus}</p>
                    </div>
                    <div class="bg-gray-800 p-6">
                        <h3 class="font-semibold text-green-400 mb-2">Disputes & Alerts</h3>
                        <p class="${disputeStatusColor} flex items-center">${disputeStatusIcon} ${record.disputes}</p>
                    </div>
                </div>
                <div class="p-6 bg-gray-900">
                    <h3 class="font-semibold text-green-400 mb-3">Simplified Summary (AI-Generated)</h3>
                    <p class="text-gray-400">${record.summary}</p>
                    <div class="mt-6 text-center">
                         <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">Download Full Report (PDF)</button>
                    </div>
                </div>
            </div>
        `;
        resultsContent.innerHTML = resultHTML;
    }

    function displayNotFound() {
        const notFoundHTML = `
            <div class="result-card bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
                <h2 class="text-2xl font-bold text-red-400 mb-2">Record Not Found</h2>
                <p class="text-gray-400">The Khasra Number you entered does not match any records in our database. Please check the number and try again.</p>
            </div>
        `;
        resultsContent.innerHTML = notFoundHTML;
    }
});
