// @flow
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './NavigationBar.styles';

const NavigationBar = (props: any) => {
  const centerItem = typeof props.title === 'string' ?
    (
      <Text
        numberOfLines={1}
        style={styles.titleText}
      >
        {props.title}
      </Text>
    ) : props.title;
  return (
    <View style={styles.container}>
      <View style={styles.leftItemWrapper}>
        {props.leftAction}
      </View>
      <View style={[styles.centerItemWrapper, styles.titleCenterContainer]}>
        {centerItem}
      </View>
      <View style={styles.rightItemWrapper}>
        {props.rightAction}
      </View>
    </View>
  );
};

NavigationBar.propTypes = {
  leftAction: PropTypes.any,
  leftActionTop: PropTypes.bool,
  leftTitle: PropTypes.bool,
  rightAction: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

NavigationBar.defaultProps = {
  leftAction: null,
  leftActionTop: false,
  leftTitle: false,
  rightAction: null,
  title: null,
};

export default NavigationBar;
