import comments from './comments_base'

const commentsWrapper = document.querySelector('.testimonials__comments-wrapper')

let commentNodes = []

const buildComment = (imgUrl, commentTitle, commentLocation, commentDate, commentText) => {
  let innerPopup = `<div class="comment">
<div class="comment__wrapper">
  <div class="comment__title-wrapper">
    <div class="comment__avatar ${imgUrl}"></div>
    <div class="comment__user-wrapper">
      <div class="comment__title">${commentTitle}</div>
      <div class="comment__location-wrapper">
        <div class="comment__location">${commentLocation}</div>
        <span class="comment__dot"></span>
        <div class="comment__date">${commentDate}</div>
      </div>
    </div>
  </div>
  <div class="comment__text">
  ${commentText}
  </div>

</div>
</div>
`
  return innerPopup

}

for (let i = 0; i < comments.length; i++) {
  const element = buildComment(comments[i].avatar, comments[i].commentTitle, comments[i].commentLocation, comments[i].commentDate, comments[i].commentText);
  commentNodes.push(element)
}

let renderComment = () => {
  commentNodes.forEach((element) => {
    commentsWrapper.insertAdjacentHTML('beforeend', element);
  })
}

export default renderComment

