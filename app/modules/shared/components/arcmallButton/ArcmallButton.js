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
    const {onPress, style, title} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

ArcmallButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
};

ArcmallButton.defaultProps = {
  onPress: () => {},
  style: {},
  title: '',
};

export default ArcmallButton;