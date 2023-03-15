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
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';
import {Category, Products} from '../../constants/DummyData';
import {Button} from '../../components/Button';
import { addToCart } from '../../redux/CartReducer';
import { useDispatch, useSelector } from "react-redux";
import SearchBar from '../../components/SearchBar';
import { cartTotalSelector } from '../../redux/Selector';
const {width, height} = Dimensions.get('window');
const CategorieDetails = (props) => {
  const {navigation} = props;
  const {category} = props.route.params;
  const [modal, showModal] = React.useState(false);
  const dispatch = useDispatch();
  const total = useSelector(cartTotalSelector);
const [qty, setQty] = React.useState(1);
const [price, setPrice] = React.useState(qty * 20);

let AnimatedHeaderValue = new Animated.Value(0);
const HeaderMaxheight = 90;
const headerMinheight = 0;

const animateHeaderheight = AnimatedHeaderValue.interpolate({
  inputRange: [0, HeaderMaxheight - headerMinheight],
  outputRange: [HeaderMaxheight, headerMinheight],
  extrapolate: 'clamp',
});
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
      <View
        style={[styles.card_template, index%2==0 ? { marginRight: 5 } : { marginLeft: 5 }]}>
        <Image style={styles.card_image} source={item.image} />
        <View style={styles.text_container}>
          <Text style={styles.card_title}>
          {item.name.length < 20
                ? `${item.name}`
                : `${item.name.substring(0, 20)}...`}
          </Text>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10
          }}>
            <Text style={{
              fontFamily:'Poppins-ExtraBold',
              fontSize:22,
              color:COLORS.white
            }}>{item.price}</Text>
          <TouchableOpacity style={{
            height:30,
            borderRadius:5,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:COLORS.primary,
            width:30
          }} onPress={() => {
            dispatch(addToCart(item));
          }}>
            <Icons.FontAwesome name="plus" size={20} color={COLORS.white}/>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor='transparent'
      />
            <LinearGradient
        style={{width: width, height: 100}}
        colors={[COLORS.primary, '#fff']}>
        <View
          style={{
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 10,
          }}>
               <View style={styles.header}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'flex-start'
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center'
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
              marginRight:5
            }}>
              <Icons.MaterialCommunityIcons name="arrow-left" color={COLORS.black} size={25}/>
            </TouchableOpacity>
            <View>
            <Text style={styles.Title}>Catégorie</Text>
            <Text style={styles.subTitle}>{category.name}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CART_NAVIGATOR)}>
            
           {total ? <View style={{
              backgroundColor:COLORS.primary,
              borderRadius:20,
              justifyContent:'center',
              alignItems:'center',
              position:'absolute',
              zIndex:2,
              right:-4,
              bottom:15,
              width:15,
              height:15
            }}>
              <Text style={{
                fontSize:10,
                color:COLORS.white,
              }}>{total}</Text>
            </View>: null}
          <Icons.Ionicons name="cart" color={COLORS.black} size={25} />
          </TouchableOpacity>
        </View>
        
        
      </View>
          
          
        </View>
      </LinearGradient>
      <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:10,
          alignItems:'flex-start',
          marginTop:30
        }}>
          
          <SearchBar
                color={COLORS.black}
                colorPlaceholder={'grey'}
                label=""
                iconName='search'
                placeholder="Rechercher par nom"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Suivant"
               
                />
        </View>
        
   
      {/*<Animated.View style={{paddingHorizontal: 10, height:animateHeaderheight}}>
        <Text style={styles.cate}>Catégories</Text>
        <FlatList
          data={Category}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Animated.View>*/}
      <View style={{paddingHorizontal: 10, flex: 1, marginTop: 10}}>
        <Text style={styles.cate}>Produits</Text>
        <FlatList
          //ItemSeparatorComponent={() => (<View style={{width:10}}/>)}
             scrollEventThrottle={16}
             onScroll={Animated.event(
               [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
               {useNativeDriver: false},
             )}
          columnWrapperStyle={{justifyContent: 'center'}}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          data={Products}
          renderItem={renderItemProduct}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CategorieDetails;

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    width:'100%',

  },
  Title:{
    fontFamily:'Poppins-ExtraBold',
    color:'#fff',
    fontSize:16
  },
  subTitle: {
    fontFamily:'Poppins-Light',
    color:'black',
    fontSize:12,
    marginTop:-5
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
    color: COLORS.black,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  imageProduct: {
    width: '90%',
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  catTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    color: COLORS.black,
  },
  card_template: {
    width: (width/2) -15,
    height: 200,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    marginBottom: 10,
    
  },
  card_image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    height: 70,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  card_title: {
    color: 'white',
  },
  modal: {
    height: 130,
    width: width,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
