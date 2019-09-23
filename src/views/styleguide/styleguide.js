/* eslint-disable no-loop-func */
// Define DOM elements
const iframe = document.getElementById('resizer');
// const logo = document.getElementById('header-logo');
const links = document.getElementsByClassName('side-menu__sub-menu__item-link');

// Define url vars
let currentUrl;
const pagesDir = 'pages/';
const pages = {
    Home: {
        title: 'home',
        link: `${pagesDir}/home.html`,
    },
    ColorPalette: {
        title: 'colorPalette',
        link: `${pagesDir}/colorPalette.html`,
    },
    Typography: {
        title: 'typography',
        link: `${pagesDir}/typography.html`,
    },
};

function LoadPage(href) {
    currentUrl = href;
    switch (href) {
    case pages.Typography.title:
        iframe.setAttribute('src', pages.Typography.link);
        break;
    case pages.ColorPalette.title:
        iframe.setAttribute('src', pages.ColorPalette.link);
        break;
    default:
        iframe.setAttribute('src', pages.Home.link);
        break;
    }
}

for (let link = 0; link < links.length; link += 1) {
    links[link].addEventListener('click', () => {
        // get the anchor element that wraps around the link
        const parent = links[link].parentElement.parentElement;
        let href;

        // check if parent element exists and if it does get the
        // value of the href attribute and remove any hashtags
        if (parent) {
            href = parent.getAttribute('href').replace('#', '');
        }

        // Check if link matches the current page
        if (currentUrl !== href) {
            LoadPage(href);
        }
    });
}
