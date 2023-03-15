import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { ROUTES } from '../../constants';
import { Icons } from '../../constants/Icons';
import imgs from '../../constants/imgs';
import {Button} from '../../components/Button';
import { addToCart } from '../../redux/CartReducer';
import * as config from '../../services/config';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import SearchBar from '../../components/SearchBar';
import { GlobalContext } from '../../services/context';
import themeContext from '../../constants/themeContext';
import { cartTotalSelector } from '../../redux/Selector';
const {width, height} = Dimensions.get('window');
const Categories = (props) => {
  const {sound, en, token} = React.useContext(GlobalContext)
  const COLORS = React.useContext(themeContext)
  const {navigation} = props;
  const [modal, showModal] = React.useState(false);
  const [products, setProduct] = React.useState([]);
  const dispatch = useDispatch();
  const total = useSelector(cartTotalSelector);
const [qty, setQty] = React.useState(1);
const [price, setPrice] = React.useState(qty * 20);
const [selectedlangue, setSelectedLangue] = React.useState([false,false,false])
const [selected, setSelected] = React.useState(false)
const [masterData, setMasterData] = React.useState([])
const [Category, setCategories] = React.useState([]);

let AnimatedHeaderValue = new Animated.Value(0);
const HeaderMaxheight = 90;
const headerMinheight = 0;

const animateHeaderheight = AnimatedHeaderValue.interpolate({
  inputRange: [0, HeaderMaxheight - headerMinheight],
  outputRange: [HeaderMaxheight, headerMinheight],
  extrapolate: 'clamp',
});

const getProduts = async () => {
  const one = await axios({
    url: config.BASE_URL + `produit/${en.id_entreprise}/load`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const two = await axios({
    url: config.BASE_URL + `produit/${en.id_entreprise}/categorie/load`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  axios.all([one, two]).then(axios.spread((...responses) => {
    const responseOne = responses[0].data.data
    const responseTwo = responses[1].data.data
    setProduct(responseOne);
    setMasterData(responseOne);
    setCategories(responseTwo);
  }))
    .catch(err => {
      console.log(err);
    });
};

React.useEffect(() => {
  getProduts();
}, []);

const FilterCategory = (text) => {
  if (text) {
    const newData = masterData.filter((item) => item.id_categorie == text.id);
    setProduct(newData);
    setSelectedLangue(text);
  } else {
    setProduct(masterData);
    setSelectedLangue(text);
  }
};


const calCulate = (value) => {
  setQty(value);
  setPrice(Number(qty) * 20);
}
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.category}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.catTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {
        dispatch(addToCart(item));
      }}
        style={[styles.card_template, index%3==0 ? { marginRight: 0 } : { marginLeft: 5 }]}>
        {item.file == null ? (
          <Image style={styles.card_image} source={imgs.product} />
        ) : (
          <Image style={styles.card_image} source={{uri:config.IMAGE_URL + JSON.parse(item.file)}} />
        )}
        <View style={styles.text_container}>
          <Text style={{color:COLORS.txtWhite,...styles.card_title}}>
          {item.name.length < 10
                ? `${item.name}`
                : `${item.name.substring(0, 10)}...`}
          </Text>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10
          }}>
            <Text style={{
              fontFamily:'Poppins-ExtraBold',
              fontSize:10,
              color:COLORS.txtWhite
            }}>{item.prix_max} $ {}</Text>
   
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemCategory = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {
        FilterCategory(item);
      }}
        style={{}}>
        <View style={{
          paddingVertical:20,
          borderRadius:10,
          paddingHorizontal:5,
          borderBottomColor:'rgba(255,255,255,.3)',
          borderBottomWidth:1,
          backgroundColor:selectedlangue.id == item.id ?  'rgba(255,255,255,.5)': COLORS.bgColor
        }}>
          <Text style={{
            fontFamily:'Poppins-Regular',
            color:COLORS.txtblack,
            fontSize:10
          }}>
          {item.designation.length < 20
                ? `${item.designation}`
                : `${item.designation.substring(0, 20)}...`}
          </Text>          
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background1,
        
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={COLORS.headerWhite}
      />
      
      <View style={{backgroundColor:COLORS.headerWhite,paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,...styles.header}}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
          <SearchBar
                color={COLORS.txtblack}
                colorPlaceholder={'grey'}
                label=""
                iconName='search'
                placeholder="Rechercher par nom"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Suivant"
                amStyle={{
                  marginRight:5
                }}
               
            />
   
        </View>
 
        
        
      </View>
      <View style={{paddingHorizontal: 0, flex: 1, marginTop: 0, flexDirection:'row'}}>
        <FlatList
          contentContainerStyle={{
            paddingTop:10,
            marginRight:10,
            width:(width) /4
          }}

          keyExtractor={(item, index) => item.id}
          data={Category}
          renderItem={renderItemCategory}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          ListEmptyComponent={() =>(
            <View style={{
              flex:1,
              alignItems:'center',
              marginTop:(height - 100) / 5,
              height:height,
              paddingHorizontal:20,
              
            }}>
              <Image source={imgs.empty} style={{
                width:200,
                height:200,
                resizeMode:'contain'
              }} />
              <Text style={{
                fontFamily:'Poppins-Medium',
                fontSize:12,
                color:COLORS.txtblack
              }}>Aucun produit pour cette catégorie</Text>
              <Text style={{
                fontFamily:'Poppins-Light',
                fontSize:10,
                color:COLORS.txtblack
              }}>Aucun produit pour cette catégorie</Text>
            </View>
          )}
          contentContainerStyle={{
            width:width - ((width) /4),
            paddingTop:10,
          }}
         
          keyExtractor={(item, index) => item.id}
          numColumns={3}
          data={products}
          renderItem={renderItemProduct}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width:'100%',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,

  },
  Title:{
    fontFamily:'Poppins-Medium',
    fontSize:16
  },
  subTitle: {
    fontFamily:'Poppins-ExtraBold',
    fontSize:24,
    marginTop:-10,
  },
  category: {
    width: 100,
    marginRight: 5,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  product: {
    width: '45%',
    marginRight: 5,
    marginBottom: 5,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cate: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  image: {
    width: (width - (width) /4),
    height: (width - (width) /4),
    borderRadius: 5,
    resizeMode: 'cover',
  },
  imageProduct: {
    width: (width - (width -20) /4),
    height: (width - (width -20) /4),
    borderRadius: 5,
    resizeMode: 'cover',
  },
  catTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
  card_template: {
    width: (width - (width) /3) /3,
    height: 'auto',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    marginBottom: 5,
    borderRadius:5
    
  },
  card_image: {
    width: '100%',
    height: 200,
    width: (width - (width) /3) /3,
    height: (width - (width) /3) /3,
    borderRadius:5
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  card_title: {
    color: 'white',
    fontFamily:'Poppins-Light',
    fontSize:10
  },
  modal: {
    height: 130,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
