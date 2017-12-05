export const DEFAULT_LOCALE = 'pt-BR';

export const getLocale = () => {
  return (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || DEFAULT_LOCALE;
};