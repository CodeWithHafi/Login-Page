const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Initial users
const DEFAULT_USERS = [
    { empId: "SS25FCMG001", email: "hafijulislam1207@gmail.com", password: "#4ever@Yours", profilePage: "profile_hafijul.html" },
    { empId: "SS25MG001", email: "himangshubhagavati@gmail.com", password: "#Msdian07", profilePage: "profile_himangshu.html" },
    { empId: "SS25MMG02", email: "iitiansuman7@gmail.com", password: "emp02@2025", profilePage: "profile_suman.html" },
    { empId: "SS25SM004", email: "rishiranjanbora@gmail.com", password: "emp04@2025", profilePage: "profile_rishi.html" },
    { empId: "SS25CRE05", email: "aqilsiddiquedhahin@gmail.com", password: "emp05@2025", profilePage: "profile_dhahin.html" },
    { empId: "SS25CRE06", email: "bikashborah9858@gmail.com", password: "emp06@2025", profilePage: "profile_bikash.html" },
    { empId: "SS25CRE07", email: "affanparwez954@gmail.com", password: "emp07@2025", profilePage: "profile_affan.html" }
];

// Load users from localStorage or set defaults
function getUsers() {
    const users = localStorage.getItem('PRESET_USERS');
    return users ? JSON.parse(users) : DEFAULT_USERS.slice();
}

function setUsers(users) {
    localStorage.setItem('PRESET_USERS', JSON.stringify(users));
}

// On first load, initialize localStorage if not present
if (!localStorage.getItem('PRESET_USERS')) {
    setUsers(DEFAULT_USERS);
}

// Get login form and inputs
const loginForm = document.querySelector('.sign-in form');
const loginEmpId = document.getElementById('login-empid');
const loginPassword = document.getElementById('login-password');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(user =>
        loginEmpId.value === user.empId && loginPassword.value === user.password
    );
    if (user) {
        window.location.href = user.profilePage;
    } else {
        alert("Access Denied: Invalid Employee ID or Password.");
    }
});

// --- SIGN UP LOGIC ---

// Get signup form and inputs
const signupForm = document.querySelector('.sign-up form');
const signupEmail = signupForm.querySelector('input[placeholder="Enter E-mail"]');
const signupEmpId = signupForm.querySelector('input[placeholder="Enter Employee ID"]');
const signupPassword = signupForm.querySelectorAll('input[type="password"]')[0];
const signupConfirmPassword = signupForm.querySelectorAll('input[type="password"]')[1];

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let users = getUsers();
    // Find user by email and empId
    const userIndex = users.findIndex(
        u => u.email === signupEmail.value && u.empId === signupEmpId.value
    );

    if (userIndex === -1) {
        alert("Email is not registered or wrong Employee ID. Contact admin/manager.");
        return;
    }

    if (signupPassword.value !== signupConfirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    // Update password and save to localStorage
    users[userIndex].password = signupPassword.value;
    setUsers(users);

    alert("Password set successfully! You can now log in.");
    container.classList.remove("active");
});