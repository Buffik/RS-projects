const setLang = (language) => {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', language);
  }
  if (localStorage.getItem('lang') !== language) {
    localStorage.setItem('lang', language);
  }
};

export default setLang;
