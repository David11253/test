document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const underline = document.querySelector('.underline');

    const colors = [
        '#00d2ff', // Home
        '#3a86ff', // Features
        '#8338ec', // Buy
        '#a121e0', // Assets
        '#c918ab', // Addons
        '#e0115f', // Docs
        '#ff007f'  // Stats
    ];

    function updateNav(element, index) {
        if (!element || !underline) return;

        underline.style.width = `${element.offsetWidth}px`;
        underline.style.left = `${element.offsetLeft}px`;

        const selectedColor = colors[index] || colors[0];
        document.documentElement.style.setProperty('--current-accent', selectedColor);
    }

    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            // 1. Визуально активируем кнопку
            buttons.forEach(b => b.classList.remove('active-link'));
            btn.classList.add('active-link');

            updateNav(btn, index);

            pages.forEach(p => p.classList.remove('active'));
            const activePage = document.getElementById(target);
            if (activePage) {
                activePage.classList.add('active');
            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    const startBtn = document.querySelector('.nav-btn[data-target="home"]') || buttons[0];
    if (startBtn) {
        startBtn.classList.add('active-link');
        updateNav(startBtn, 0);
    }

    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-btn.active-link');
        if (active) {
            const index = Array.from(buttons).indexOf(active);
            updateNav(active, index);
        }
    });
});