// Smart Campus Lost & Found - Main Script (Static Frontend Prototype with LocalStorage & Smart Matching)

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const reportsGrid = document.getElementById('reports-grid');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const filterType = document.getElementById('filter-type');
    const filterCategory = document.getElementById('filter-category');
    const filterStatus = document.getElementById('filter-status');
    const resultsCount = document.getElementById('results-count');

    // Stats Elements
    const statTotal = document.getElementById('stat-total');
    const statLost = document.getElementById('stat-lost');
    const statFound = document.getElementById('stat-found');
    const statRecovered = document.getElementById('stat-recovered');

    // Modal Elements
    const reportModal = document.getElementById('report-modal');
    const openReportModalBtn = document.getElementById('open-report-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const reportForm = document.getElementById('report-form');

    const loadDemoBtn = document.getElementById('load-demo-btn');
    const resetDemoBtn = document.getElementById('reset-demo-btn');

    // Match Modal Elements
    const matchModal = document.getElementById('match-modal');
    const closeMatchModalBtn = document.getElementById('close-match-modal');
    const matchModalTitle = document.getElementById('match-modal-title');
    const matchModalBody = document.getElementById('match-modal-body');

    // 20 Realistic Sample Reports (10 LOST, 10 FOUND pairs with 100% relevant, matching item photos)
    const demoReports = [
        // --- MATCH PAIR 1 (Calculator - Electronics) ---
        {
            id: 'demo-lost-1',
            reportType: 'LOST',
            itemName: 'Black Casio Scientific Calculator',
            category: 'Electronics',
            color: 'Black',
            date: '2025-10-14',
            location: 'College Library 2nd Floor',
            description: 'Black scientific calculator with a slightly scratched cover, initials J.M. on back battery door.',
            contactInfo: 'john.miller@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1757256137041-0aab889db199?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-14T09:30:00.000Z'
        },
        {
            id: 'demo-found-1',
            reportType: 'FOUND',
            itemName: 'Casio Scientific Calculator',
            category: 'Electronics',
            color: 'Black',
            date: '2025-10-14',
            location: 'Near the Library Entrance Desk',
            description: 'Black scientific calculator found on study table with scratched cover.',
            contactInfo: 'lib.staff@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-14T11:00:00.000Z'
        },




        // --- MATCH PAIR 3 (Smartphone - Electronics) ---
        {
            id: 'demo-lost-3',
            reportType: 'LOST',
            itemName: 'Space Black iPhone 14 Pro',
            category: 'Electronics',
            color: 'Black',
            date: '2025-10-15',
            location: 'Science Building Corridor',
            description: 'iPhone in transparent silicone case with cracked screen protector.',
            contactInfo: 'alex.turner@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-15T08:45:00.000Z'
        },
        {
            id: 'demo-found-3',
            reportType: 'FOUND',
            itemName: 'Apple iPhone Smartphone',
            category: 'Electronics',
            color: 'Black',
            date: '2025-10-15',
            location: 'Science Building 2nd Floor Bench',
            description: 'Black smartphone in clear case left on bench.',
            contactInfo: 'science.desk@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1690090903000-aeb534185c07?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-15T10:20:00.000Z'
        },




        // --- MATCH PAIR 5 (Keys - Keys) ---

        {
            id: 'demo-found-5',
            reportType: 'FOUND',
            itemName: 'Car Keys with Red Strap',
            category: 'Keys',
            color: 'Silver / Red',
            date: '2025-10-13',
            location: 'Parking Lot B Ticket Station',
            description: 'Car key fob with red fabric strap.',
            contactInfo: 'campus.security@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1678869520133-9ceb5bee6792?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-13T13:30:00.000Z'
        },

        // --- MATCH PAIR 6 (AirPods - Electronics) ---
        {
            id: 'demo-lost-6',
            reportType: 'LOST',
            itemName: 'AirPods Pro 2nd Gen',
            category: 'Electronics',
            color: 'White',
            date: '2025-10-14',
            location: 'Computer Lab Room 304',
            description: 'White charging case with engraving on front.',
            contactInfo: 'lisa.kudrow@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-14T15:00:00.000Z'
        },
        {
            id: 'demo-found-6',
            reportType: 'FOUND',
            itemName: 'Wireless Earphones Case',
            category: 'Electronics',
            color: 'White',
            date: '2025-10-14',
            location: 'Computer Lab Desk 14',
            description: 'White wireless charging case found on desk.',
            contactInfo: 'it.helpdesk@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1511025998370-7d59f82e9c8f?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-14T16:20:00.000Z'
        },







        // --- MATCH PAIR 9 (Watch - Clothing & Accessories) ---
        {
            id: 'demo-lost-9',
            reportType: 'LOST',
            itemName: 'Casio G-Shock Watch',
            category: 'Clothing & Accessories',
            color: 'Black',
            date: '2025-10-15',
            location: 'Gymnasium Locker Room',
            description: 'Black rugged digital sports watch with resin strap.',
            contactInfo: 'joey.tribbiani@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-15T11:30:00.000Z'
        },
        {
            id: 'demo-found-9',
            reportType: 'FOUND',
            itemName: 'Digital Wristwatch',
            category: 'Clothing & Accessories',
            color: 'Black',
            date: '2025-10-15',
            location: 'Gymnasium Bench',
            description: 'Black sports watch found near lockers.',
            contactInfo: 'gym.staff@campus.edu',
            status: 'active',
            imageUrl: 'https://images.unsplash.com/photo-1630452561204-b1198e5be60d?auto=format&fit=crop&w=400&q=80',
            isDemo: true,
            createdAt: '2025-10-15T13:00:00.000Z'
        },



    ];

    // Initialize LocalStorage with the current demo reports when the stored demo set is outdated
    function getReports() {
        const stored = localStorage.getItem('campus_lost_found_reports');
        if (!stored) {
            localStorage.setItem('campus_lost_found_reports', JSON.stringify(demoReports));
            return demoReports;
        }
        try {
            const parsed = JSON.parse(stored);
            const demoCount = parsed.filter(r => r.isDemo).length;
            if (demoCount !== demoReports.length) {
                const userReports = parsed.filter(r => !r.isDemo);
                const refreshed = [...userReports, ...demoReports];
                localStorage.setItem('campus_lost_found_reports', JSON.stringify(refreshed));
                return refreshed;
            }
            return parsed;
        } catch (e) {
            console.error('Error parsing stored reports, resetting:', e);
            localStorage.setItem('campus_lost_found_reports', JSON.stringify(demoReports));
            return demoReports;
        }
    }

    function saveReports(reports) {
        localStorage.setItem('campus_lost_found_reports', JSON.stringify(reports));
    }

    // Dynamic Matching Algorithm
    function calculateMatches(targetItem) {
        const reports = getReports();
        const oppositeType = targetItem.reportType === 'LOST' ? 'FOUND' : 'LOST';
        const candidates = reports.filter(r => r.reportType === oppositeType && r.status === 'active');

        const scoredMatches = candidates.map(candidate => {
            let score = 0;
            let reasons = [];

            // 1. Category match (35 pts max)
            if (targetItem.category && candidate.category && targetItem.category.toLowerCase() === candidate.category.toLowerCase()) {
                score += 35;
                reasons.push(`Matching category (${targetItem.category})`);
            }

            // 2. Color match (25 pts max)
            if (targetItem.color && candidate.color) {
                const targetColors = targetItem.color.toLowerCase().split(/[\s/]+/);
                const candColors = candidate.color.toLowerCase().split(/[\s/]+/);
                const colorOverlap = targetColors.some(c => candColors.includes(c));
                if (colorOverlap) {
                    score += 25;
                    reasons.push(`Matching color (${candidate.color})`);
                }
            }

            // 3. Keyword / Name token overlap (25 pts max)
            const targetTokens = new Set((targetItem.itemName + ' ' + targetItem.description).toLowerCase().match(/\b\w{3,}\b/g) || []);
            const candTokens = new Set((candidate.itemName + ' ' + candidate.description).toLowerCase().match(/\b\w{3,}\b/g) || []);
            let commonTokens = 0;
            targetTokens.forEach(t => {
                if (candTokens.has(t)) commonTokens++;
            });
            if (commonTokens > 0) {
                const tokenScore = Math.min(25, commonTokens * 8);
                score += tokenScore;
                reasons.push(`Similar item descriptions/keywords (${commonTokens} keyword match)`);
            }

            // 4. Date proximity (15 pts max)
            if (targetItem.date && candidate.date) {
                const date1 = new Date(targetItem.date);
                const date2 = new Date(candidate.date);
                const diffDays = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
                if (diffDays <= 1) {
                    score += 15;
                    reasons.push(`Happened on very close dates`);
                } else if (diffDays <= 4) {
                    score += 8;
                    reasons.push(`Happened within a few days`);
                }
            }

            const finalScore = Math.min(100, score);

            return {
                candidate,
                score: finalScore,
                reasons
            };
        });

        scoredMatches.sort((a, b) => b.score - a.score);
        return scoredMatches.filter(m => m.score > 20);
    }

    // Render App & Dashboard
    function renderApp() {
        const reports = getReports();
        const searchQuery = searchInput.value.toLowerCase().trim();
        const typeFilter = filterType.value;
        const categoryFilter = filterCategory.value;
        const statusFilter = filterStatus.value;

        const filtered = reports.filter(item => {
            const matchesSearch = 
                (item.itemName && item.itemName.toLowerCase().includes(searchQuery)) ||
                (item.description && item.description.toLowerCase().includes(searchQuery)) ||
                (item.location && item.location.toLowerCase().includes(searchQuery)) ||
                (item.color && item.color.toLowerCase().includes(searchQuery));

            const matchesType = typeFilter === 'ALL' || item.reportType === typeFilter;
            const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
            const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

            return matchesSearch && matchesType && matchesCategory && matchesStatus;
        });

        filtered.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

        const totalCount = reports.length;
        const lostCount = reports.filter(i => i.reportType === 'LOST' && i.status === 'active').length;
        const foundCount = reports.filter(i => i.reportType === 'FOUND' && i.status === 'active').length;
        const recoveredCount = reports.filter(i => i.status === 'recovered').length;

        statTotal.textContent = totalCount;
        statLost.textContent = lostCount;
        statFound.textContent = foundCount;
        statRecovered.textContent = recoveredCount;

        resultsCount.textContent = `Showing ${filtered.length} of ${totalCount} items`;

        reportsGrid.innerHTML = '';
        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(item => {
                const card = createReportCard(item);
                reportsGrid.appendChild(card);
            });
        }
    }

    function createReportCard(item) {
        const card = document.createElement('div');
        card.className = 'report-card';

        const isLost = item.reportType === 'LOST';
        const isRecovered = item.status === 'recovered';

        const badgeTypeClass = isLost ? 'badge-lost' : 'badge-found';
        const badgeStatusClass = isRecovered ? 'badge-status-recovered' : 'badge-status-active';
        const statusText = isRecovered ? 'Recovered' : 'Active';

        const imageUrl = item.imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80';

        card.innerHTML = `
            <div class="card-img-container">
                <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.itemName)}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'">
                ${item.isDemo ? '<span class="demo-badge">Demo Item</span>' : ''}
            </div>
            <div class="card-header">
                <span class="badge ${badgeTypeClass}">${item.reportType}</span>
                <span class="badge ${badgeStatusClass}">${statusText}</span>
            </div>
            <div class="card-body">
                <h4 class="card-title">${escapeHtml(item.itemName)}</h4>
                <div class="card-meta">
                    <div><i class="fa-solid fa-tag"></i> ${escapeHtml(item.category)}</div>
                    <div><i class="fa-solid fa-palette"></i> ${escapeHtml(item.color)}</div>
                    <div><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</div>
                    <div><i class="fa-solid fa-calendar"></i> ${escapeHtml(item.date)}</div>
                </div>
                <p class="card-desc">${escapeHtml(item.description)}</p>
            </div>
            <div class="card-footer">
                <div class="card-footer-top">
                    <div class="contact-info">
                        <i class="fa-solid fa-envelope"></i> ${escapeHtml(item.contactInfo)}
                    </div>
                </div>
                <div class="card-footer-actions">
                    <button class="btn btn-sm btn-match find-matches-btn" data-id="${item.id}">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Find Matches
                    </button>
                    ${!isRecovered ? `
                        <button class="btn btn-outline btn-sm mark-recovered-btn" data-id="${item.id}" title="Mark as Recovered">
                            <i class="fa-solid fa-check"></i> Mark Recovered
                        </button>
                    ` : `
                        <button class="btn btn-outline btn-sm mark-active-btn" data-id="${item.id}" title="Reactivate Report">
                            <i class="fa-solid fa-rotate-left"></i> Reopen
                        </button>
                    `}
                </div>
            </div>
        `;

        const findMatchesBtn = card.querySelector('.find-matches-btn');
        findMatchesBtn.addEventListener('click', () => openMatchModal(item));

        const recoverBtn = card.querySelector('.mark-recovered-btn');
        if (recoverBtn) {
            recoverBtn.addEventListener('click', () => updateItemStatus(item.id, 'recovered'));
        }

        const reopenBtn = card.querySelector('.mark-active-btn');
        if (reopenBtn) {
            reopenBtn.addEventListener('click', () => updateItemStatus(item.id, 'active'));
        }

        return card;
    }

    function openMatchModal(item) {
        matchModalTitle.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Smart Matches for "${escapeHtml(item.itemName)}" (${item.reportType})`;
        const matches = calculateMatches(item);

        matchModalBody.innerHTML = '';
        if (matches.length === 0) {
            matchModalBody.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <h4>No strong matches found yet</h4>
                    <p>There are no active corresponding ${item.reportType === 'LOST' ? 'FOUND' : 'LOST'} reports matching this item right now.</p>
                </div>
            `;
        } else {
            matches.forEach(m => {
                const cand = m.candidate;
                const matchDiv = document.createElement('div');
                matchDiv.className = 'match-item-card';
                matchDiv.innerHTML = `
                    <div class="match-item-header">
                        <h4>${escapeHtml(cand.itemName)}</h4>
                        <span class="match-score-pill">${m.score}% Match</span>
                    </div>
                    <div class="card-meta">
                        <div><i class="fa-solid fa-tag"></i> ${escapeHtml(cand.category)}</div>
                        <div><i class="fa-solid fa-palette"></i> ${escapeHtml(cand.color)}</div>
                        <div><i class="fa-solid fa-location-dot"></i> ${escapeHtml(cand.location)}</div>
                        <div><i class="fa-solid fa-calendar"></i> ${escapeHtml(cand.date)}</div>
                    </div>
                    <p class="card-desc">${escapeHtml(cand.description)}</p>
                    <div class="match-reasons">
                        <strong>Match Reasons:</strong>
                        <ul style="margin-left: 1.25rem; margin-top: 0.25rem;">
                            ${m.reasons.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                        <span class="contact-info"><i class="fa-solid fa-envelope"></i> Contact: ${escapeHtml(cand.contactInfo)}</span>
                        <button class="btn btn-success btn-sm claim-match-btn" data-candidate-id="${cand.id}">
                            <i class="fa-solid fa-handshake"></i> Connect / Claim
                        </button>
                    </div>
                `;

                const claimBtn = matchDiv.querySelector('.claim-match-btn');
                claimBtn.addEventListener('click', () => {
                    alert(`Connection initiated! Please reach out directly to the contact person at: ${cand.contactInfo}`);
                });

                matchModalBody.appendChild(matchDiv);
            });
        }

        matchModal.classList.add('active');
    }

    function closeMatchModal() {
        matchModal.classList.remove('active');
    }

    closeMatchModalBtn.addEventListener('click', closeMatchModal);
    window.addEventListener('click', (e) => {
        if (e.target === matchModal) {
            closeMatchModal();
        }
        if (e.target === reportModal) {
            closeModal();
        }
    });

    function updateItemStatus(id, newStatus) {
        let reports = getReports();
        reports = reports.map(item => {
            if (item.id === id) {
                item.status = newStatus;
            }
            return item;
        });
        saveReports(reports);
        renderApp();
    }

    function openModal() {
        reportModal.classList.add('active');
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    function closeModal() {
        reportModal.classList.remove('active');
        reportForm.reset();
    }

    openReportModalBtn.addEventListener('click', openModal);
    closeMatchModalBtn.addEventListener('click', closeMatchModal);
    cancelModalBtn.addEventListener('click', closeModal);

    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(reportForm);
        const newReport = {
            id: 'user-item-' + Date.now(),
            reportType: formData.get('reportType'),
            itemName: formData.get('itemName').trim(),
            category: formData.get('category'),
            color: formData.get('color').trim(),
            date: formData.get('date'),
            location: formData.get('location').trim(),
            description: formData.get('description').trim(),
            contactInfo: formData.get('contactInfo').trim(),
            imageUrl: formData.get('imageUrl').trim() || '',
            status: 'active',
            isDemo: false,
            createdAt: new Date().toISOString()
        };

        if (!newReport.reportType || !newReport.itemName || !newReport.category || !newReport.color || !newReport.date || !newReport.location || !newReport.description || !newReport.contactInfo) {
            alert('Please fill in all required fields.');
            return;
        }

        const reports = getReports();
        reports.push(newReport);
        saveReports(reports);

        closeModal();
        renderApp();
    });

    loadDemoBtn.addEventListener('click', () => {
        const reports = getReports();
        const userReports = reports.filter(r => !r.isDemo);
        const refreshed = [...userReports, ...demoReports];
        saveReports(refreshed);
        renderApp();
        alert(`Successfully loaded and refreshed all ${demoReports.length} demonstration reports.`);
    });

    resetDemoBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove demo records? Your user-created reports will be preserved.')) {
            const reports = getReports();
            const userReports = reports.filter(r => !r.isDemo);
            saveReports(userReports);
            renderApp();
            alert(`Demo data removed. Preserved ${userReports.length} user report(s).`);
        }
    });

    searchInput.addEventListener('input', renderApp);
    filterType.addEventListener('change', renderApp);
    filterCategory.addEventListener('change', renderApp);
    filterStatus.addEventListener('change', renderApp);

    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Force refresh check on load and clear old cache
    localStorage.removeItem('campus_lost_found_reports');
    getReports();

    renderApp();
});
