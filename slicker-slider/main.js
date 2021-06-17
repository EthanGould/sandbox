const SS = {}

SS.init = (conf) => {
    SS.conf = conf;
    SS.container = document.querySelector(SS.conf.el);
    SS.slides = document.querySelectorAll(`${SS.conf.el} > ul > li`);
    SS.slideList = document.querySelector(`${SS.conf.el} > ul`);

    if (SS.container) {
        SS.generateDots();
        SS.layout();
    }
}

SS.layout = () => {
    const slideWidth = `${SS.container.clientWidth / SS.conf.visibleSlideCount}px`;
    SS.slides.forEach(s => s.style.width = slideWidth);
    SS.slideList.classList.add('ss');
}

SS.gotoSlide = (e) => {
    const slide = SS.slides[e.target.dataset.slide];
    slide.scrollIntoView();
    slide.focus();
}

SS.generateDots = () => {
    let dots = document.createElement('ul');
    dots.classList.add('ss__dots');
    SS.slides.forEach((s, i) => {
        let dot = document.createElement('li');
        let indicator = document.createElement('button');
        let altText = s.firstElementChild.getAttribute('alt');

        indicator.dataset.slide = i;
        indicator.classList.add('ss__dot');
        indicator.setAttribute('aria-label', `Goto slide ${i+1}, ${altText}`);

        if (i == 0) {
            indicator.classList.add('current');
        }

        dot.appendChild(indicator);
        dots.appendChild(dot);
    });
    SS.container.appendChild(dots);
    SS.dots = document.querySelectorAll('.ss__dots button');

    // Setup event handlers after all dynamic slider elements are created
    SS.eventHandlers();

    // development only 
    window.slider = { container: SS.container, slides: SS.slides, dots: SS.dots, configs: config };
    // end development only
}

SS.setSlideDot = () => {
    SS.dots.forEach((dot) => { dot.classList.remove('current') });
    let slideWidth = SS.container.clientWidth / SS.conf.visibleSlideCount;
    let currentSlide = Math.round(SS.slideList.scrollLeft / slideWidth);
    SS.dots[currentSlide].classList.add('current');
}

SS.eventHandlers = () => {
    window.addEventListener('resize', SS.layout);
    SS.slideList.addEventListener('scroll', SS.setSlideDot); // #TODO throttle this event handler
    SS.dots.forEach(d => d.addEventListener('click', SS.gotoSlide));
}

let config = {
    el: '.ss__bound',
    visibleSlideCount: 1.25
}

SS.init(config);