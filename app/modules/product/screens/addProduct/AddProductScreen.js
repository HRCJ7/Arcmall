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
import {getOptions, getCategorydata, filterCategory, getCategoryFromId, addMainImage, uploadImage, addItem} from './Apis';
import {Item, Input} from 'native-base';
import t from 'tcomb-form-native';
import {getUser } from '../../../../store/AsyncStorageHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ArcmallButton from '../../../shared/components/arcmallButton/ArcmallButton';
import { getForm } from '../../../../services/RestService';
import { ListItem } from 'react-native-elements'
import Theme, { showToast } from '../../../../theme/Base';
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


        //Formatted to POST
        name : null,
        description: null,
        quantity : null,
        price : null,
        weight : null,
        model: 'model',
        
        category: [],
        product_option: [],

        customer_id : null,
        // currency_code : null,

        // height : null,
        // length: null,
        // width: null,
      },
    }
    this.getData();
  }

  componentDidMount() {
    // addMainImage();
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  setLoadingState = (state) => {
    this.setState({
      productFormData: this.state.productFormData,
      isLoading: state,
    })
  }

  addItem = async () => {
    const {errors} = this.refs.form.validate();
    const {productFormData: {category}, images} = this.state;
    const allFieldsFilled = errors.length === 0;
    const categorySelected = category.length > 0;
    const imagesSelected = images.length > 0;
    
    if (allFieldsFilled && categorySelected && imagesSelected) {
      this.setLoadingState(true);
    
      const {product_option: stateOption, category: stateCategory} = this.state.productFormData;

      let requestBody = {...this.state.productFormData};

      let category = null;
      let product_option = null;
      for (const catData of stateCategory) {
        category = category? category: [];
        category.push(catData.category_id);
      }
      requestBody.category = category;

      let output = [];

      requestBody.product_option.forEach(function(item) {
        var existing = output.filter(function(v, i) {
          return v.option_id == item.option_id;
        });
        if (existing.length > 0) {
          let existeingOption = existing[0];
          console.log('TCL: addItem -> existeingOption', existeingOption)
          const concatValues = existeingOption.product_option_value.concat([
            {
              option_value_id: item.option_value_id,
            }
          ]);
          existeingOption.product_option_value = concatValues;
        } else {
          output.push({
            option_id: item.option_id,
            type: item.type,
            product_option_value: [
              {
                option_value_id: item.option_value_id,
              }
            ],
          })
        }
      });

      if (output.length > 0) {
        requestBody.product_option = output;
      } else {
        delete requestBody.product_option;
      }
    
      let form = getForm(requestBody);
      console.log(form);
      console.log(form);
      let response = null;
      try {
        response = await addItem(form);
        
        if (response.product_id) {
          console.log('upload data success');
          this.setState({
            productId: response.product_id,
          }, () => {
            this.uploadImages(response.product_id);
          })
        } else {
          this.setLoadingState(false);
          showToast('Something went wrong. Please check your values');
        }
        
      } catch (error) {
        this.setLoadingState(false);
        console.log(error)
        showToast('Something went wrong.');
      }
    } else {
      let string = '';
      if (!allFieldsFilled) {
        string = string + Strings.ENTER_ALL_FIELDS;
      }
      if (!categorySelected) {
        string = string + Strings.ENTER_CATEGORY;
      }
      if (!imagesSelected) {
        string = string + Strings.ENTER_IMAGE;
      }

      alert(string);
    }
  }

  uploadImages = async (productId) => {
    const {images} = this.state;

    let uploadImageCount = 0;
    let imageCount = images.length;

    let response = null;

    try {
      for(const image of images) {
        console.log('uploading image', uploadImageCount + 1);
        response = await uploadImage(image, productId, uploadImageCount == 0);
        console.log(response)
        uploadImageCount = uploadImageCount + 1;
        response = null;
      }
    } catch (err) {
      showToast('Something went wrong With images.');
    }

    console.log('uploading image completed');
    
    this.setLoadingState(false);
    this.props.navigation.goBack();
  }
  
  getData = async () => {
    const options = await getOptions();
    let allOptions = [];

    for (const option of options) {
      const {type} = option;
      if (type === 'select') {
        allOptions.push(option)
      }
    }


    const user = await getUser();
    const {formatted, unformatted} = await getCategorydata();
    
    this.setState({
      productOptions: allOptions,
      allCategories: unformatted,
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
        title={Strings.ADD_ITEM}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }


  onFormChange = async (value) => {
    const {productFormData} = this.state;
    let stateObj = {
      productFormData: {
        ...productFormData,
        ...value,
      }
    }

    this.setState(stateObj);
  }

  textInputTemplate = (locals) => {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>{locals.label}</Text>
        <TextInput
          onChangeText={(value) => {
            locals.onChange(value)
          }}
        style={styles.textInput} />
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

  renderForm = (data) => {
    let content = null;
    let Form = t.form.Form;
    const {productFormData, productOptions} = this.state;
    if (productOptions) {
      let options = {
        fields: {
          name: {
            label: Strings.ADD_PRODUCT_NAME,
            template: this.textInputTemplate,
          },
          description: {
            label: Strings.ADD_PRODUCT_DESC,
            template: this.textInputTemplate,
          },
          quantity: {
            label: Strings.ADD_PRODUCT_QUANTITY,
            template: this.textInputTemplate,
          },
          price: {
            label: Strings.ADD_PRODUCT_PRICE,
            template: this.textInputTemplate,
          },
          weight: {
            label: Strings.ADD_PRODUCT_WEIGHT,
            template: this.textInputTemplate,
          }
        }
      };
  
      let Product = t.struct({
        name: t.String, 
        description: t.String,
        quantity: t.Number,
        price: t.Number,
        weight: t.Number,
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
      goBackFrom: this.props.navigation.state.key,
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
      
      let formData = {...productFormData};
      formData.product_option.push(
        {
          option_id: mainOption.option_id,
          option_value_id: subOption.option_value_id,
          tagString: `${mainOption.name} > ${subOption.name}`,
          type: mainOption.type,
          product_option_value: [],
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
          <TouchableOpacity 
            style={{flex: 1, alignItems:'flex-end'}}
            onPress={() => {
            if (this.state.images.length !== IMAGE_COUNT) {
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
            }
          }}>
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
              title={Strings.ADD_ITEM}
              onPress={this.addItem}
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
