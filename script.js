document.addEventListener('DOMContentLoaded', () => {
    // Efecto de scroll en el menú con transición suave
    const menu = document.querySelector('.menu');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            menu.classList.add('scrolled');
            if (currentScroll > lastScroll) {
                menu.style.transform = 'translateY(-100%)';
            } else {
                menu.style.transform = 'translateY(0)';
            }
        } else {
            menu.classList.remove('scrolled');
            menu.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Animaciones de fade-in mejoradas
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });

    // Menú móvil con animación suave
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const menuLinks = document.querySelectorAll('.navbar a');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            menuIcon.textContent = '✕';
            navbar.style.transform = 'translateX(0)';
        } else {
            menuIcon.textContent = '☰';
            navbar.style.transform = 'translateX(-100%)';
        }
    });

    // Animación suave al hacer click en los enlaces
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            navbar.classList.remove('active');
            menuIcon.textContent = '☰';
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Cerrar menú al hacer scroll con animación
    window.addEventListener('scroll', () => {
        if(navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.textContent = '☰';
            navbar.style.transform = 'translateX(-100%)';
        }
    });
});
