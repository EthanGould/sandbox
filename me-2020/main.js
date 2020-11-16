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

module.events = () => {
    window.addEventListener('scroll', module.handleScroll);
};

module.handleScroll = ()  => {
    let scrollTopContent = module.siteIntroContent.getBoundingClientRect().top;
    let scrollTopMainContent = module.siteMainContent.getBoundingClientRect().top;

    if (scrollTopContent <= 0) {
        module.fadeContent();
    }

    if (scrollTopMainContent <= module.cardSpreadOffset) {
        module.spreadCards();
    } else {
        module.collapseCards();
    }
}

module.spreadCards = () => {
    if (!module.cards[0].classList.contains('stacked')) { return };

    module.cards.forEach(card => {
        card.classList.remove('stacked');
    });
}

module.collapseCards = () => {
    if (module.cards[0].classList.contains('stacked')) { return };

    module.cards.forEach(card => {
        card.classList.add('stacked');
    });
}

module.fadeContent = () => {
    module.siteMainContent.classList.add('fade-in');
}

window.addEventListener('load', () => {
    module.init();
});
