// document.addEventListener('DOMContentLoaded', function() {
//     // Get references to the buttons
//     const getStartedBtn = document.querySelector('.cta-btn');
//     const loginModal = document.getElementById('loginModal');
//     const closeBtn = document.querySelector('.close-btn');

//     // Show login modal when "Get Started" is clicked
//     getStartedBtn.addEventListener('click', function() {
//         loginModal.style.display = 'block';
//     });

//     // Close modal when close button is clicked
//     closeBtn.addEventListener('click', function() {
//         loginModal.style.display = 'none';
//     });

//     // Close modal if user clicks outside of it
//     window.addEventListener('click', function(event) {
//         if (event.target === loginModal) {
//             loginModal.style.display = 'none';
//         }
//     });

//     // Handle login form submission
//     const loginForm = document.getElementById('loginForm');
//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const loginMessage = document.getElementById('loginMessage');

//         // Basic client-side validation
//         if (username && password) {
//             loginMessage.textContent = 'Login successful!';
//             loginMessage.style.color = 'green';
//             // Here you would typically send the login data to a server
//         } else {
//             loginMessage.textContent = 'Please enter username and password';
//             loginMessage.style.color = 'red';
//         }
//     });
// });
window.flag = "Yay! you can JavaScript, This is part two of your flag: jBgQnc8OS6"

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully'); // Debugging log

    // Get all modal-related elements
    const getStartedBtn = document.querySelector('.cta-btn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');
    const loginCloseBtns = document.querySelectorAll('#loginModal .close-btn');
    const signupCloseBtns = document.querySelectorAll('#signupModal .close-btn');

    // Function to show signup modal
    function showSignupModal(event) {
        if (event) event.preventDefault();
        console.log('Attempting to show signup modal'); // Debugging log
        if (signupModal) {
            signupModal.style.display = 'block';
            loginModal.style.display = 'none';
        } else {
            console.error('Signup modal not found'); // Error logging
        }
    }

    // Function to show login modal
    function showLoginModal(event) {
        if (event) event.preventDefault();
        console.log('Attempting to show login modal'); // Debugging log
        if (loginModal) {
            loginModal.style.display = 'block';
            signupModal.style.display = 'none';
        } else {
            console.error('Login modal not found'); // Error logging
        }
    }

    // Add event listeners with console logging
    function addModalEventListeners() {
        console.log('Adding modal event listeners'); // Debugging log

        // Get Started button to signup modal
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', showSignupModal);
            console.log('Get Started button listener added');
        } else {
            console.error('Get Started button not found');
        }

        // Signup link in login modal
        if (signupLink) {
            signupLink.addEventListener('click', function(event) {
                console.log('Signup link clicked'); // Debugging log
                showSignupModal(event);
            });
        } else {
            console.error('Signup link not found');
        }

        // Login link in signup modal
        if (loginLink) {
            loginLink.addEventListener('click', showLoginModal);
        } else {
            console.error('Login link not found');
        }

        // Close buttons for both modals
        loginCloseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                loginModal.style.display = 'none';
            });
        });

        signupCloseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                signupModal.style.display = 'none';
            });
        });

        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (event.target === signupModal) {
                signupModal.style.display = 'none';
            }
        });
    }

    // Call the function to add event listeners
    addModalEventListeners();

    // Form submission handlers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const loginMessage = document.getElementById('loginMessage');
            loginMessage.textContent = 'Login attempted';
            loginMessage.style.display = 'block';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const signupMessage = document.getElementById('signupMessage');
            signupMessage.textContent = 'Signup attempted';
            signupMessage.style.display = 'block';
        });
    }

    console.log('Modal script initialization complete'); // Final debugging log
});

