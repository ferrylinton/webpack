function ready(callback) {
    if (callback && typeof callback === 'function') {
        document.addEventListener("DOMContentLoaded", function () {
            if (document.readyState === "interactive" || document.readyState === "complete") {
                return callback();
            }
        });
    }
}

function closeModal(){
    var modal = document.getElementById('modal');
    modal.classList.add("hidden");
}

function showModal(){
    var modal = document.getElementById('modal');
    modal.classList.remove("hidden");
}

function toggleMenu(el) {
    el.parentNode.classList.toggle("show");
}

function toggleTheme(el) {
    console.log('toggleTheme.....')
}

module.exports = {
    ready,
    toggleMenu,
    toggleTheme,
    closeModal,
    showModal
}