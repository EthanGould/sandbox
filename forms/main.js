/////////////////////////////////////
// Theme Toggle Code
/////////////////////////////////////

const toggle = {};

toggle.init = () => {
    toggle.input = document.querySelector('.js-toggle');
    toggle.events();
}

toggle.events = () => {
    toggle.input.addEventListener('change', toggle.setTheme);
};

toggle.setTheme = e => {
    let textColor = e.target.checked ? 'white' : 'black';
    let bgColor = e.target.checked ? 'black' : 'white';
    document.body.style.setProperty('--header-color', textColor);
    document.body.style.setProperty('--bg-color', bgColor);
}

window.addEventListener('load', toggle.init);

/////////////////////////////////////
// Form Code
/////////////////////////////////////

const form = {};

form.init = () => {
    form.input = document.querySelector('.js-input');
    form.passwordReveal = document.querySelectorAll('.js-password-reveal');
    form.events();
}

form.events = () => {
    Array.from(form.passwordReveal).forEach((el) => { el.addEventListener('click', form.revealPassword) })
};

form.revealPassword = e => {
    console.log(e);
}

// window.addEventListener('load', form.init);


