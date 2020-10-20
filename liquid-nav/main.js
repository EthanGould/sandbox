var liquidNav = {};

liquidNav.newInit = () => {
    liquidNav.newNavItems = Array.from(document.querySelectorAll('.js-nav-item'));
    liquidNav.newNavList = document.querySelector('.js-nav-list');
    liquidNav.indicator = document.querySelector('.js-slider');
    liquidNav.indicatorEdges = Array.from(document.querySelectorAll('.js-slider span'));
    liquidNav.body = document.querySelector('body');

    liquidNav.newNavItems.map((item) => {
        item.addEventListener('mouseenter', liquidNav.newSetIndicator);
        item.addEventListener('focus', liquidNav.newSetIndicator);
    });
    
    // Set the intial state
    liquidNav.newNavItems[0].dispatchEvent(new Event('mouseenter'));
}

liquidNav.newSetIndicator = (event) => {
    liquidNav.newNavList.dataset.position = liquidNav.newNavItems.indexOf(event.target);
    liquidNav.newUpdateColorScheme(event.target);
}

liquidNav.newUpdateColorScheme = (target) => {
    liquidNav.body.style.background = target.dataset.color;
    liquidNav.indicator.style.background = target.dataset.color;
    liquidNav.indicatorEdges.map((el) => {
        el.style.borderColor = target.dataset.color
    });
}

window.addEventListener('load', liquidNav.newInit);
