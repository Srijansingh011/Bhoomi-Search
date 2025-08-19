document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const navLinks = document.querySelectorAll('#mobile-menu a, #header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    function animateStatNumbers() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.id === 'problem') {
                    animateStatNumbers();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    const chartTextColor = '#d1d5db';
    const chartGridColor = 'rgba(255, 255, 255, 0.1)';

    const marketChartCtx = document.getElementById('marketChart');
    if (marketChartCtx) {
        new Chart(marketChartCtx, {
            type: 'bar',
            data: {
                labels: ['Government Bodies', 'Real Estate Devs', 'Banks', 'Individual Owners'],
                datasets: [{
                    label: 'Target Audience %',
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#16a34a', '#22c55e', '#4ade80', '#86efac'],
                    borderColor: '#111827',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: chartGridColor },
                        ticks: { color: chartTextColor }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: chartTextColor }
                    }
                }
            }
        });
    }
    
    const businessModelChartCtx = document.getElementById('businessModelChart');
    if (businessModelChartCtx) {
        new Chart(businessModelChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Transaction Fees', 'SaaS for Governments', 'API Access'],
                datasets: [{
                    label: 'Revenue Stream',
                    data: [50, 35, 15],
                    backgroundColor: ['#16a34a', '#4ade80', '#bbf7d0'],
                    borderColor: '#1f2937',
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                   legend: {
                        position: 'bottom',
                        labels: {
                            color: chartTextColor
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});
