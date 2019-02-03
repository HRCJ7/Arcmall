// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './NavMenuScreen.styles'
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import { navigateToItemDetails, navigateToOptions } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import { ListItem } from 'react-native-elements'
import Theme from '../../../../theme/Base';
import { splitCategoryName } from '../../../../services/ExternalServices';
import { ROOT_NAV_OPTIONS_1, ROOT_NAV_OPTIONS } from '../../../../navigation/RootRoutes';

class NavMenuScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    const goBackFrom = props.navigation.state.routeName === ROOT_NAV_OPTIONS_1? 
      props.navigation.state.key:
        params.goBackFrom;
    this.state = {
      categories: params.categories,
      onSelect: params.onSelect,
      level: params.level,
      name: params.name,
      pathString: params.pathString,
      selectedCategories: params.selectedCategories,
      goBackFrom: goBackFrom,
      // level: params.level,
      // maxLevel: params.maxLevel,
    }

    if(props.level === 3) {

    }
  }

  componentDidMount() {
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  handleProductOnPress = (itemId: number) => {
    this.props.navigation.dispatch(navigateToItemDetails({itemId}));
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    const {name} = this.state;
    return (
      <NavigationBar
        title={name}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  onListItemPress = (item) => {
    const {onSelect, level, name: navName, pathString, selectedCategories, goBackFrom} = this.state;
    const {categories} = item;
    let {name, count} = splitCategoryName(item.name);

    let pathStringModified = '';
    if (!pathString) {
      pathStringModified = `${name} `;
    } else {
      pathStringModified = `${pathString}> ${name}`;
    }
    
    if (categories.length > 0) {
      this.props.navigation.dispatch(navigateToOptions({
        goBackFrom,
        categories: categories, 
        onSelect, level: 1 + level, 
        name,
        selectedCategories,
        pathString: pathStringModified}));
    } else {
      onSelect(item, pathStringModified);
      this.props.navigation.goBack(goBackFrom);
    }
  }

  render() {
    const {categories, onSelect, selectedCategories} = this.state;
    
    const navBar = this.renderNavBar();
    let content = null;
    return (
      <View style={{flex: 1}}>
        {navBar}
        <FlatList
        data={categories}
        keyExtractor={(item) => item.category_id}
        renderItem={({item}) => {
          let {name, count} = splitCategoryName(item.name);
          let lastLevel = item.categories.length === 0;
          let isSelected = selectedCategories.filter((selected) => selected.category_id === item.category_id).length > 0;
          let fontWeight = isSelected? Theme.fontWeight.semibold: Theme.fontWeight.light;
          return (
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                if (!isSelected) {
                  this.onListItemPress(item);
                }
            }}>
            <ListItem
              title={name}
              titleStyle={{ color: 'black', fontWeight: fontWeight}}
              chevronColor={lastLevel? 'white': 'gray'}
            />
           </TouchableOpacity>
          )
        }}
      />
      </View>
    )
  }
}

NavMenuScreen.propTypes = { 
};

NavMenuScreen.defaultProps = {
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(NavMenuScreen);
