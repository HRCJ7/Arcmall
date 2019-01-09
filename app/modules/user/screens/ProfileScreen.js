// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ProfileScreen.styles';
import {navigateToMainTabScreen} from '../../../navigation/RootNavActions';

class ProfileScreen extends React.Component<any, any> {
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
  handleNavigatePress = () => {
    console.log(this.props)
    this.props.navigation.dispatch(navigateToMainTabScreen());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>New PROFILE screen!</Text>
        <Button
          onPress={this.handleNavigatePress}
          title={"Navigate to tab screen"}
        />
      </View>
    );
  }
}

ProfileScreen.propTypes = {

};

ProfileScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
