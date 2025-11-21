document.addEventListener('DOMContentLoaded', function() {
    console.log('Perfil de Estudiante cargado');

    // Smooth scroll para los enlaces del menú
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Remover active de todos
                    menuItems.forEach(m => m.classList.remove('active'));
                    // Agregar active al clickeado
                    this.classList.add('active');
                    
                    // Scroll suave
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // Animación de entrada para elementos
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.class-item, .history-item, .achievement');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, index * 100);
            }
        });
    };

    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});