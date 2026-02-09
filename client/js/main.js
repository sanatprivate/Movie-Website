const API_URL = 'https://movie-websitee-o4mb.onrender.com/api';



const getUser = () => {
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
};



const setUser = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
};



const removeUser = () => {
    localStorage.removeItem('userInfo');
};



const updateNavbar = () => {
    const user = getUser();
    const navLinks = document.getElementById('nav-links');

    if (!navLinks) return;

    if (user) {
        let adminLink = user.role === 'admin' ? `<li><a href="admin.html">Admin</a></li>` : '';
        navLinks.innerHTML = `
            <li><a href="index.html">Movies</a></li>
            <li><a href="profile.html">Profile</a></li>
            ${adminLink}
            <li><button onclick="logoutHandler()" class="btn btn-sm">Logout</button></li>
        `;
    } else {
        navLinks.innerHTML = `
            <li><a href="index.html">Movies</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html" class="btn btn-sm">Register</a></li>
        `;
    }
};

const logoutHandler = () => {
    removeUser();
    window.location.href = 'login.html';
};



const apiFetch = async (endpoint, options = {}) => {
    const user = getUser();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};



document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});
