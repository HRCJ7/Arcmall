// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
import enStrings from './en'

let Strings = new LocalizedStrings({
 en:enStrings,
 it: {
     YOUR_CART: 'Your Cart',
     CHECKOUT: 'Checkout', 
    ALL_CATEGORIES: 'All Categories',
    PRODUCT_DETAILS:"Come vuoi il tuo uovo oggi?",
    boiledEgg:"Uovo sodo",
    softBoiledEgg:"Uovo alla coque",
    choice:"Come scegliere l'uovo"
 }
});

export default Strings;