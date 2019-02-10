import Toast from 'react-native-toast-native';

//@flow

const Theme = {
  colors: {
    primary: '#3998B3',
    secondary: '#007EA3',
    gray: '#EBEBEB',
    darkGray: '#989898',
    thickGray: '#505050',
    grayBackground: '#F8F7F7',
    smallText: '#777777'
  },
  fontSizes: {
    xSmall: 11,
    small: 12,
    sMedium: 13,
    medium: 14,
    xMedium: 16,
    large: 18,
    xLarge: 20,
  },
  fontWeight: {
    thin: '100',
    ultraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  },
}

export const centerPaddedContainer = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
}

export const font = {
  fontFamily: 'SFCompactDisplay-black',
  fontWeight: Theme.fontWeight.regular,
  letterSpacing: 1,
}

export const showToast =  (text) => {
  Toast.show(text, Toast.SHORT, Toast.BOTTOM);
}

export default Theme;