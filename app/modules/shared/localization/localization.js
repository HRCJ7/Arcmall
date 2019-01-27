// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
import enStrings from './en'
import zhStrings from './zh'

let Strings = new LocalizedStrings({
 en: enStrings,
 zh: zhStrings,
});

export default Strings;