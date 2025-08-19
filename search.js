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
            photoUrl: "IMAGE/AdobeStock_39586886_Preview.jpeg",
            valuation: "₹ 75,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "1 Active Dispute: Boundary Claim",
            landUse: "Residential",
            trustScore: 65
        },
        "KH67890": {
            owner: "Sumit Dev",
            photoUrl: "IMAGE/AdobeStock_50118533_Preview.jpeg",
            valuation: "₹ 92,50,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Agricultural",
            trustScore: 95
        },
        "KH54321": {
            owner: "Amit Singh",
            photoUrl: "IMAGE/AdobeStock_124858033_Preview.jpeg",
            valuation: "₹ 1,10,00,000",
            taxStatus: "Pending: ₹ 25,000",
            disputes: "No Active Disputes",
            landUse: "Commercial",
            trustScore: 80
        },
        "KH98765": {
            owner: "Priya Sharma",
            photoUrl: "IMAGE/AdobeStock_734633730_Preview.jpeg",
            valuation: "₹ 68,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Residential",
            trustScore: 98
        },
        "KH11223": {
            owner: "Manoj Verma",
            photoUrl: "IMAGE/AdobeStock_433104561_Preview.jpeg",
            valuation: "₹ 2,50,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "2 Active Disputes: Inheritance Claim, Right of Way",
            landUse: "Mixed-Use",
            trustScore: 40
        },
        "KH69696": {
            owner: "Pihu Choudhary",
            photoUrl: "IMAGE/WhatsApp Image 2025-08-19 at 22.01.10_d9b4a0cc.jpg",
            valuation: "₹ 85,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Residential",
            trustScore: 92
        },
        "KH77889": {
            owner: "Sanjay Gupta",
            photoUrl: "IMAGE/AdobeStock_1251700813_Preview.jpeg",
            valuation: "₹ 1,50,00,000",
            taxStatus: "Pending: ₹ 78,000",
            disputes: "1 Active Dispute: Loan Default Notice",
            landUse: "Industrial",
            trustScore: 35
        },
        "KH99001": {
            owner: "Aman Mehta",
            photoUrl: "IMAGE/AdobeStock_1029439105_Preview.jpeg",
            valuation: "₹ 55,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Residential",
            trustScore: 96
        },
        "KH33445": {
            owner: "Vikram Rathore",
            photoUrl:"IMAGE/AdobeStock_1175749488_Preview.jpeg",
            valuation: "₹ 3,20,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Commercial",
            trustScore: 99
        },
        "KH66778": {
            owner: "Deepik Nair",
            photoUrl: "IMAGE/AdobeStock_792371799_Preview.jpeg",
            valuation: "₹ 95,00,000",
            taxStatus: "All Dues Cleared",
            disputes: "No Active Disputes",
            landUse: "Agricultural",
            trustScore: 94
        }
    };

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toUpperCase();
        if (!query) {
            alert('Please enter a Khasra Number / Land ID.');
            return;
        }

        searchResultsContainer.classList.remove('hidden');
        resultsContent.innerHTML = '';
        loader.classList.remove('hidden');

        setTimeout(() => {
            loader.classList.add('hidden');
            const record = landRegistryDB[query];
            if (record) {
                displayPreviewResults(record, query);
            } else {
                displayNotFound();
            }
        }, 1500);
    });

    function displayPreviewResults(record, propertyId) {
        const previewHTML = `
            <div class="result-card bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
                <img src="${record.photoUrl}" alt="Owner Photo" class="w-32 h-32 rounded-full border-4 border-green-400 mx-auto mb-4 object-cover">
                <h2 class="text-2xl font-bold text-white">${record.owner}</h2>
                <p class="text-gray-400 mb-6">Khasra Number: ${propertyId}</p>
                <button id="viewFullReportBtn" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                    View Full Report
                </button>
            </div>
        `;
        resultsContent.innerHTML = previewHTML;

        document.getElementById('viewFullReportBtn').addEventListener('click', () => {
            displayResults(record, propertyId);
        });
    }

    function getTrustScoreColor(score) {
        if (score >= 90) return 'text-green-400';
        if (score >= 70) return 'text-yellow-400';
        return 'text-red-400';
    }

    function displayResults(record, propertyId) {
        const taxStatusColor = record.taxStatus === "All Dues Cleared" ? "text-green-300" : "text-red-300";
        const taxStatusIcon = record.taxStatus === "All Dues Cleared" 
            ? `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
            : `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;

        const disputeStatusColor = record.disputes === "No Active Disputes" ? "text-green-300" : "text-red-300";
        const disputeStatusIcon = record.disputes === "No Active Disputes"
            ? `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
            : `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>`;
        
        const trustScoreColor = getTrustScoreColor(record.trustScore);

        const resultHTML = `
            <div class="result-card bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-white mb-2">Simplified Property Report</h2>
                    <p class="text-gray-400">Khasra Number: ${propertyId}</p>
                </div>
                <div class="grid md:grid-cols-3 gap-px bg-gray-700">
                    <div class="bg-gray-800 p-6 md:col-span-1">
                        <h3 class="font-semibold text-green-400 mb-4">Ownership Details</h3>
                        <div class="flex flex-col items-center text-center">
                            <img src="${record.photoUrl}" alt="Owner Photo" class="w-24 h-24 rounded-full border-4 border-green-400 mb-4 object-cover">
                            <p class="text-xl font-semibold text-white">${record.owner}</p>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6 md:col-span-2 grid grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-semibold text-green-400 mb-2">Property Valuation</h3>
                            <p><strong class="text-gray-300">Estimated Value:</strong> ${record.valuation}</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-green-400 mb-2">Land Use</h3>
                            <p><strong class="text-gray-300">${record.landUse}</strong></p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-green-400 mb-2">Trust Score</h3>
                            <p class="font-bold text-xl ${trustScoreColor}">${record.trustScore} / 100</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-green-400 mb-2">Tax Status</h3>
                            <p class="${taxStatusColor} flex items-center">${taxStatusIcon} ${record.taxStatus}</p>
                        </div>
                        <div class="col-span-2">
                            <h3 class="font-semibold text-green-400 mb-2">Disputes & Alerts</h3>
                            <p class="${disputeStatusColor} flex items-center">${disputeStatusIcon} ${record.disputes}</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-gray-900">
                    <h3 class="font-semibold text-green-400 mb-3">Simplified Summary (AI-Generated)</h3>
                    <div id="ai-summary-content" class="text-gray-400 min-h-[100px]">
                        <button id="generateSummaryBtn" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Generate AI Summary ✨
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                <h3 class="text-xl font-bold text-white mb-4">Ask a Legal Question ✨</h3>
                <div class="flex flex-col sm:flex-row gap-4">
                    <input type="text" id="legalQuestionInput" placeholder="Aapka sawal yahan likhein..." class="flex-grow bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <button id="askQuestionBtn" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Puchhein</button>
                </div>
                <div id="legal-answer-content" class="mt-4 text-gray-400 min-h-[50px] p-4 bg-gray-900 rounded-lg hidden"></div>
            </div>
        `;
        resultsContent.innerHTML = resultHTML;

        document.getElementById('generateSummaryBtn').addEventListener('click', () => generateAISummary(record, propertyId));
        document.getElementById('askQuestionBtn').addEventListener('click', () => askLegalQuestion(record));
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

    async function callGeminiAPI(prompt, maxRetries = 3) {
        const apiKey = ""; // Leave empty
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };

        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    throw new Error('Invalid response structure from Gemini API');
                }
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(res => setTimeout(res, (2 ** i) * 1000));
            }
        }
    }

    async function generateAISummary(record, propertyId) {
        const summaryContent = document.getElementById('ai-summary-content');
        summaryContent.innerHTML = '<p>Generating summary...</p>';
        
        const prompt = `Act as a property advisor in India. Based on the following land record details, write a clear, simple, and easy-to-understand summary in plain English (around 100 words). Explain the key points a potential buyer or owner should be aware of.
        - Khasra Number: ${propertyId}
        - Owner: ${record.owner}
        - Estimated Value: ${record.valuation}
        - Tax Status: ${record.taxStatus}
        - Disputes: ${record.disputes}
        - Land Use: ${record.landUse}
        - Trust Score: ${record.trustScore}/100`;

        try {
            const summary = await callGeminiAPI(prompt);
            summaryContent.innerHTML = summary.replace(/\n/g, '<br>');
        } catch (error) {
            summaryContent.innerHTML = '<p class="text-red-400">Sorry, we could not generate a summary at this time. Please try again later.</p>';
        }
    }

    async function askLegalQuestion(record) {
        const questionInput = document.getElementById('legalQuestionInput');
        const answerContent = document.getElementById('legal-answer-content');
        const userQuestion = questionInput.value;

        if (!userQuestion) {
            alert('Please type your question.');
            return;
        }

        answerContent.classList.remove('hidden');
        answerContent.innerHTML = '<p>Thinking...</p>';

        const prompt = `You are a helpful AI legal assistant for a property website in India. Based on the property details provided below, answer the user's question in simple terms. Provide general guidance only and ALWAYS include a clear disclaimer that you are not a real lawyer and the user should consult a professional for legal advice.
        - Property Details: Owner: ${record.owner}, Valuation: ${record.valuation}, Tax Status: ${record.taxStatus}, Disputes: ${record.disputes}, Land Use: ${record.landUse}, Trust Score: ${record.trustScore}/100.
        - User's Question: "${userQuestion}"`;

        try {
            const answer = await callGeminiAPI(prompt);
            answerContent.innerHTML = answer.replace(/\n/g, '<br>');
        } catch (error) {
            answerContent.innerHTML = '<p class="text-red-400">Sorry, we could not process your question at this time. Please try again later.</p>';
        }
    }
});
