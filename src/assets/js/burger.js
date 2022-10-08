const body = document.querySelector('body')
const menuMobile = document.querySelector('.header__menu-mobile')
const backgroundWithMenuMobile = document.querySelector('.dark-background')
const menuBtnClose = document.querySelector('.header__hamburger-close-btn')
const menuBtnOpen = document.querySelector('.header__hamburger')
const menuLinks = document.querySelectorAll('.menu__link-mobile')

const addBurgerMenu = () => {
  menuBtnOpen.addEventListener('click', () => {
    menuMobile.classList.add('menu-mobile__active')
    backgroundWithMenuMobile.classList.add('item-active')
    body.classList.add('item-content__hidden')
  })

  menuBtnClose.addEventListener('click', () => {
    body.classList.remove('item-content__hidden')
    menuMobile.classList.remove('menu-mobile__active')
    backgroundWithMenuMobile.classList.toggle('item-active')
  })

  backgroundWithMenuMobile.addEventListener('click', () => {
    body.classList.remove('item-content__hidden')
    menuMobile.classList.remove('menu-mobile__active')
    backgroundWithMenuMobile.classList.toggle('item-active')
  })
  
  menuLinks.forEach((node) => {
    node.addEventListener('click', () => {
      body.classList.remove('item-content__hidden')
      menuMobile.classList.remove('menu-mobile__active')
      backgroundWithMenuMobile.classList.toggle('item-active')
    })
  })

  
}

export default addBurgerMenu