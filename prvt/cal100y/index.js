function generateCalendar() {
    const startYear = parseInt(document.getElementById('startYear').value);
    const endYear = parseInt(document.getElementById('endYear').value);
    const calendar = document.getElementById('calendar');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
    
    calendar.innerHTML = '';

    for (let year = startYear; year <= endYear; year++) {
        const yearDiv = document.createElement('div');
        yearDiv.className = 'year';
        
        for (let month = 0; month < 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = `month row-${Math.floor(month / 6) % 2 === 0 ? 'even' : 'odd'}`;
            
            const monthTitle = document.createElement('div');
            monthTitle.className = 'month-title';
            monthTitle.textContent = `${year}.${String(month + 1).padStart(2, '0')}`;
            monthDiv.appendChild(monthTitle);

            const table = document.createElement('table');
            const headerRow = table.insertRow();
            '일월화수목금토'.split('').forEach(day => {
                const th = document.createElement('th');
                th.textContent = day;
                headerRow.appendChild(th);
            });

            const date = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0).getDate();

            let dayOfWeek = date.getDay();
            let currentRow = table.insertRow();
            
            for (let i = 0; i < dayOfWeek; i++) {
                currentRow.insertCell();
            }

            for (let day = 1; day <= lastDay; day++) {
                if (dayOfWeek === 0 && day !== 1) {
                    currentRow = table.insertRow();
                }

                const cell = currentRow.insertCell();
                cell.textContent = day;

                const currentDate = new Date(year, month, day);
                if (currentDate.getTime() === today.getTime()) {
                    cell.className = 'today';
                } else if (currentDate < today) {
                    cell.className = 'past';
                }

                if (dayOfWeek === 6) {
                    cell.classList.add('saturday');
                } else if (dayOfWeek === 0) {
                    cell.classList.add('sunday');
                }

                dayOfWeek = (dayOfWeek + 1) % 7;
            }

            monthDiv.appendChild(table);
            yearDiv.appendChild(monthDiv);
        }

        calendar.appendChild(yearDiv);
    }
}

// 페이지 로드 시 기본 달력 생성
window.onload = function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('startYear').value = currentYear;
    document.getElementById('endYear').value = currentYear + 9; // 10년치 달력 기본 설정
    generateCalendar();
};