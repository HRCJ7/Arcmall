// @flow
import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  MKSpinner,
} from 'react-native-material-kit';

import styles from './LoadingIndicator.styles';
import Theme from '../../../../theme/Base';


class LoadingIndicator extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }

  renderSpinner = (spinnerStyle: any, backgroundStyle?: any) => {
    const SingleColorSpinner = MKSpinner.singleColorSpinner().withStyle(spinnerStyle)
      .withStrokeColor(Theme.colors.primary).build();
    const style = [styles.loadingWrapper, {backgroundColor: this.props.placeholderColor}];
    return (
      <View style={style}>
        <SingleColorSpinner />
      </View>
    );
  }

  // renderIcon = (backgroundStyle: any) => {
  //   const style = [backgroundStyle, {backgroundColor: this.props.placeholderColor}];
  //   return (
  //     <View style={style}>
  //       <Icon
  //         color={colors.icons.coolGray2}
  //         name='warning'
  //         size={20}
  //       />
  //     </View>
  //   );
  // }

  renderBackground = (style: any) => {
    const styles = [style, {backgroundColor: this.props.placeholderColor}];
    return (
      <View style={styles} />
    );
  }

  render() {
    let content = null;

    // switch (this.props.size) {
    // case SPINNER_TYPES.SMALL:
    //   content = this.renderSpinner(styles.spinnerSmall);
    //   break;
    // case SPINNER_TYPES.LARGE:
    //   content = this.renderSpinner(styles.spinnerLarge);
    //   break;
    // case SPINNER_TYPES.INVISIBLE:
    //   content = this.renderBackground(styles.loadingWrapper);
    //   break;
    // case SPINNER_TYPES.PLACEHOLDER:
    //   content = this.renderBackground(styles.loadingWrapper);
    //   break;
    // case SPINNER_TYPES.PLACEHOLDER_ERROR:
    //   content = this.renderIcon(styles.iconBackground);
    //   break;
    // default:
    //   content = this.renderSpinner(styles.spinnerSmall);
    //   break;
    // }

    content = this.renderSpinner(styles.spinnerLarge);

    if (this.props.show) {
      return content;
    }

    return null;
  }
}

LoadingIndicator.propTypes = {
  // placeholderColor: PropTypes.string,
  show: PropTypes.bool,
  // showText: PropTypes.bool,
  // size: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  show: true,
  // showText: true,
  // placeholderColor: colors.background.transparent,
};

export default LoadingIndicator;
