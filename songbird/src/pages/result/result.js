import '../../assets/sass/result.scss';
import backgroundVideo from '../../assets/media/video/background_video.mp4';
import renderResultTemplate from '../../assets/js/components/result/resultTemplate';

const videoWrapper = document.createElement('div');
videoWrapper.classList.add('background__wrapper');

const videoBlock = document.createElement('video');
videoBlock.autoplay = true;
videoBlock.muted = true;
videoBlock.loop = true;
videoBlock.src = backgroundVideo;
videoBlock.type = 'video/mp4';
videoBlock.classList.add('background__video');

videoWrapper.append(videoBlock);
document.body.prepend(videoWrapper);

const currentLanguage = localStorage.getItem('lang');
const currentScore = Number(localStorage.getItem('score'));
const parentNode = document.querySelector('main');

renderResultTemplate(parentNode, currentLanguage, currentScore);
