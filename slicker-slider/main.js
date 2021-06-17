const SS = {}

SS.init = (conf) => {
    SS.conf = conf;
    SS.container = document.querySelector(SS.conf.el);
    SS.slides = document.querySelectorAll(`${SS.conf.el} > ul > li`);
    SS.slideList = document.querySelector(`${SS.conf.el} > ul`);
    SS.currentSlide = 0;

    if (SS.container) {
        SS.generateNav();
        SS.layout();
    }
}

SS.layout = () => {
    const slideWidth = `${SS.container.clientWidth / SS.conf.visibleSlideCount}px`;
    SS.slides.forEach(s => s.style.width = slideWidth);
    SS.slideList.classList.add('ss');

    if (SS.conf.autoplay) {
        SS.autoplay();
    }
}

SS.gotoSlide = (e) => {
    const slide = SS.slides[e.target.dataset.slide];
    slide.scrollIntoView({behavior: 'smooth'});
    SS.currentSlide = parseInt(e.target.dataset.slide, 10);
}

SS.autoplay = () => {
    // exit if pause button was clicked
    if (!SS.conf.autoplay) { return }

    SS.interval = setInterval(() => {
        // Get next slide, or go back to the first slide
        SS.currentSlide = SS.slides[SS.currentSlide + 1] ? SS.currentSlide + 1 : 0;
        SS.slides[SS.currentSlide].scrollIntoView({behavior: 'smooth'});
    }, SS.conf.interval || 5000);
}

SS.generateNav = () => {
    const type = SS.conf.dotNavigation ? 'button' : 'a';
    const dots = SS.generateDots(type);

    if (SS.conf.autoplay) {
        SS.playPause = SS.generateAutoplay();
        SS.container.appendChild(SS.playPause);
    }

    SS.container.appendChild(dots);
    SS.dots = document.querySelectorAll(`.ss__dots ${type}`);

    // Setup event handlers after all dynamic slider elements are created
    SS.eventHandlers();

    // development only 
    window.slider = { container: SS.container, slides: SS.slides, dots: SS.dots, configs: config };
    // end development only
}

SS.generateAutoplay = () => {
    const autoplayToggle = document.createElement('button');
    autoplayToggle.classList.add('ss__play');
    autoplayToggle.innerText = 'Pause';

    return autoplayToggle;
}

SS.generateDots = (type) => {
    let dots = document.createElement('ul');
    dots.classList.add('ss__dots');

    SS.slides.forEach((s, i) => {
        let dot = document.createElement('li');
        let indicator = document.createElement('a');
        let altText = s.firstElementChild.getAttribute('alt');

        if (SS.conf.dotNavigation) {
            indicator = document.createElement(type);
            indicator.setAttribute('aria-label', `Goto slide ${i+1}, ${altText}`);
        }

        indicator.dataset.slide = i;
        indicator.classList.add('ss__dot');

        if (i == 0) {
            indicator.classList.add('current');
        }

        dot.appendChild(indicator);
        dots.appendChild(dot);
    });

    return dots;
}

SS.toggleAutoplay = () => {
    SS.conf.autoplay = !SS.conf.autoplay;
    SS.playPause.innerText = SS.conf.autoplay ? 'Pause' : 'Play';

    if (!SS.conf.autoplay) {
        clearInterval(SS.interval); // Clear current autoplay
    } else {
        SS.autoplay(); // Begin a new autoplay
    }
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

    if (SS.conf.autoplay) {
        SS.playPause.addEventListener('click', SS.toggleAutoplay);
    }

    if (SS.conf.dotNavigation) {
        SS.dots.forEach(d => d.addEventListener('click', SS.gotoSlide));
    }
}

const config = {
    el: '.ss__bound',
    dotNavigation: true,
    visibleSlideCount: 1
}

/*
======= OPTIONS =========
el: string - selector
dotNavigation: bool
autoplay: bool
interval: int (ms)
visibleSlideCount: float
==========================
*/

SS.init(config);

