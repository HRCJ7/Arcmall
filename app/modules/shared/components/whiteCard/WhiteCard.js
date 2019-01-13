// @flow
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './WhiteCard.styles';

const WhiteCard = (props: any) => {
  return (
    <View>
      <View style={styles.header} />
      <View style={styles.container}>
        {props.children}
      </View>
    </View>
  );
};

WhiteCard.propTypes = {
  leftAction: PropTypes.any,
  leftActionTop: PropTypes.bool,
  leftTitle: PropTypes.bool,
  rightAction: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

WhiteCard.defaultProps = {
  leftAction: null,
  leftActionTop: false,
  leftTitle: false,
  rightAction: null,
  title: null,
};

export default WhiteCard;
