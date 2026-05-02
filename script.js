function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        // Добавляем нули впереди (формат 000000)
        obj.innerHTML = value.toString().padStart(6, '0');
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Логика счетчика
window.onload = function() {
    // Получаем старое значение из памяти браузера или ставим случайное начальное
    let visits = localStorage.getItem('visitCount') || Math.floor(Math.random() * 1000);
    visits = parseInt(visits) + 1;
    
    // Сохраняем новое значение
    localStorage.setItem('visitCount', visits);

    // Запускаем анимацию от 0 до числа визитов
    animateCounter("visitor-count", 0, visits, 1500);
};