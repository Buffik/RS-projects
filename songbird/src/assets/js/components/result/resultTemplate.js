const renderResultTemplate = (parent, lang, score) => {
  const resultTemplate = document.createElement('div');
  resultTemplate.classList.add('result__template');

  const playAgainButton = document.createElement('a');
  playAgainButton.classList.add('result__button');
  playAgainButton.href = './quiz.html';
  playAgainButton.innerText = lang === 'ru' ? `Пробовать снова` : `Try again`;

  if (score === 30) {
    resultTemplate.innerHTML =
      lang === 'ru'
        ? `<span class="result__text">Поздравляю с успешным завершением викторины Song bird!
    Твой результат впечатляет: ни одной ошибки - ${score} баллов!</span>`
        : `<span class="result__text">Great results! You have no mistakes! 
        Full ${score} points!</span>`;
  } else {
    resultTemplate.innerHTML =
      lang === 'ru'
        ? `<span class="result__text">Может попробуешь еще раз?
        Твой результат ${score} из 30 баллов!</span>`
        : `<span class="result__text">Nice attempt! May be one more time? 
        You got ${score} out of 30 points!</span>`;
    resultTemplate.append(playAgainButton);
  }

  parent.append(resultTemplate);
};

export default renderResultTemplate;
