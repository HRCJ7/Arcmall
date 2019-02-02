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
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect,} from 'react-redux';
import styles from './AddProductScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import {navigateToItemListScreen, navigateToOptions } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import GridView from '../../components/GridView/GridView';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {getOptions, getCategorydata, filterCategory, saveProduct, getCategoryFromId, addMainImage, uploadImages, uploadImage} from './Apis';
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
import { ROOT_NAV_OPTIONS } from '../../../../navigation/RootRoutes';
import { CachedImage } from 'react-native-cached-image';

const IMAGE_COUNT = 3;
const {width, height} = Dimensions.get('window');
const WIDTH = width - 40;

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

      productId: null,
      images: [],


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
        product_option: [],

        customer_id : null,
        currency_code : null,

        model : null,
        height : null,
        length: null,
        width: null,
      },
    }
    this.getData();
  }

  componentDidMount() {
    // addMainImage();
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
    
    uploadImage(this.state.images[0], true)
    // ImagePicker.openPicker({
    //   // multiple: true,
    //   mediaType: 'photo',
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
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

    // let categoryArr = stateObj.productFormData.category;
    // let mainCategoryData = null;
		
    // if (mainCategoryId) {
    //   let {formatted, unformatted, categoryData} = await filterCategory(allCategories, mainCategoryId);
    //   mainCategoryData = unformatted;
    //   formatted = formatted? formatted: {};
    //   stateObj.categorieslv1 = formatted;

    //   let filteredData = categoryArr.filter((category) => category.category_id == mainCategoryId);
    //   if (filteredData.length === 0) {
    //     categoryArr.push(categoryData)
    //   }
    // }

    // if (catLvl1Id) {
    //   let {formatted, unformatted, categoryData} = await filterCategory(mainCategoryData, catLvl1Id);
    //   let filteredData = categoryArr.filter((category) => category.category_id == catLvl1Id);
    //   if (filteredData.length === 0) {
    //     categoryArr.push(categoryData)
    //   }
    // }

    this.setState(stateObj);
  }

  textInputTemplate = (locals) => {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{locals.label}</Text>
        <TextInput style={styles.textInput} />
      </View>
    );
  }

  getOptionModalView = (variable, options, mainOption, onSelected, onClose) => {
    const {productFormData: {product_option}} = this.state;

    const listView = (options) => {
      return (
        <FlatList 
          data={options}
          keyExtractor={(item) => item.option_value_id}
          renderItem={({item}) => {
            console.log(item)
            let isSelected = false;
            if(product_option.length > 0) {
              isSelected = product_option.filter((option) => option.option_value_id === item.option_value_id).length > 0;
            }
            const fontWeight = isSelected? Theme.fontWeight.semibold: Theme.fontWeight.light;
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  if (!isSelected) {
                    onSelected(mainOption, item);
                    onClose(variable);
                  }
              }}>
              <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontWeight}}
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

  // enumTemplate = (locals) => {
  //   const modalVarialble = `${locals.path[0]}ViewStatus`;
	// 	console.log('TCL: enumTemplate -> locals.path[0]', locals.path[0])
  //   onSelected = (value) => {
  //     locals.onChange(value);
  //     this.setState({
  //       [modalVarialble]: false,
  //       productFormData: {
  //         ...this.state.productFormData,
  //         categorySelectedLv1: null,
  //       }
  //     })
  //   }

  //   onpress = () => {
  //     this.setState({
  //       [modalVarialble]: true,
  //     })
  //   }

  //   onClose = () => {
  //     this.setState({
  //       [modalVarialble]: false,
  //     })
  //   }

  //   getTags = () => {
  //     let content = null;
  //     if (locals.path[0] === 'categorySelectedLv1') {
  //       content = (
  //         <View style={{flex: 1, paddingBottom: 20}}>
  //           <TagInput
  //             maxHeight={1000}
  //             tagContainerStyle={{height: 40}}
  //             value={this.state.productFormData.category}
  //             onChange={(category) => {                
  //               this.setState({
  //                 productFormData: {
  //                   ...this.state.productFormData,
  //                   category: category,
  //                 }
  //               })
  //             }}
  //             labelExtractor={(category) => category.name}
  //         />
  //         </View>
  //       )
  //     }
  //     return content;
  //   }

  //   const item = locals.options.filter(item => item.value === locals.value)[0];
  
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.headingText}>{locals.label}</Text>
  //       <TouchableOpacity onPress={onpress} style={styles.enumButton}>
  //         <Text style={styles.smallText}>{item.text}</Text>
  //         {this.getModalView(modalVarialble, locals.options, locals.value, onSelected, onClose)}
  //       </TouchableOpacity>
  //       {getTags()}
  //     </View>
  //   );
  // }

  renderForm = (data) => {
    let content = null;
    let Form = t.form.Form;
    const {categoriesMain, categorieslv1, productFormData, productOptions} = this.state;
    if (productOptions) {
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
          }
        }
      };
  
      let Product = t.struct({
        name: t.String, 
        description: t.String,
        quantity: t.String,
        price: t.String,
        weight: t.String,
      });
  
  
      content = (
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>{Strings.ITEM_DETAILS}</Text>
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

    return content;
  }

  onCategorySelect = (item, pathString) => {
    const {productFormData} = this.state;
    let category = productFormData.category;
    category.push({
      category_id: item.category_id,
      pathString,
    });
    this.setState({
      productFormData: {
        ...productFormData,
        categories: category,
      }
    });
  }

  onCategoriesPress = () => {
    const {allCategories, productFormData: {category}} = this.state;
    this.props.navigation.dispatch(navigateToOptions({
      categories: allCategories,
      onSelect: this.onCategorySelect,
      level: 1,
      selectedCategories: category,
      name: null,
    }));
  }

  renderCategories = () => {
    getTags = () => {
      const {productFormData: {category}} = this.state;
      let content = null;
      if (category.length > 0) {
        content = (
          <View style={{flex: 1, paddingBottom: 20}}>
            <TagInput
              maxHeight={1000}
              tagContainerStyle={{height: 40}}
              value={category}
              onChange={(category) => {                
                this.setState({
                  productFormData: {
                    ...this.state.productFormData,
                    category: category,
                  }
                })
              }}
              labelExtractor={(category) => category.pathString}
          />
          </View>
        )
      }
      return content;
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.optionView}>
          <Text style={styles.headingText}>{Strings.CATEGORIES}</Text>
          <TouchableOpacity onPress={this.onCategoriesPress} style={{flex: 1, justifyContent: 'center', alignItems:'flex-end'}}>
            <EvilIcons name='plus' size={30} />
          </TouchableOpacity>
        </View>
        {getTags()}
      </View>
      
    )
  }

  renderOptions = () => {
    onSelected = (mainOption, subOption) => {
      var {productFormData, productFormData} = this.state;
			console.log('TCL: onSelected -> productFormData', productFormData)
      
      let formData = {...productFormData};
      formData.product_option.push(
        {
          option_id: mainOption.option_id,
          option_value_id: subOption.option_value_id,
          tagString: `${mainOption.name} > ${subOption.name}`,
          type: mainOption.type,
        }
      )
      this.setState({
        productFormData: formData,
      })
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
          <View style={{flex: 1}}>
            <View style={styles.optionView}>
              <Text style={styles.headingText}>{option.name}</Text>
              <TouchableOpacity onPress={() => {
                showModal(modalStatusVariable);
              }} style={{flex: 1, alignItems:'flex-end'}}>
                <EvilIcons name='plus' size={30} />
              </TouchableOpacity>
              {this.getOptionModalView(
                modalStatusVariable, 
                option.option_value,
                option,
                onSelected, onClose)}
            </View>
          </View>
        )
      }

      content = (
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>{Strings.OPTIONS}</Text>
          {labels}
        </View>
      );
    }
    return content;
  }

  renderOptionTags = (optionId) => {
    const {productFormData: {product_option}} = this.state;
    let content = null;
    if (product_option.length > 0) {
      content = (
        <View style={{flex: 1, paddingBottom: 20}}>
          <TagInput
            maxHeight={1000}
            tagContainerStyle={{height: 40}}
            value={product_option}
            onChange={(product_option) => {                
              this.setState({
                productFormData: {
                  ...this.state.productFormData,
                  product_option: product_option,
                }
              })
            }}
            labelExtractor={(productOption) => productOption.tagString}
        />
        </View>
      )
    }
    return content;
  }

  renderImages = () => {
    const {images} = this.state;
    let imageData = [];

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const image = images[i];
      let middleContent = null;
      if(image) {
        middleContent = (
          <TouchableOpacity onPress={() => {
            let images = this.state.images;
            images.splice(i,1);
            this.setState({
              ...this.state,
              images,
            })
          }} style={{width: WIDTH/3, aspectRatio: 1}}>
            <CachedImage
              style={{width: WIDTH/3, aspectRatio: 1}}
              source={{uri: image.path}}
            />
          </TouchableOpacity>
        )
      } 
      else {
        middleContent = (
          <View
            style={{width: WIDTH/3, aspectRatio: 1}}
          />
        )
      }
      
      imageData.push(
        <View style={{flex: 1}}>
          {middleContent}
        </View>
      )
    }

    content = (
      <View style={{flex: 1, paddingBottom: 20}}>
        <Text style={styles.titleText}>{Strings.IMAGES}</Text>
        <View style={styles.optionView}>
          <Text style={styles.headingText}>{Strings.ADD_IMAGES}</Text>
          <TouchableOpacity onPress={() => {
            ImagePicker.openPicker({
              mediaType: 'photo',
              cropping: true,
            }).then(image => {
              let images = this.state.images;
              images.push(image)
              console.log(images)
              this.setState({
                ...this.state,
                images,
              })
            });

          }} style={{flex: 1, alignItems:'flex-end'}}>
            <EvilIcons name='plus' size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {imageData}
        </View>
      </View>
    );

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
            {this.renderCategories()}
            {this.renderOptions()}
            {this.renderOptionTags()}
            {this.renderImages()}
            <ArcmallButton 
              title={'save'}
              onPress={this.handleSubmitForm}
            />
          </View>
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
