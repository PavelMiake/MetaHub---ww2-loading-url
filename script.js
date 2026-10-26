const backgroundImages = [
    'bg/bg1.png',
    'bg/bg2.png',
    'bg/bg3.png',
    'bg/bg4.png',
    'bg/bg5.png'
];

const slideInterval = 7000;
let currentSlide = 0;
let slideElements = [];

const quotes = [
    { author: "Джордж Паттон", text: "«Цель войны не в том, чтобы умереть за свою страну, а в том, чтобы заставить другого ублюдка умереть за его.»" },
    { author: "Иосиф Сталин", text: "«Ни шагу назад! Таким теперь должен быть наш главный призыв.»" },
    { author: "Уинстон Черчилль", text: "«Если вы идете сквозь ад — идите не останавливаясь.»" },
    { author: "Эрвин Роммель", text: "«В бою побеждает тот, кто первый решает победить.»" },
    { author: "Георгий Жуков", text: "«Время не имеет власти над величием всего, что мы пережили в войну.»" },
    { author: "Альберт Эйнштейн", text: "«Я не знаю, каким оружием будет вестись третья мировая война, но четвертая — палками и камнями.»" },
    { author: "Дуайт Эйзенхауэр", text: "«План — ничто, планирование — всё.»" },
    { author: "Франклин Рузвельт", text: "«Нам нечего бояться, кроме самого страха.»" },
    { author: "Дуглас Макартур", text: "«В войне нет замены победе.»" },
    { author: "Герберт Гувер", text: "«Старики объявляют войну, а умирать идут молодые.»" },
    { author: "Исороку Ямамото", text: "«Я боюсь, что всё, что мы сделали — это разбудили спящего гиганта.»" },
    { author: "Василий Чуйков", text: "«За Волгой для нас земли нет!»" },
    { author: "Джордж Оруэлл", text: "«Самый быстрый способ закончить войну — проиграть её.»" },
    { author: "Артур Харрис", text: "«Они посеяли ветер, и теперь они пожнут бурю.»" },
    { author: "Шарль де Голль", text: "«Франция проиграла битву, но она не проиграла войну.»" },
    { author: "Константин Рокоссовский", text: "«Величайшее счастье для солдата — сознание того, что ты помог своему народу победить.»" },
    { author: "Мао Цзэдун", text: "«Винтовка рождает власть.»" },
    { author: "Уинстон Черчилль", text: "«Мне нечего вам предложить, кроме крови, тяжелого труда, слез и пота.»" }
];

let currentQuote = 0;

window.onload = function() {
    const sliderContainer = document.getElementById('background-slider');
    backgroundImages.forEach((imgSrc, index) => {
        let div = document.createElement('div');
        div.className = 'slide';
        div.style.backgroundImage = `url('${imgSrc}')`;
        if (index === 0) div.classList.add('active');
        sliderContainer.appendChild(div);
        slideElements.push(div);
    });

    if (slideElements.length > 1) {
        setInterval(changeSlide, slideInterval);
    }

    function updateQuote() {
        let chance = Math.random() * 100;

        if (chance <= 5) {
            document.getElementById("quote-author").innerText = "В.В. Путин";
            document.getElementById("quote-text").innerText = "«Если драка неизбежна — бить надо первым.»";
        } else {
            document.getElementById("quote-author").innerText = quotes[currentQuote].author;
            document.getElementById("quote-text").innerText = quotes[currentQuote].text;
            currentQuote = (currentQuote + 1) % quotes.length;
        }
    }
    
    updateQuote(); 
    setInterval(updateQuote, 8000); 

    const music = document.getElementById("bg-music");
    const gunshots = document.getElementById("bg-gunshots");

    music.volume = 0.18;
    gunshots.volume = 0.25;

    let playAttempt = setInterval(() => {
        music.play().then(() => {
            gunshots.play();
            clearInterval(playAttempt);
        }).catch(error => {
            console.log("Ожидание запуска аудио...");
        });
    }, 1000);
};

function changeSlide() {
    slideElements[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideElements.length;
    slideElements[currentSlide].classList.add('active');
}

let filesTotal = 0;
let filesNeeded = 0;

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById("map-name").innerText = mapname;
    document.getElementById("max-players").innerText = maxplayers;
}

function DownloadingFile(fileName) {
    document.getElementById("status-text").innerText = "Скачивание: " + fileName;
}

function SetFilesTotal(total) { filesTotal = total; }

function SetFilesNeeded(needed) {
    filesNeeded = needed;
    updateProgress();
}

function updateProgress() {
    if (filesTotal > 0) {
        let filesDownloaded = filesTotal - filesNeeded;
        let percentage = Math.round((filesDownloaded / filesTotal) * 100);
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        document.getElementById("percentage").innerText = percentage + "%";
        document.getElementById("progress-fill").style.width = percentage + "%";
    }
}