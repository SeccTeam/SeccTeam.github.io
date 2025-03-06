// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Modal Functionality
     window.flag = "hello this is flag"
    const modal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.login-btn');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');

    loginBtn?.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Login attempted');
    });

    // Transaction Filtering
    const accountSelect = document.getElementById('accountSelect');
    const dateFilter = document.getElementById('dateFilter');
    const searchInput = document.getElementById('searchTransactions');
    const transactionList = document.querySelector('.transaction-list');
    const filterTransactions = () => {
        const searchTerm = searchInput?.value.toLowerCase();
        const account = accountSelect?.value;
        const date = dateFilter?.value;

        // Add transaction filtering logic here
        const transactions = document.querySelectorAll('.transaction-item');
        
        transactions.forEach(transaction => {
            const matchesSearch = !searchTerm || 
                transaction.textContent.toLowerCase().includes(searchTerm);
            const matchesAccount = account === 'all' || 
                transaction.dataset.account === account;
            const matchesDate = !date || 
                transaction.dataset.date === date;

            transaction.style.display = 
                matchesSearch && matchesAccount && matchesDate ? 'flex' : 'none';
        });
    };

    accountSelect?.addEventListener('change', filterTransactions);
    dateFilter?.addEventListener('change', filterTransactions);
    searchInput?.addEventListener('input', filterTransactions);

    // Account Actions
    const actionButtons = document.querySelectorAll('.account-actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent.toLowerCase();
            console.log(`${action} action triggered`);
            // Add action handling logic here
        });
    });

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .account-card').forEach(
        element => observer.observe(element)
    );

    // Balance Animation
    const animateBalance = (element) => {
        const target = parseFloat(element.dataset.balance);
        const duration = 1000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current = Math.min(current + step, target);
            element.textContent = `$${current.toFixed(2)}`;

            if (current < target) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    document.querySelectorAll('.balance').forEach(balance => {
        if (balance.dataset.balance) {
            animateBalance(balance);
        }
    });

    // Responsive Navigation
    const createMobileNav = () => {
        const nav = document.querySelector('nav ul');
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '☰';
        
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
        });

        document.querySelector('nav').prepend(hamburger);
    };

    if (window.innerWidth <= 768) {
        createMobileNav();
    }


    // Error Handling
    const handleError = (error) => {
        console.error('An error occurred:', error);
        // Add error notification logic here
    };

    window.addEventListener('error', handleError);
});