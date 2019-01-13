// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ProductListScreen.styles';

class ProductListScreen extends React.Component<any, any> {
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
        <Text>New home screen!</Text>
      </View>
    );
  }
}

ProductListScreen.propTypes = {

};

ProductListScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

export default connect(mapStateToProps)(ProductListScreen);
