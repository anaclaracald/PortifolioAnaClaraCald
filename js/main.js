document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('theme-dark');
        body.classList.toggle('theme-light');
        const darkMode = body.classList.contains('theme-dark');
        themeToggle.textContent = darkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    });

    menuToggle?.addEventListener('click', () => {
        body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (event) => {
        if (!menu) return;
        const target = event.target;
        const isClickInside = menu.contains(target) || menuToggle?.contains(target);
        if (!isClickInside) {
            body.classList.remove('menu-open');
        }
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!feedback) return;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = '';

        if (!name || !email || !message) {
            error = 'Preencha todos os campos antes de enviar.';
        } else if (!emailRegex.test(email)) {
            error = 'Digite um e-mail válido (ex: usuario@dominio.com).';
        }

        if (error) {
            feedback.textContent = error;
            feedback.className = 'form-feedback error';
            return;
        }

        feedback.textContent = 'Enviando...';
        feedback.className = 'form-feedback info';

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        setTimeout(() => {
            form.reset();
            feedback.textContent = 'Mensagem enviada com sucesso! 💙';
            feedback.className = 'form-feedback success';
            submitButton.disabled = false;
        }, 1200);
    });
});
