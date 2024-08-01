function closeModal() {
    var modal = document.getElementById('modal');
    modal.classList.remove("show");
}

function showModal() {
    var modal = document.getElementById('modal');
    modal.classList.add("show");
}

function toggleMenu() {
    document.body.classList.toggle('showMobileMenu');
}

function toggleTheme() {
    setTheme(localStorage.getItem("theme") === 'dark' ? '' : 'dark');
}

function initTheme() {
    setTheme(localStorage.getItem("theme"));
}

function initMenu() {
    const navbarMenuLinks = document.querySelectorAll('.navbar-menu ul li a');

    navbarMenuLinks.forEach(link => {
        if (getCurrentPathName() === link.href.replace(window.location.origin, '')) {
            link.classList.add('active');
        }
    })
}

function getCurrentPathName() {
    if (window.location.pathname === '/') {
        return '/index.html';
    } else {
        return window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname;
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', '');
    }
}

module.exports = {
    toggleMenu,
    toggleTheme,
    initTheme,
    closeModal,
    showModal,
    initMenu
}