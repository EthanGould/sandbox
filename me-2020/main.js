var module = {};

module.init = () => {
    module.siteIntroContent = document.querySelector('.js-intro-section');
    module.siteMainContent = document.querySelector('.js-main-content');
    module.cards = document.querySelectorAll('.js-card');
    module.header = document.querySelector('.js-header');
    module.headerText = document.querySelector('.js-header-text');
    module.cardSpreadOffset = 550;

    module.events();
}

module.debounce = (func, wait, immediate) => {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

module.throttle = (fn, wait) => {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

module.events = () => {
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    
    console.log('boop');
    window.addEventListener('scroll', module.handleScroll);
};

module.handleScroll = module.throttle(()  => {
    console.log('runing');
    let scrollTopContent = module.siteIntroContent.getBoundingClientRect().top;
    let scrollTopMainContent = module.siteMainContent.getBoundingClientRect().top;

    if (scrollTopContent <= 200) {
        module.fadeContent();
    }

    if (scrollTopMainContent <= module.cardSpreadOffset) {
        module.spreadCards();
    } else {
        module.collapseCards();
    }
}, 100);

module.spreadCards = () => {
    if (!module.cards[0].classList.contains('stacked')) { return };
    module.cards.forEach(card => card.classList.remove('stacked'));
}

module.collapseCards = () => {
    if (module.cards[0].classList.contains('stacked')) { return };

    module.cards.forEach(card => card.classList.add('stacked'));
}

module.fadeContent = () => {
    module.siteMainContent.classList.add('fade-in');
}

window.addEventListener('load', () => {
    module.init();
});
