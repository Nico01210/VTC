/**
 * Menu Burger pour écrans mobiles et tablettes
 * Gestion de l'ouverture/fermeture du menu mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Créer le bouton hamburger dynamiquement
    function createHamburgerButton() {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.id = 'hamburger-menu';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        return hamburger;
    }

    // Initialiser le menu burger
    function initBurgerMenu() {
        const navbar = document.querySelector('.navbar-container');
        const menu = document.querySelector('.navbar-menu');
        
        if (!navbar || !menu) {
            console.warn('Navbar ou menu non trouvé');
            return;
        }

        // Ajouter le bouton hamburger s'il n'existe pas déjà
        let hamburger = document.getElementById('hamburger-menu');
        if (!hamburger) {
            hamburger = createHamburgerButton();
            // Insérer le bouton avant le menu
            navbar.insertBefore(hamburger, menu);
        }

        // Gérer le clic sur le bouton hamburger
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && menu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Fermer le menu sur redimensionnement d'écran
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && menu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Fermer le menu lors du clic sur un lien
        const menuLinks = menu.querySelectorAll('.navbar-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    closeMenu();
                }
            });
        });
    }

    // Ouvrir/fermer le menu
    function toggleMenu() {
        const menu = document.querySelector('.navbar-menu');
        const hamburger = document.getElementById('hamburger-menu');
        
        menu.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        if (menu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Fermer le menu
    function closeMenu() {
        const menu = document.querySelector('.navbar-menu');
        const hamburger = document.getElementById('hamburger-menu');
        
        menu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Initialiser le menu burger
    initBurgerMenu();
});