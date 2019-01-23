// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
import enStrings from './en'

let Strings = new LocalizedStrings({
 en:enStrings,
 zh: {
    PRODUCT_DETAILS:"Come vuoi il tuo uovo oggi?",
    boiledEgg:"Uovo sodo",
    softBoiledEgg:"Uovo alla coque",
    choice:"Come scegliere l'uovo"
 }
});

export default Strings;