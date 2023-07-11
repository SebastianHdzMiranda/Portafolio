const menuIcon = document.querySelector('.menu__enlace');

const menuNav = document.querySelector('.menu__nav');

console.log(menuIcon);
console.log(menuNav);

menuIcon.addEventListener('click', (e)=>{
    e.preventDefault();
    menuNav.classList.toggle('menu__nav--visible');
});
