import { queryElement } from '../../../types/checkQueryElements';
import './buttonUP.css';

export class ButtonUp {
  button = queryElement(document, HTMLDivElement, '.button-up');

  renderButton(): void {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 500
        ? this.button.classList.remove('button-up__disabled')
        : this.button.classList.add('button-up__disabled');
    });

    this.button.onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  }
}
