import { useTranslation } from 'react-i18next';
// material
import { enUS, deDE, frFR, viVN } from '@material-ui/core/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/static/icons/ic_flag_en.svg'
  }
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS[0];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang, () => console.log('Changed language'));
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS
  };
}
