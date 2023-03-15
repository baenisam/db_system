import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
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
import {ROUTES} from '../../constants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Icons} from '../../constants/Icons';
import {Button} from '../../components/Button';
import {GlobalContext} from '../../services/context';
import themeContext from '../../constants/themeContext';
import * as config from '../../services/config';
import {addToCart} from '../../redux/CartReducer';
import langContext from '../../constants/langContext';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import PosLoader from '../loaders/PosLoader';
import axios from 'axios';
import {cartTotalSelector} from '../../redux/Selector';
import imgs from '../../constants/imgs';
const {width, height} = Dimensions.get('window');
const Notifications = ({navigation}) => {
  const {userData, token, entreprise, LogoutSession, en, clearAllData} =
    React.useContext(GlobalContext);
  const tr = React.useContext(langContext);
  const COLORS = React.useContext(themeContext);
  const [modal, showModal] = React.useState(false);
  const dispatch = useDispatch();
  const total = useSelector(cartTotalSelector);
  const [qty, setQty] = React.useState(1);
  const [price, setPrice] = React.useState(qty * 20);
  const [products, setProduct] = React.useState([]);
  const [imag, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  let AnimatedHeaderValue = new Animated.Value(0);
  const HeaderMaxheight = 90;
  const headerMinheight = 0;

  const animateHeaderheight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HeaderMaxheight - headerMinheight],
    outputRange: [HeaderMaxheight, headerMinheight],
    extrapolate: 'clamp',
  });

  const getProduts = () => {
    setLoading(true);
    axios({
      url: config.BASE_URL + `produit/${en && en.id_entreprise}/load`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        console.log(response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          if (error.response.status === 402) {
            LogoutSession();
          }
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setLoading(false);
        }
      });
  };

  React.useEffect(() => {
    getProduts();
  }, [en]);

  const data = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 11},
    {id: 12},
    {id: 13},
    {id: 14},
    {id: 15},
    {id: 16},
    {id: 17},
  ];

  const renderItem = ({item, index}) => {
    return (
      <SkeletonPlaceholder direction="left" backgroundColor={COLORS.skele} borderRadius={4}>
        <View style={{...styles.card_template}} />
      </SkeletonPlaceholder>
    );
  };

  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROUTES.PRODUCT_DETAILS, {item: item})
        }
        style={[
          styles.card_template,
          index % 2 == 0 ? {marginRight: 5} : {marginLeft: 5},
        ]}>
        {item.file == null ? (
          <Image style={styles.card_image} source={imgs.product} />
        ) : (
          <Image
            style={styles.card_image}
            source={{uri: config.IMAGE_URL + JSON.parse(item.file)}}
          />
        )}
        <View style={styles.text_container}>
          <Text style={styles.card_title}>
            {item.name.length < 15
              ? `${item.name}`
              : `${item.name.substring(0, 15)}...`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-ExtraBold',
                fontSize: 15,
                color: COLORS.white,
              }}>
              {item.prix_max} {en && en.devise}
            </Text>
            <TouchableOpacity
              style={{
                height: 30,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: 30,
              }}
              onPress={() => {
                dispatch(addToCart(item));
              }}>
              <Icons.FontAwesome name="plus" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
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
        backgroundColor={'transparent'}
      />
   
      <View
        style={{
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
          backgroundColor: COLORS.shape,
          zIndex:100,
          ...styles.header,
        }}>
              <Image
          source={imgs.bg}
          style={{
            width: width,
            //height: '100%',
            zIndex: 1,
            opacity: 0.1,
            ...StyleSheet.absoluteFill,
          }}
        />
         
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex:100
          }}>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.openDrawer()}>
            <Icons.Feather name="menu" color={COLORS.white} size={20} />
          </TouchableOpacity>
          <View>
          <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
              }}>
              Db System
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CART)}>
            {total ? (
              <View
                style={{
                  backgroundColor: 'red',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 2,
                  padding:2,
                  right: -4,
                  bottom: 15,

                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: COLORS.white,
                  }}>
                  {total}
                </Text>
              </View>
            ) : null}
            <Icons.Ionicons name="cart" color={COLORS.white} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 10,
          }}>
          <SearchBar
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="search"
            placeholder="Rechercher par nom"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
          />
        </View>
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
      <View style={{paddingHorizontal: 10,zIndex:100, flex: 1, marginTop: 0}}>
        <Text style={{color: COLORS.txtblack, ...styles.cate}}>Produits</Text>
        {loading ? (
          <FlatList
            //ItemSeparatorComponent={() => (<View style={{width:10}}/>)}
            scrollEventThrottle={16}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            refreshControl={<RefreshControl onRefresh={() => getProduts()} />}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginTop: (height - 100) / 5,
                  height: height,
                  paddingHorizontal: 20,
                }}>
                <Image
                  source={imgs.empty}
                  style={{
                    width: 300,
                    height: 300,
                    tintColor: COLORS.primary,
                    resizeMode: 'contain',
                  }}
                />

                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 10,
                    color: COLORS.txtblack,
                  }}>
                  Aucun produit
                </Text>
              </View>
            )}
            //ItemSeparatorComponent={() => (<View style={{width:10}}/>)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
              {useNativeDriver: false},
            )}
            columnWrapperStyle={{}}
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            data={products}
            renderItem={renderItemProduct}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width: '100%',
  },
  Title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 24,
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
  },
  card_template: {
    width: width / 2 - 15,
    height: 200,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    marginBottom: 10,
  },
  card_image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
