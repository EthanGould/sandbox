var module = {};

module.init = () => {
    module.siteContent = document.querySelector('.section--sliced');
    module.siteMainContent = document.querySelector('.js-main-content');
    module.events();
}

module.events = () => {
    window.addEventListener('scroll', module.handleScroll);
};

module.handleScroll = ()  =>{
    if (module.siteContent.getBoundingClientRect().top <= 0) {
        module.fadeContent();
    }
}

module.fadeContent = () => {
    module.siteMainContent.classList.add('fade-in');
}

window.addEventListener('load', () => {
    module.init();
});
