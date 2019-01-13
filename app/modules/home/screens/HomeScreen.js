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
import ArcmallButton from '../../shared/components/arcmallButton/ArcmallButton';
import {navigateToItemListScreen} from '../../../navigation/RootNavActions';
import {ROOT_NAV_ITEM_LIST} from '../../../navigation/RootRoutes';
import ProductActions from '../../product/actions/ProductActions';

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

  handleItemListNavigation = () => {
    console.log(this.props)
    this.props.navigation.dispatch(navigateToItemListScreen());
  }

  render() {
    return (
      <View style={styles.container}>
        <ArcmallButton
          onPress={this.handleItemListNavigation}
          title={'Go to item list'}
        />
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
