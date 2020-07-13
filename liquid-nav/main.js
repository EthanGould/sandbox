// var liquidNav = {};

// liquidNav.eventHandlers = () => {
//     liquidNav.navItems.map((item) => {
//         // item.addEventListener('click', liquidNav.selectItem);
//         // on hover is cooler, no need for clicks
//         item.addEventListener('mouseenter', liquidNav.selectItem);
//         item.addEventListener('focus', liquidNav.selectItem);
//     });
// }

// liquidNav.selectItem = (event) => {
//     liquidNav.navItems.map((item) => {item.style.color = 'initial'});
//     event.target.classList.add('active');
//     liquidNav.moveIndicator(event.target);
//     liquidNav.updateColorScheme(event.target)
// }

// liquidNav.updateColorScheme = (target) => {
//     liquidNav.body.style.background = target.dataset.color;
//     liquidNav.indicator.style.background = target.dataset.color;
//     liquidNav.indicatorEdges.map((el) => {el.style.borderColor = target.dataset.color});
// }

// liquidNav.moveIndicator = (target) => {
//     var modifier = 0;
//     var duration = .3;

//     if (target.offsetLeft < liquidNav.currentOffset) {
//         skew = '30deg'
//         modifier;
//     } else {
//         skew = '-30deg'
//         modifier = -1;
//     }

//     // Get the differnece in offset between current item and destination item
//     var offsetDifference = liquidNav.currentOffset - target.offsetLeft;
//     // Scale the speed of the translate to unskew when it enters the destination item (This creates an easing/slow down at the finish)
//     var timeout = Math.abs((offsetDifference / liquidNav.itemWidth) * 90);
//     // How many items are traveling across
//     var distance = Math.abs(Math.floor(offsetDifference / liquidNav.itemWidth)) + modifier;

//     // If we are trveling more than 2 spaces, decrease the speed of animation
//     if (distance > 1) {
//         duration = Math.abs((offsetDifference / liquidNav.itemWidth) * .15);
//     }

//     liquidNav.currentOffset = target.offsetLeft;

//     liquidNav.indicator.style.transition = `transform ${duration}s`;
//     liquidNav.indicator.style.transform = `skew(${skew}) translateX(${target.offsetLeft}px)`;

//     // fade in the item text for smooth contrast
//     setTimeout(() => {
//         liquidNav.indicator.style.transform = `translateX(${target.offsetLeft}px)`;
//         target.style.color = 'white';
//     }, timeout);
// }

// liquidNav.init = () => {
//     liquidNav.navItems = Array.from(document.querySelectorAll('.js-nav-item'));
//     liquidNav.indicator = document.querySelector('.js-indicator');
//     liquidNav.indicatorEdges = Array.from(document.querySelectorAll('.js-indicator span'));
//     liquidNav.body = document.querySelector('body');
//     liquidNav.currentOffset = 0;
//     liquidNav.itemWidth = liquidNav.navItems[0].clientWidth;

//     liquidNav.eventHandlers();
// }

// window.addEventListener('load', liquidNav.init);

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
