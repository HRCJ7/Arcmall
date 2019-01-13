// @flow
import React from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import styles from './HomeScreen.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from '../components/list-item/list-item.component'

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

  renderItem(item) {
    return (
        <ListItem item={item}/>
    );
  }

  render() {
    const itemList = [{
        id: '1',
        image: 'https://picsum.photos/200/300/?random',
        description: 'Women\'s long wide sleeves square long dress specially for outdoor wear in multi colors',
        path: 'Her, dresses',
        subtitle: '',
        price: '$500.00'
    },
    {
        id: '1',
        image: 'https://www.dike.lib.ia.us/images/sample-1.jpg/image',
        description: 'Women\'s long wide sleeves square long dress specially for outdoor wear in multi colors',
        path: 'Her, dresses',
        subtitle: '',
        price: '$500.00'
    }];
    return (
      <View style={styles.container}>
        <Text>New home <Icon name="ios-book" color="#4F8EF7" /> screen!</Text>
          <FlatList
              data={itemList}
              renderItem={(item) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
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
