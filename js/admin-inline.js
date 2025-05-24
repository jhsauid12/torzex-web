document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#cardsTable tbody');
    const addCardBtn = document.getElementById('addCardBtn');
    let cards = [];

    // Загрузка карточек из localStorage
    function loadCards() {
        const stored = localStorage.getItem('cards');
        if (stored) {
            try {
                cards = JSON.parse(stored);
            } catch (e) {
                console.error('Ошибка парсинга карточек:', e);
                cards = [];
            }
        }
        renderTable();
    }

    // Сохранение карточек
    function saveCards() {
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    // Отрисовка таблицы
    function renderTable() {
        tableBody.innerHTML = '';
        cards.forEach((card, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td contenteditable="true" class="editable" data-field="image">${card.image}</td>
        <td contenteditable="true" class="editable" data-field="title">${card.title}</td>
        <td contenteditable="true" class="editable" data-field="version">${card.version}</td>
        <td>
          <select data-field="badge">
            <option value="free" ${card.badge === 'free' ? 'selected' : ''}>Бесплатно</option>
            <option value="paid" ${card.badge === 'paid' ? 'selected' : ''}>Платно</option>
          </select>
        </td>
        <td>
          <button class="action-btn save" data-index="${index}">Сохранить</button>
          <button class="action-btn delete" data-index="${index}">Удалить</button>
        </td>
      `;
            tableBody.appendChild(tr);
        });
    }

    // Добавление новой пустой карточки
    addCardBtn.addEventListener('click', function () {
        const newCard = {
            image: 'assets/your-image.jpg',
            title: 'Новое имя',
            version: '',
            badge: 'free'
        };
        cards.push(newCard);
        renderTable();
    });

    // Обработка кликов по кнопкам сохранения и удаления
    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('save')) {
            const index = e.target.getAttribute('data-index');
            const row = e.target.closest('tr');
            // Считываем значения из ячеек
            const image = row.querySelector('[data-field="image"]').textContent.trim();
            const title = row.querySelector('[data-field="title"]').textContent.trim();
            const version = row.querySelector('[data-field="version"]').textContent.trim();
            const badge = row.querySelector('select[data-field="badge"]').value;
            cards[index] = { image, title, version, badge };
            saveCards();
            alert('Данные сохранены!');
            renderTable();
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            if (confirm('Вы действительно хотите удалить эту карточку?')) {
                cards.splice(index, 1);
                saveCards();
                renderTable();
            }
        }
    });

    loadCards();
});
