import comments from "./comments_base";

const popup = document.querySelector(".popup");
const popupComment = document.querySelector(".popup-comment");
const backgroundWithMenuMobile = document.querySelector('.dark-background')
const popupBtn = document.querySelector('.popup-button')

const removeModal = () => {
  popup.classList.remove('popup__visible')
  backgroundWithMenuMobile.classList.remove('item-active')
  popupComment.innerHTML = '';
  document.body.classList.remove('item-content__hidden')
}

const createModalWindow = (event) => {
  if (!!(event.target.closest(".comment"))) {
    let commentName = event.target.closest(".comment").querySelector(".comment__title").innerHTML;
    comments.forEach((index) => {
      if(index.commentTitle === commentName) {
        popupComment.insertAdjacentHTML("beforeend", `
        <div class="popup-comment__wrapper">
          <div class="popup-comment__title-wrapper">
            <div class="popup-comment__avatar ${index.avatar}"></div>
            <div class="popup-comment__user-wrapper">
              <div class="popup-comment__title">${index.commentTitle}</div>
              <div class="popup-comment__location-wrapper">
                <div class="popup-comment__location">${index.commentLocation}</div>
                <span class="popup-comment__dot"></span>
                <div class="popup-comment__date">${index.commentDate}</div>
              </div>
            </div>
          </div>
          <div class="popup-comment__text">${index.commentText}</div>
        </div>
      `)
      backgroundWithMenuMobile.classList.add('item-active')
      document.body.classList.add('item-content__hidden')
      popup.classList.add('popup__visible')
    };
    })
    popupBtn.addEventListener("click", () => {
      removeModal()
    })
    backgroundWithMenuMobile.addEventListener("click", (event) => {
        removeModal()
    })
  }

}

const renderModal = () => {
  let screenWidth = window.innerWidth;
  if (screenWidth < 1000) {
    document.body.addEventListener("click", createModalWindow)
  }
}

export default renderModal