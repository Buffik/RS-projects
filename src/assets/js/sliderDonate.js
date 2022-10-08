let screenWidth = window.innerWidth;
const inputDonate = document.querySelector('#donate-input')
const donationSlider = document.querySelector('.donation-calc__form')
const value5000 = document.querySelector('#value5000')
const value2000 = document.querySelector('#value2000')
const value1000 = document.querySelector('#value1000')
const value500 = document.querySelector('#value500')
const value250 = document.querySelector('#value250')
const value100 = document.querySelector('#value100')
const value50 = document.querySelector('#value50')
const value25 = document.querySelector('#value25')
const selectorOfDonate = document.querySelector('.debt-amount-pos')


donationSlider.addEventListener('click', (event) => {
  console.log(event.target.value);
  inputDonate.value = event.target.value
})

let currentValue = 0

let renderDonateSlider = () => {
  inputDonate.addEventListener('keyup', () => {
    if (screenWidth > 1599) {
      currentValue = inputDonate.value
      console.log(typeof currentValue)
      switch (currentValue) {
        case '5000':
          value5000.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '2000':
          value2000.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '1000':
          value1000.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '500':
          value500.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '250':
          value250.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '100':
          value100.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '50':
          value50.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '25':
          value25.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        default: 
        selectorOfDonate.classList.add('inactive_1');
        break;
      }
    } else if (screenWidth < 1600 && screenWidth > 999) {
      currentValue = inputDonate.value
      switch (currentValue) {
        case '2000':
          value2000.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '1000':
          value1000.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '500':
          value500.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '250':
          value250.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '100':
          value100.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '50':
          value50.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '25':
          value25.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        default: 
        selectorOfDonate.classList.add('inactive_1');
        break;
      } 
  
    } else if (screenWidth < 1000) {
      currentValue = inputDonate.value
      switch (currentValue) {
        case '500':
          value500.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '250':
          value250.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '100':
          value100.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '50':
          value50.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        case '25':
          value25.checked = true
          selectorOfDonate.classList.remove('inactive_1');
          break;
        default: 
        selectorOfDonate.classList.add('inactive_1');
        break;
      } 
    }
  })
}

export default renderDonateSlider