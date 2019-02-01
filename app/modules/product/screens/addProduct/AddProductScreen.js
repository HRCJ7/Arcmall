// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect,} from 'react-redux';
import styles from './AddProductScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import {navigateToItemListScreen } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import GridView from '../../components/GridView/GridView';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {getOptions, getCategorydata, filterCategory, saveProduct, getCategoryFromId} from './Apis';
import {Item, Input} from 'native-base';
import t from 'tcomb-form-native';
import {getUser } from '../../../../store/AsyncStorageHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ArcmallButton from '../../../shared/components/arcmallButton/ArcmallButton';
import { getForm } from '../../../../services/RestService';
import { ListItem } from 'react-native-elements'
import Theme from '../../../../theme/Base';
import ImagePicker from 'react-native-image-crop-picker';
import TagInput from '../../components/tagInput/TagInput';

class AddProductScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    let category = [];
    // category.push({category_id: 75});
    this.state = {
      //Just like from API
      productOptions: null,
      allCategories: null,

      //Formatted to enum (key, value)
      categoriesMain: null,
      categorieslv1: {},


      isLoading: true,
      
      //Post ready state
      productFormData: {
        // name : 'Sahan',
        // description: 'Harinda',
        // quantity : '10',
        // price : '1000',
        // weight : '10',
        // category: category, 
        // categorySelectedMain : '82',
        // categorySelectedLv1 : '140',
        // customer_id : null,
        // currency_code : null,


        //Unformatted to POST
        categorySelectedMain : null,
        categorySelectedLv1 : null,

        //Formatted to POST
        name : null,
        description: null,
        quantity : null,
        price : null,
        weight : null,
        model: null,
        
        category: [],
        option: [],

        customer_id : null,
        currency_code : null,

        model : null,
        height : null,
        length: null,
        width: null,
        mainimage : '',
        image1 : '',
        image2 : '',
        image3 : '',
        image4 : '',
      },
    }

    console.log(this.state);
    this.getData();

        
    
  }

  componentDidMount() {
    
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    // return {
    //   isLoading: !state.productOptions || !state.categoriesMain,
    // };
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  handleSubmitForm = () => {
    ImagePicker.openPicker({
      // multiple: true,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      console.log(image);
    });
    // let formData = {...this.state.productFormData};
    // if (formData.categorySelectedMain) {
    //   formData.category[1] = {category_id: formData.categorySelectedMain};
    // }
    // if (formData.categorySelectedLv1) {
    //   formData.category[2] = {category_id: formData.categorySelectedLv1}
    // }

    // formData = getForm(formData);
    // saveProduct(formData);
		// console.log('TCL: AddProductScreen -> handleSubmitForm -> formData', formData)
    

  }
  
  getData = async () => {
    const options = await getOptions();
    let formattedOptions = [];

    for (const option of options) {
      const {name, option_id, type, value, required, option_value} = option;
      formattedOptions.push({
        name,
        option_id
      })
    }


    const user = await getUser();
    const {formatted, unformatted} = await getCategorydata();

    console.log(formattedOptions)
    
    this.setState({
      productOptions: options,
      allCategories: unformatted,
      categoriesMain: formatted,
      isLoading: false,
      productFormData: {
        ...this.state.productFormData,
        customer_id: user.customer_id,
      }
    })
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleOnGridPress = (categories) => {
    this.props.navigation.dispatch(navigateToItemListScreen({categories}))
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.ALL_CATEGORIES}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }


  onFormChange = async (value) => {    
    const {allCategories, categoriesMain, categorieslv1, productFormData} = this.state;
    const mainCategoryId = value.categorySelectedMain;
    const catLvl1Id = value.categorySelectedLv1;

    let stateObj = {
      productFormData: {
        ...productFormData,
        ...value,
      }
    }

    let categoryArr = stateObj.productFormData.category;
    let mainCategoryData = null;
		
    if (mainCategoryId) {
      let {formatted, unformatted, categoryData} = await filterCategory(allCategories, mainCategoryId);
      mainCategoryData = unformatted;
      formatted = formatted? formatted: {};
      stateObj.categorieslv1 = formatted;

      let filteredData = categoryArr.filter((category) => category.category_id == mainCategoryId);
      if (filteredData.length === 0) {
        categoryArr.push(categoryData)
      }
    }

    if (catLvl1Id) {
      let {formatted, unformatted, categoryData} = await filterCategory(mainCategoryData, catLvl1Id);
      let filteredData = categoryArr.filter((category) => category.category_id == catLvl1Id);
      if (filteredData.length === 0) {
        categoryArr.push(categoryData)
      }
    }

    this.setState(stateObj, ()=> {
      console.log(this.state)
    });
  }

  textInputTemplate = (locals) => {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{locals.label}</Text>
        <TextInput style={styles.textInput} />
      </View>
    );
  }

  getModalView = (variable, options, selectedVal, onSelected, onClose) => {
    const listView = (options) => {
      return (
        <FlatList 
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({item}) => {
            const fontWeight = selectedVal === item.value? 
              Theme.fontWeight.semibold: Theme.fontWeight.light;
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  onSelected(item.value);
              }}>
              <ListItem
                title={item.text}
                titleStyle={{ color: 'black', fontWeight: fontWeight }}
                chevronColor="white"
              />
             </TouchableOpacity>
            )
          }}
        />
      )
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle='overFullScreen'
        visible={this.state[variable]? this.state[variable]: false}
        onRequestClose={onClose}>
        <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={{height: 50, justifyContent:'flex-end', paddingLeft: 10}}>
            <TouchableOpacity onPress={onClose} style={{height: 50, width: 50, justifyContent:'flex-end'}}>
              <EvilIcons name='close' size={25} />
            </TouchableOpacity>
          </View>
          {listView(options)}
        </View>
      </Modal>
    )
  }


  getOptionModalView = (variable, options, mainOptionId, onSelected, onClose) => {
    const listView = (options) => {
      return (
        <FlatList 
          data={options}
          keyExtractor={(item) => item.option_value_id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  onSelected({mainOptionId, optionValueId: item.option_value_id});
              }}>
              <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontWeight: Theme.fontWeight.light }}
                chevronColor="white"
              />
             </TouchableOpacity>
            )
          }}
        />
      )
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle='overFullScreen'
        visible={this.state[variable]? this.state[variable]: false}
        onRequestClose={() => {
          onClose(variable)
        }}>
        <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={{height: 50, justifyContent:'flex-end', paddingLeft: 10}}>
            <TouchableOpacity onPress={() => {
              onClose(variable)
            }} style={{height: 50, width: 50, justifyContent:'flex-end'}}>
              <EvilIcons name='close' size={25} />
            </TouchableOpacity>
          </View>
          {listView(options)}
        </View>
      </Modal>
    )
  }

  enumTemplate = (locals) => {
    const modalVarialble = `${locals.path[0]}ViewStatus`;
		console.log('TCL: enumTemplate -> locals.path[0]', locals.path[0])
    onSelected = (value) => {
      locals.onChange(value);
      this.setState({
        [modalVarialble]: false,
        productFormData: {
          ...this.state.productFormData,
          categorySelectedLv1: null,
        }
      })
    }

    onpress = () => {
      this.setState({
        [modalVarialble]: true,
      })
    }

    onClose = () => {
      this.setState({
        [modalVarialble]: false,
      })
    }

    getTags = () => {
      let content = null;
      if (locals.path[0] === 'categorySelectedLv1') {
        content = (
          <View style={{flex: 1, paddingBottom: 20}}>
            <TagInput
              maxHeight={1000}
              tagContainerStyle={{height: 40}}
              value={this.state.productFormData.category}
              onChange={(category) => {                
                this.setState({
                  productFormData: {
                    ...this.state.productFormData,
                    category: category,
                  }
                })
              }}
              labelExtractor={(category) => category.name}
          />
          </View>
        )
      }
      return content;
    }

    const item = locals.options.filter(item => item.value === locals.value)[0];
  
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{locals.label}</Text>
        <TouchableOpacity onPress={onpress} style={styles.enumButton}>
          <Text style={styles.smallText}>{item.text}</Text>
          {this.getModalView(modalVarialble, locals.options, locals.value, onSelected, onClose)}
        </TouchableOpacity>
        {getTags()}
      </View>
    );
  }

  optionsTemplate = (locals) => {
    const modalVarialble = `${locals.path[0]}ViewStatus`;
    onSelected = (value) => {
      locals.onChange(value);
      this.setState({
        [modalVarialble]: false,
        productFormData: {
          ...this.state.productFormData,
          categorySelectedLv1: null,
        }
      })
    }

    onpress = () => {
      this.setState({
        [modalVarialble]: true,
      })
    }

    onClose = () => {
      this.setState({
        [modalVarialble]: false,
      })
    }

    getTags = () => {
      let content = null;
      if (locals.path[0] === 'categorySelectedLv1') {
        content = (
          <View style={{flex: 1, paddingBottom: 20}}>
            <TagInput
              maxHeight={1000}
              tagContainerStyle={{height: 40}}
              value={this.state.productFormData.category}
              onChange={(category) => {                
                this.setState({
                  productFormData: {
                    ...this.state.productFormData,
                    category: category,
                  }
                })
              }}
              labelExtractor={(category) => category.name}
          />
          </View>
        )
      }
      return content;
    }

    const item = locals.options.filter(item => item.value === locals.value)[0];
  
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{locals.label}</Text>
        <TouchableOpacity onPress={onpress} style={styles.enumButton}>
          <Text style={styles.smallText}>{item.text}</Text>
          {this.getModalView(modalVarialble, locals.options, locals.value, onSelected, onClose)}
        </TouchableOpacity>
        {getTags()}
      </View>
    );
  }

  renderForm = (data) => {
    let content = null;
    let Form = t.form.Form;
    const {categoriesMain, categorieslv1, productFormData, productOptions} = this.state;

    getOprionsArray = (optionVals) => { 
			console.log('TCL: getOprionsArray -> optionVals', optionVals)
      let options = {};
      for(const optionval of optionVals) {
        options[optionval.option_value_id] = optionval.name;
      }
      // return optionVals.map((optionval) => {
      //   return {
      //     [optionval.option_value_id]: optionval.name,
      //   }
      // });
      console.log('TCL: getOprionsArray -> options', options)
      return options;
			
    }


    if (productOptions) {

      let formattedOptions = {};
      let formattedStruct = {};

      let categoriesMainEnum = t.enums(categoriesMain);
      let categoriesLvl1Enum = t.enums(categorieslv1);

      for (const option of productOptions) {
        formattedOptions[option.name] = {
          label: option.name,
          template: this.optionsTemplate,
        }

        formattedStruct[option.name] = t.enums(getOprionsArray(option.option_value));
      }

      let options = {
        fields: {
          name: {
            label: 'Product Name',
            template: this.textInputTemplate,
          },
          description: {
            label: 'Product Description (Be detailed)',
            template: this.textInputTemplate,
          },
          quantity: {
            label: 'Awailable Quantity',
            template: this.textInputTemplate,
          },
          price: {
            label: 'Item Price (USD)',
            template: this.textInputTemplate,
          },
          weight: {
            label: 'Item Weight (KG)',
            template: this.textInputTemplate,
          },
          categorySelectedMain : {
            label: 'Main Category',
            template: this.enumTemplate,
          },
          categorySelectedLv1: {
            label: 'Sub category level 1',
            template: this.enumTemplate,
          },
          // ...formattedOptions,
        }
      };
  
      let Product = t.struct({
        name: t.String, 
        description: t.String,
        quantity: t.String,
        // price: t.Number,
        // weight: t.Number,
        // categorySelectedMain: categoriesMainEnum,
        // categorySelectedLv1: categoriesLvl1Enum,
        // ...formattedStruct,
      });
  
  
      content = (
        <View style={{flex: 1}}>
          <Form
            ref="form"
            style={{padding: 20}}
            type={Product}
            value={this.state.productFormData}
            onChange={this.onFormChange}
            options={options}
          />
        </View>
      )
    }

    return content;r
  }

  renderOptions() {

    onSelected = ({mainOptionId, optionValueId}) => {
      
    }

    showModal = (variable) => {
      this.setState({
        [variable]: true,
      })
    }

    onClose = (variable) => {
      this.setState({
        [variable]: false,
      })
    }

    const {productOptions} = this.state;
    let content = null;

    if (productOptions) {
      let labels = [];
      for (const option of productOptions) {
        const modalStatusVariable = `${option.name}ModalView`
        labels.push(
          <View style={{flex: 1, flexDirection: 'row', height: 50, paddingBottom: 10}}>
            <Text style={styles.headingText}>{option.name}</Text>
            <TouchableOpacity onPress={() => {
              showModal(modalStatusVariable);
            }} style={{flex: 1, alignItems:'flex-end'}}>
              <EvilIcons name='close' size={25} />
            </TouchableOpacity>
            {this.getOptionModalView(modalStatusVariable, option.option_value, option.option_id, onSelected, onClose)}
          </View>
        )
      }

      content = labels;
    }
    // const modalVarialble = `${locals.path[0]}ViewStatus`;

    // for (const option in )

    //         <TouchableOpacity onPress={onClose} style={{height: 50, width: 50, justifyContent:'flex-end'}}>
    //           <EvilIcons name='close' size={25} />
    //         </TouchableOpacity>

    

    // content = (
    //   <Text style={styles.headingText}>{locals.label}</Text>
    // );

    //   let options = {};
    //   for(const optionval of optionVals) {
    //     options[optionval.option_value_id] = optionval.name;
    //   }
    //   console.log('TCL: getOprionsArray -> options', options)
    //   return options;

    return content;
  }

  render() {
    const {isLoading} = this.state;
    var Form = t.form.Form;
    let content = null;
    const navBar = this.renderNavBar();
    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else {
      content = (
        <KeyboardAwareScrollView style={styles.container}>
          {navBar}
          <View style={{flex: 1, padding: 20}}>
            {this.renderForm()}
            {this.renderOptions()}
            <ArcmallButton 
              title={'save'}
              onPress={this.handleSubmitForm}
            />
          </View>
          
          {/* <ScrollView style={styles.container}>
            <GridView
              all
              categories={this.props.categoryList}
              onPress={this.handleOnGridPress}
            />
          </ScrollView> */}
        </KeyboardAwareScrollView>
      );
    }
    return (
      content
    );
  }
}

AddProductScreen.propTypes = {

};

AddProductScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    categoryList: state.product.categoryList,
    // isLoading: state.product.categoryListLoading,
  };
};

export default connect(mapStateToProps)(AddProductScreen);
