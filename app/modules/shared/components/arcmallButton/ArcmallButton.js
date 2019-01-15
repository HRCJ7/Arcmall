// @flow
import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ArcmallButton.styles';

class ArcmallButton extends React.PureComponent<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
  }

  render() {
    const {onPress, style, title, inverse} = this.props;
    const containerStyle = inverse? styles.containerInverse: styles.container;
    const textStyle = inverse? styles.textInverse: styles.text;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[containerStyle, style]}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

ArcmallButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
  inverse: PropTypes.bool,
};

ArcmallButton.defaultProps = {
  onPress: () => {},
  style: {},
  title: '',
  inverse: false,
};

export default ArcmallButton;