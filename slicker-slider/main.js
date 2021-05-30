const SS = {}

SS.init = (conf) => {
    SS.conf = conf;
    SS.container = document.querySelector(SS.conf.el);
    SS.slides = document.querySelectorAll(`${SS.conf.el} > ul > li`);
    SS.slideList = document.querySelector(`${SS.conf.el} > ul`);

    if (SS.container) {
        SS.eventHandlers();
        SS.layout();
        SS.generateDots();
    }
}

SS.layout = () => {
    const slideWidth = `${SS.container.clientWidth / SS.conf.visibleSlideCount}px`;
    SS.slides.forEach(s => s.style.width = slideWidth);
    SS.slideList.classList.add('ss');
}

SS.generateDots = () => {
    let dots = document.createElement('ul');
    dots.classList.add('ss__dots');
    SS.slides.forEach((s, i) => {
        let dot = document.createElement('li');
        let link = document.createElement('a');

        dot.dataset.slide = i;
        link.classList.add('ss__dot');

        if (i == 0) {
            link.classList.add('current');
        }

        dot.appendChild(link);
        dots.appendChild(dot);
    });
    SS.container.appendChild(dots);
    SS.dots = document.querySelectorAll('.ss__dots a');

    // development only 
    window.slider = { container: SS.container, slides: SS.slides, dots: SS.dots, configs: config };
    // end development only
}

SS.setSlideDot = () => {
    SS.dots.forEach((dot) => { dot.classList.remove('current') })
    let slideWidth = SS.container.clientWidth / SS.conf.visibleSlideCount;
    let scrollPositon = SS.slideList.scrollLeft;
    let currentSlide = Math.ceil(scrollPositon / slideWidth);
    SS.dots[currentSlide].classList.add('current');
}

SS.eventHandlers = () => {
    window.addEventListener('resize', SS.layout);
    SS.slideList.addEventListener('scroll', SS.setSlideDot);
}

let config = {
    el: '.ss__bound',
    visibleSlideCount: 1.25
}

SS.init(config);