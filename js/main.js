const langToggle = document.getElementById('lang-toggle');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    langToggle.textContent = currentLang === 'en' ? '🌐 EN' : '🌐 RU';
    loadLanguage(currentLang);
});

async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    document.getElementById('site-title').textContent = data.title;
    document.getElementById('site-description').textContent = data.description;
}
