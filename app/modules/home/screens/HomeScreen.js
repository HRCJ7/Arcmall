// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './HomeScreen.styles';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>New home <Icon name="ios-book" color="#4F8EF7" /> screen!</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {

};

HomeScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

export default connect(mapStateToProps)(HomeScreen);
