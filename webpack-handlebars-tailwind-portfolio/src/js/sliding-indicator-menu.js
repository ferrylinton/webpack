export class SlidingIndicatorMenu {

    toggleMenuButton;

    navbarLinks;

    navbarLinksItem;

    navbarLinksOverlay;

    constructor() {

        this.toggleMenuButton = document.getElementById('toggleMenuButton');

        this.navbarLinks = document.querySelector(".navbar-links");

        this.navbarLinksItem = document.querySelectorAll(".navbar-links a");

        this.navbarLinksOverlay = document.querySelector('.navbar-links .overlay');

        this.initPageObserver();

        this.toggleMenuButton.addEventListener('click', () => {
            this.toggleMenu();
        });

        window.addEventListener('resize', () => {
            this.setNavbarLinksOverlay();
        });

        this.navbarLinksItem.forEach((link) => {
            link.addEventListener('click', () => {
                this.toggleMenu();
            });
        });
    }

    static init() {
        new this();
    }

    toggleMenu() {
        document.body.classList.toggle('showMobileMenu');
        this.setNavbarLinksOverlay();
    }

    setNavbarLinksOverlay = () => {
        let link = document.querySelector(".navbar-links .active");
        if (link) {
            this.navbarLinksOverlay.style.left = link.offsetLeft + 'px';
            this.navbarLinksOverlay.style.top = link.offsetTop + 'px';
            this.navbarLinksOverlay.style.height = link.offsetHeight + 'px';
            this.navbarLinksOverlay.style.width = link.offsetWidth + 'px';
        }
    }

    initPageObserver = () => {
        document.querySelectorAll('.page').forEach((page) => {
            if (page) {
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0]['isIntersecting'] === true && entries[0]['intersectionRatio'] > 0.52) {
                        this.navbarLinksItem.forEach(link => {
                            if (link.href && link.href.endsWith(`#${entries[0].target.id}`)) {
                                parent.location.hash = entries[0].target.id;

                                this.resetActiveLink();
                                link.classList.add("active");
                                this.setNavbarLinksOverlay();
                            }
                        })
                    }
                }, { threshold: 0.52 });

                observer.observe(page);
            }
        })
    }

    resetActiveLink = () => {
        this.navbarLinksItem.forEach(item => {
            item.classList.remove("active");
        })
    }


    handleLinkMenu = (link) => {
        this.resetActiveLink();
        this.setNavbarLinksOverlay();
    }

}