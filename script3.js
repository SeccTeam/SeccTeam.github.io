// User database simulation
const users = [
    { username: 'user1', password: 'password123', isAdmin: false, flag: '' },
    { username: 'user2', password: 'password456', isAdmin: false, flag: '' },
    { username: 'user3', password: 'password789', isAdmin: false, flag: '' },
    { username: 'admin', password: 'supersecret123!', isAdmin: true, flag: 'CTF{SQL_passbypass_M4st3r_2024}' }
];

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Show modal
    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();
        loginMessage.style.display = 'none';
    });

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            loginForm.reset();
            loginMessage.style.display = 'none';
        }
    });

    // Function to check if input is a valid SQL injection
    function getSubstringBeforeQuote(s) {
        // Find the index of the first occurrence of the single quote
        let index = s.indexOf("'");
        
        // If the single quote is found, return the substring before it
        if (index !== -1) {
            return s.substring(0, index);
        }
        
        // If the single quote is not found, return the original string
        return s;
    }
    function extractSingleCharacter(str) {
        const match = str.match(/'([^']{1})'/);
        return match ? match[1] : null;
    }
    function isValidInjection(input) {
        // Early return for empty or very short inputs
        if (!input || input.length < 3) return false;
        let user=getSubstringBeforeQuote(input);
        // List of exact valid SQL injection payloads (case-insensitive)
        let x=extractSingleCharacter(input);
        const validPayloads = [
            // Basic SQL injections
            // "' OR '1'='1",
            // "' or '1'='1",
           
           
          
            user+"' or 1=1--",
            user+"' OR 1=1--",
            user+"' OR '1'='1",
            user+"' or '1'='1",
            user+"' OR 1=1 --",
            user+"' or 1=1 --",
            user+"' OR '"+x+"'='"+x,
            user+"' or '"+x+"'='"+x,
            // Union-based injections
            "' UNION SELECT ",
            "' union select ",
            // More variations
            "' OR 'a'='a",
            "' or 'a'='a",
            "' OR 1=1 OR '",
            "' or 1=1 or '"
        ];
        console.log(x)
        // Check for exact matches (case insensitive)
        for (const payload of validPayloads) {
            if (input===payload) {
                return true;
            }
        }
        
        // Parse input to check for valid SQL injection patterns
        // Check for comment-based injection with admin
        // if (
        //     input.toLowerCase().includes("admin'") && 
        //     (input.includes("--") || input.includes("#") || input.includes("/*"))
        // ) {
        //     return true;
        // }
        
        // Check for properly formatted OR-based injections
        // These check for the complete pattern that would work in real SQL
        // const validOrPattern1 = /' OR\s+['"\d\w]+\s*=\s*['"\d\w]+/i;  // ' OR 'x'='x pattern
        // const validOrPattern2 = /' or\s+['"\d\w]+\s*=\s*['"\d\w]+/i;  // ' or 'x'='x pattern
        
        // if (validOrPattern1.test(input) || validOrPattern2.test(input)) {
        //     // Further validate that the expression would evaluate to true
        //     // Check if the values on both sides of the = are the same
        //     const matches = input.match(/['"]([^'"]*)['"]\s*=\s*['"]([^'"]*)['"]/i);
        //     if (matches && matches.length >= 3) {
        //         if (matches[1] === matches[2]) {
        //             return true;
        //         }
        //     }
            
        //     // Also check for numeric equality that evaluates to true
        //     const numMatches = input.match(/(\d+)\s*=\s*(\d+)/);
        //     if (numMatches && numMatches.length >= 3) {
        //         if (numMatches[1] === numMatches[2]) {
        //             return true;
        //         }
        //     }
        // }
        
        return false;
    }

    // Vulnerable login validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Construct the query (for demonstration purposes)
        let loginQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
        console.log("Query:", loginQuery);
        
        let isValidLogin = false;
        let isAdmin = false;
        let foundFlag = '';

        // Check for normal login first
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            isValidLogin = true;
            isAdmin = user.isAdmin;
            foundFlag = user.flag;
            console.log("Normal login successful");
        }
        // Check for valid SQL injection attacks
        else if (username==='admin' && isValidInjection(password)) {
            isValidLogin = true;
            isAdmin = true;
            foundFlag = users.find(user => user.isAdmin).flag;
            console.log("SQL injection successful with: ", 
                isValidInjection(username) ? `Username: ${username}` : `Password: ${password}`);
        }
        // Log failed attempts
        else {
            console.log("Login failed. No valid SQL injection detected.");
            console.log("Username tried:", username);
            console.log("Password tried:", password);
        }

        // Display result
        loginMessage.style.display = 'block';
        if (isValidLogin) {
            if (isAdmin) {
                loginMessage.textContent = `Congratulations! Here's your flag: ${foundFlag}`;
                loginMessage.className = 'login-message success';
            } else {
                loginMessage.textContent = 'Logged in successfully as regular user';
                loginMessage.className = 'login-message success';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    loginForm.reset();
                    loginMessage.style.display = 'none';
                }, 2000);
            }
        } else {
            loginMessage.textContent = 'Invalid credentials';
            loginMessage.className = 'login-message error';
        }
    });

    // Input animations
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});
