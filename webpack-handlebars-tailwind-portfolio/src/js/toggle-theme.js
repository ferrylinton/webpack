export class ToggleTheme {

    toggleThemeButton;


    constructor() {
        this.toggleThemeButton = document.getElementById('toggleThemeButton');

        this.toggleThemeButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        this.setTheme(localStorage.getItem("theme"));
    }

    static init() {
        new this();
    }

    toggleTheme() {
        this.setTheme(localStorage.getItem("theme") === 'dark' ? '' : 'dark');
    }
    
    setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', '');
        }
    }

}