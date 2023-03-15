import {
  StyleSheet,
  Text,
  StatusBar,
  Keyboard,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ROUTES} from '../../constants';
import React from 'react';
import {Button} from '../../components/Button';
import themeContext from '../../constants/themeContext';
import imgs from '../../constants/imgs';
import {addToCart, addToCartEdit} from '../../redux/CartReducer';
import TextInputA from '../../components/InputTextA';
import langContext from '../../constants/langContext';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import { GlobalContext } from '../../services/context';
import PosLoader from '../loaders/PosLoader';
import axios from 'axios';
import {cartTotalSelector} from '../../redux/Selector';
import {Icons} from '../../constants/Icons';
const {width, height} = Dimensions.get('window');
const ProductDetail = ({route, navigation}) => {
  const {item} = route.params;
  const COLORS = React.useContext(themeContext);
  const {en} = React.useContext(GlobalContext);
  const dispatch = useDispatch();
  const total = useSelector(cartTotalSelector);
  const [inputs, setInputs] = React.useState({
    quantity: "1"
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valide = true;

    if (!inputs.quantity) {
      hanldeError('Quantité vide non valide', 'quantity');
      valide = false;
    } 
    if (valide) {
      dispatch(addToCartEdit({item, inputs}));
      navigation.pop()
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const hanldeError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      {item.file == null ? (
        <ImageBackground
          style={{
            height: height / 1.4,
            width: width,
          }}
          imageStyle={{
            resizeMode: 'contain',
          }}
          source={imgs.product}>
          <View
            style={{
              width: width,
              zIndex: 10,
              paddingTop: 50,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 5,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 25,
                  height: 25,
                }}>
                <Icons.FontAwesome
                  name="arrow-left"
                  size={10}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: COLORS.txtblack,
                  fontSize: 15,
                }}>
                Detail du produit
              </Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  backgroundColor: COLORS.primary,
                }}
                onPress={() => navigation.navigate(ROUTES.CART)}>
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
                <Icons.Ionicons name="cart" color={COLORS.white} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{
            height: height / 1.4,
            width: width,
          }}
          source={imgs.img11}>
          <View
            style={{
              width: width,
              zIndex: 10,
              paddingTop: 50,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 5,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 25,
                  height: 25,
                }}>
                <Icons.FontAwesome
                  name="arrow-left"
                  size={10}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: COLORS.txtblack,
                  fontSize: 15,
                }}>
                Detail du produit
              </Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  backgroundColor: COLORS.primary,
                }}
                onPress={() => navigation.navigate(ROUTES.CART)}>
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
                <Icons.Ionicons name="cart" color={COLORS.white} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
      <View
        style={{
          backgroundColor: COLORS.background,
          zIndex: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -50,
          flex: 1,
        }}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{
            width:'50%'
          }}>
            <Text
              style={{
                fontFamily: 'Poppins-ExtraBold',
                color: COLORS.txtblack,
                fontSize: 20,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 16,
                color: 'gray',
              }}>
              {item.categorie}
            </Text>
          </View>
          <View style={{
            backgroundColor:COLORS.primary,
            paddingHorizontal:20,
            paddingVertical:5,
            borderRadius:20,
            height:40
          }}>
            <Text
              style={{
                fontFamily: 'Poppins-ExtraBold',
                color: COLORS.white,
                fontSize: 20,
              }}>
              {item.prix_max} {en && en.devise}
            </Text>
          </View>
        </View>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 50}}>
          <Text
            style={{
              fontFamily: 'Poppins-regular',
              fontSize: 14,
              color: COLORS.txtblack,
              textAlign: 'justify',
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not

          </Text>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            flexDirection:'row',
            width:width,
            padding: 10,
            left: 0,
            bottom: 10,
            right: 0,
            backgroundColor: COLORS.background,
          }}>
            <TextInputA
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              label=""
              isCart={true}
              amStyle={{width:'30%', borderRadius:30}}
              iconName="lock"
              placeholder={'Quantity'}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              keyboardType="numeric"
              error={errors.quantity}
              value={inputs.quantity}
              touched={errors.quantity}
              onFocus={() => {
                hanldeError(null, 'quantity');
              }}
              onChangeText={text => handleOnChange(text, 'quantity')}
            />
            <View style={{width:20}}/>
          <TouchableOpacity
            onPress={validate}
            style={{
              flexDirection: 'row',
              flex:1,
              height:50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              padding: 10,
              backgroundColor: COLORS.primary,
            }}>
            <Icons.Fontisto
              name="shopping-basket-add"
              size={20}
              color={COLORS.white}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: COLORS.white,
                marginLeft: 10,
                fontSize: 14,
              }}>
              Ajouter au penier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
