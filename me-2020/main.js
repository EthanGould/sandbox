var module = {};

module.init = () => {
    module.siteContent = document.querySelector('.section--sliced');
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
    let scrollTopContent = module.siteContent.getBoundingClientRect().top;
    let scrollTopMainContent = module.siteMainContent.getBoundingClientRect().top;

    if (scrollTopContent <= 0) {
        module.fadeContent();
    }

    if (scrollTopMainContent <= module.cardSpreadOffset) {
        module.spreadCards();
    } else {
        module.collapseCards();
    }

    module.fadeHeader();
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

module.fadeHeader = () => {
    var topScroll = module.siteContent.getBoundingClientRect().top;
    var headerheight = module.headerText.clientHeight;

    module.header.style.filter = 'brightness(' + ((topScroll / (headerheight - 100)) * 100) + '%)';
}

window.addEventListener('load', () => {
    module.init();
});
