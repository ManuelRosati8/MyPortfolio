import { useLanguage } from '../context/LanguageContext';

export const useT = () => {
  return useLanguage();
};
