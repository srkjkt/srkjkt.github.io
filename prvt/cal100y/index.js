let memos = {};
let currentDate = '';

function generateCalendar() {
    const startYear = parseInt(document.getElementById('startYear').value);
    const endYear = parseInt(document.getElementById('endYear').value);
    const calendar = document.getElementById('calendar');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    
    calendar.innerHTML = '';

    for (let year = startYear; year <= endYear; year++) {
        const yearDiv = document.createElement('div');
        yearDiv.className = 'year';
        if (year < currentYear) {
            yearDiv.classList.add('past-year');
        }
        if (year === currentYear) {
            yearDiv.classList.add('current-year');
        }
        
        const yearTitle = document.createElement('div');
        yearTitle.className = 'year-title';
        yearTitle.textContent = year;
        yearDiv.appendChild(yearTitle);

        let monthsContainer = document.createElement('div');
        monthsContainer.className = 'months-container';

        for (let month = 0; month < 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';
            
            const monthTitle = document.createElement('div');
            monthTitle.className = `month-title month-${month + 1}`;
            monthTitle.textContent = `${String(month + 1).padStart(2, '0')}`;
            monthDiv.appendChild(monthTitle);

            const dateGrid = document.createElement('div');
            dateGrid.className = 'date-grid';

            const date = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0).getDate();

            let dayOfWeek = date.getDay();
            
            for (let i = 0; i < dayOfWeek; i++) {
                const emptyBox = document.createElement('div');
                emptyBox.className = 'date-box empty';
                dateGrid.appendChild(emptyBox);
            }

            for (let day = 1; day <= lastDay; day++) {
                const dateBox = document.createElement('div');
                dateBox.className = 'date-box';
                dateBox.textContent = day;

                const currentDate = new Date(year, month, day);
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                dateBox.dataset.date = dateString;

                if (currentDate.getTime() === today.getTime()) {
                    dateBox.classList.add('today');
                } else if (currentDate < today) {
                    dateBox.classList.add('past');
                }

                if (dayOfWeek === 6) {
                    dateBox.classList.add('saturday');
                } else if (dayOfWeek === 0) {
                    dateBox.classList.add('sunday');
                }

                if (memos[dateString]) {
                    dateBox.classList.add('has-memo');
                }

                dateBox.addEventListener('click', () => openMemoPopup(dateString));

                dateGrid.appendChild(dateBox);
                dayOfWeek = (dayOfWeek + 1) % 7;
            }

            monthDiv.appendChild(dateGrid);
            monthsContainer.appendChild(monthDiv);

            if (year === currentYear && month === 5) {
                yearDiv.appendChild(monthsContainer);
                monthsContainer = document.createElement('div');
                monthsContainer.className = 'months-container';
            }
        }

        yearDiv.appendChild(monthsContainer);
        calendar.appendChild(yearDiv);
    }
}

function openMemoPopup(date) {
    currentDate = date;
    document.getElementById('memo-date').textContent = `${date} 메모`;
    const memoText = memos[date] || '';
    document.getElementById('memo-text').value = memoText;
    document.getElementById('memo-popup').style.display = 'block';
    document.getElementById('memo-overlay').style.display = 'block';
    
    // 삭제 버튼 표시 여부 결정
    const deleteButton = document.getElementById('delete-memo');
    if (memoText.trim() !== '') {
        deleteButton.style.display = 'inline-block';
    } else {
        deleteButton.style.display = 'none';
    }
}

function closeMemoPopup() {
    document.getElementById('memo-popup').style.display = 'none';
    document.getElementById('memo-overlay').style.display = 'none';
}

function saveMemo() {
    const memoText = document.getElementById('memo-text').value;
    const dateBox = document.querySelector(`.date-box[data-date="${currentDate}"]`);
    if (dateBox) {
        if (memoText.trim() !== '') {
            memos[currentDate] = memoText;
            dateBox.classList.add('has-memo');
        } else {
            delete memos[currentDate];
            dateBox.classList.remove('has-memo');
        }
    }
    closeMemoPopup();
}

function deleteMemo() {
    const dateBox = document.querySelector(`.date-box[data-date="${currentDate}"]`);
    if (dateBox) {
        delete memos[currentDate];
        dateBox.classList.remove('has-memo');
    }
    closeMemoPopup();
}

function saveMemos() {
    const memosJson = JSON.stringify(memos);
    const blob = new Blob([memosJson], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'life_calendar_memos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openLoadPopup() {
    document.getElementById('load-popup').style.display = 'block';
    document.getElementById('memo-overlay').style.display = 'block';
}

function closeLoadPopup() {
    document.getElementById('load-popup').style.display = 'none';
    document.getElementById('memo-overlay').style.display = 'none';
}

function loadMemos() {
    const loadText = document.getElementById('load-text').value;
    try {
        const loadedMemos = JSON.parse(loadText);
        memos = {...memos, ...loadedMemos};
        generateCalendar();
        closeLoadPopup();
    } catch (error) {
        alert('Invalid JSON format. Please check your input.');
    }
}

window.onload = function() {
    document.getElementById('startYear').value = 1970;
    document.getElementById('endYear').value = 2050;
    generateCalendar();
};