import {animals} from './animals'

let slidesCount;
let screenWidth = document.body.clientWidth;
(screenWidth >= 1000) ? slidesCount = 6 : slidesCount = 4;

let collection = new Set();
let activeSlide = document.body.querySelector(".pets__active");
let leftSlide = document.body.querySelector(".pets__left");
let rightSlide = document.body.querySelector(".pets__right");
let sliderContainer = document.body.querySelector(".pets-cards__container");
let slidesInner = "";

const carousel = document.querySelector(".carousel");
const buttonLeft = document.querySelector(".arrow-back");
const buttonRight = document.querySelector(".arrow-forward");

const createRandomNumber = (data) => {
  return Math.floor(Math.random() * data.length)
};

const createStartActiveSlide = () => {
    while(collection.size < slidesCount) {
        let randomNumber = createRandomNumber(animals);
        collection.add(randomNumber)
    }
    createSlides(collection, activeSlide)
}

const  createHiddenSlides = () => {
    let newCollection = new Set();
    while(newCollection.size < slidesCount) {
      let randomNumber = createRandomNumber(animals);
        if (!collection.has(randomNumber)) {
          newCollection.add(randomNumber)
        }
    }
    collection = newCollection;
    createSlides(newCollection, leftSlide)
    createSlides(newCollection, rightSlide)
}

const createSlides = (collection, slide) => {
    slidesInner = "";
    collection.forEach(elem => {
        slidesInner += `
        <div class="pets-info__wrapper">
        <div class="pets__img ${animals[elem].image}"></div>
        <div class="pets__info">
          <div class="pets__text">
            <div class="pets__title">${animals[elem].name}</div>
            <div class="pets__subtitle">${animals[elem].location}</div>
          </div>
          <div class="${animals[elem].meal} pets__food-icon"></div>
        </div>
      </div>
`
    })
    slide.innerHTML = slidesInner
}

createStartActiveSlide();
createHiddenSlides();

const moveLeft = () => {
  carousel.classList.add("left");
  buttonLeft.removeEventListener("click", moveLeft)
  buttonRight.removeEventListener("click", moveRight)
}
const moveRight = () => {
  carousel.classList.add("right");
  buttonRight.removeEventListener("click", moveRight)
  buttonLeft.removeEventListener("click", moveLeft)
}

buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);

sliderContainer.addEventListener("animationend", (animation) => {
  if (animation.animationName === "to-left") {
    carousel.classList.remove("left")
    activeSlide.innerHTML = leftSlide.innerHTML;
    createLeftRightSlides();
  } else {
    carousel.classList.remove("right")
    activeSlide.innerHTML = rightSlide.innerHTML;
    createLeftRightSlides();
  }

  buttonLeft.addEventListener("click", moveLeft);
  buttonRight.addEventListener("click", moveRight);
})
