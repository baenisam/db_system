import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput as InputText,
  Keyboard,
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import * as React from 'react';
import {RNCamera} from 'react-native-camera';
import {ROUTES} from '../../constants';
import {Icons} from '../../constants/Icons';
import {SelectList} from 'react-native-dropdown-select-list';
import imgs from '../../constants/imgs';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {Products} from '../../constants/DummyData';
import themeContext from '../../constants/themeContext';
import DialogBox from '../../components/DialogBox';
import {GlobalContext} from '../../services/context';
import NumericInput from 'react-native-numeric-input';
import {Button} from '../../components/Button';
import TextInput from '../../components/InputText';
import * as config from '../../services/config';
import BottomSheet from '../../components/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  increment,
  decrement,
  addToCartOnChange,
  clear,
  removeItem,
} from '../../redux/CartReducer';
import {cartTotalPriceSelector} from '../../redux/Selector';
import {Provider} from 'react-native-paper';
import {CardStyleInterpolators} from '@react-navigation/stack';
const {width, height} = Dimensions.get('window');
const Cart = props => {
  const dispatch = useDispatch();
  const [modal, showModal] = React.useState(false);
  const [modalPartial, showModalPartial] = React.useState(false);
  const [qty, setQty] = React.useState('');
  const [price, setPrice] = React.useState(qty * 20);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const cart = useSelector(state => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const COLORS = React.useContext(themeContext);
  const {displayMessage, forceUpdate, en, token} =
    React.useContext(GlobalContext);

  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];

  const {navigation} = props;

  const AlertItem = () => {
    dispatch(clear());
    showModal(false);
  };

  const editCart = (item, quantity) => {
    if (qty) {
      if (qty > 0) {
        dispatch(addToCartOnChange({item, quantity}));
        setVisible(false);
      } else {
        dispatch(removeItem(selectedItem.id));
        setVisible(false);
      }
    } else {
      dispatch(removeItem(selectedItem.id));
      setVisible(false);
    }
  };

  const goQr = () => {
    setShow(false);
    navigation.navigate(ROUTES.QR);
  };

  const [inputs, setInputs] = React.useState({
    customer: '',
    amount: totalPrice,
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valide = true;

    if (!inputs.customer) {
      hanldeError('Veuillez renseigner ce champ', 'customer');
      valide = false;
    }
    if (!inputs.amount) {
      hanldeError('Veuillez renseigner ce champ', 'amount');
      valide = false;
    }

    if (valide) {
      createOrder(inputs);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const hanldeError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const openModal = () => {
    setInputs({amount: totalPrice});
    showModalPartial(true);
  };

  //create order

  const createOrder = inputs => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setLoad(true);
        axios({
          url: config.BASE_URL + `facture/${en && en.id_entreprise}/create`,
          method: 'post',
          data: {
            montant: inputs.amount,
            table:'Table 4',
            devise: 'USD',
            type: 'CASH',
            client: inputs.customer,
            reste: 0,
          },
          cancelToken: source.token,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
          .then(response => {
            if (response.data.status === 200) {
              setLoad(false);
              let data = response.data.data;
              let promises = [];

              cart.map(item => {
                promises.push(
                  axios({
                    url:
                      config.BASE_URL +
                      `facture/${en.id_entreprise}/detaille/create`,
                    method: 'post',
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                    data: {
                      id_facture: data.id_facture,
                      id_produit: item.id,
                      qte: item.quantity,
                      prix: item.total,
                    },
                    cancelToken: source.token,
                  }),
                );
              });

              Promise.all(promises)
                .then(response => {
                  forceUpdate();
                  clearTimeout(timeout);
                  setLoad(false);
                  displayMessage(
                    'Congratulations',
                    'La commande a été envoyé avec succès',
                    'success',
                  );
                  showModalPartial(false);
                  setInputs({});
                  dispatch(clear());
                })
                .catch(error => {
                  console.log(error);
                  setLoad(false);
                });
            } else {
              setLoad(false);
              console.log(response.data);
              // displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setLoad(false);
            } else if (error.request) {
              console.log(error.request.message);
              setLoad(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setLoad(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setLoad(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const EmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
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
          Le panier est vide
        </Text>
      </View>
    );
  };
  const CartItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          backgroundColor: COLORS.touchable,
          paddingHorizontal: 10,
          marginHorizontal: 10,
          paddingVertical: 10,
        }}>
        {item.file == null ? (
          <Image style={styles.image} source={imgs.product} />
        ) : (
          <Image
            style={styles.image}
            source={{uri: config.IMAGE_URL + JSON.parse(item.file)}}
          />
        )}
        <View style={styles.itemContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: COLORS.txtblack, ...styles.titleItem}}>
                {item.name.length < 20
                  ? `${item.name}`
                  : `${item.name.substring(0, 20)}...`}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.titleItemSub}}>
                {item.prix_max} {en && en.devise}
              </Text>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
              <Icons.FontAwesome name="trash" color={COLORS.shape} size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  color: COLORS.txtblack,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 10,
                }}>
                Quantité
              </Text>
              <Text
                style={{
                  color: COLORS.txtblack,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 10,
                }}>
                Total : {en && en.devise} {item.quantity * item.prix_max}
              </Text>
            </View>
            <View style={{flex: 1, ...styles.cartItemAmount}}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.txtWhite,
                }}
                onPress={() => {
                  if (item.quantity === 1) {
                    dispatch(removeItem(item.id));
                    console.log('removed');
                    return;
                  } else {
                    dispatch(decrement(item.id));
                  }
                }}>
                <Icons.Entypo name="minus" size={18} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setQty(`${item.quantity}`);
                  setVisible(true);
                }}>
                <Text
                  style={{
                    color: COLORS.txtblack,
                    ...styles.cartItemAmountText,
                  }}>
                  {item.quantity}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.txtWhite,
                }}
                onPress={() => {
                  dispatch(increment(item.id));
                }}>
                <Icons.Entypo name="plus" size={18} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Provider>
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
        <View style={{backgroundColor: COLORS.primary, ...styles.header}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.FontAwesome
              name="arrow-left"
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={{color: COLORS.white, ...styles.headerTitle}}>
            Panier
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{width: 20}} />
            <TouchableOpacity
              onPress={() => {
                if (cart.length > 0) {
                  showModal(true);
                }
              }}>
              <Icons.FontAwesome name="trash" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          ListEmptyComponent={EmptyComponent}
          data={cart}
          contentContainerStyle={{
            paddingBottom: height * 0.2,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CartItem item={item} />}
        />
        <View style={{backgroundColor: COLORS.bottom, ...styles.footer}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text style={{color: COLORS.txtblack, ...styles.totall}}>
              Total:{' '}
            </Text>
            <Text style={{color: COLORS.txtblack, ...styles.total}}>
              {totalPrice} {en && en.devise}
            </Text>
          </View>
          <View style={styles.rowBetween}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                onPress={() => {
                  cart.length > 0
                    ? openModal()
                    : displayMessage(
                        'Erreur',
                        'Impossible de continuer, le panier est encore vide',
                        'danger',
                      );
                }}
                label="CASH"
                colorText={COLORS.shape}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: COLORS.shape,
                  height: 40,
                  borderRadius: 5,
                  width: (width - 30) / 2,
                }}
              />
              <View style={{width: 10}} />
              <Button
                onPress={() => {
                  if (cart.length > 0) {
                    setShow(true);
                  }
                }}
                label="TAP & PAY"
                color={COLORS.shape}
                colorText={COLORS.txtWhite}
                containerStyle={{
                  height: 40,
                  borderRadius: 5,
                  width: (width - 30) / 2,
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <BottomSheet
        color={COLORS.background}
        height={0.6}
        show={show}
        allowBgDismiss
        onDismiss={() => setShow(false)}>
        <ScrollView
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}
          style={{}}
          contentContainerStyle={{
            paddingHorizontal: 20,
            alignItems: 'center',
            paddingBottom: 200,
          }}>
          <Image
            source={imgs.tap}
            style={{
              width: 200,
              height: 100,
              resizeMode: 'contain',
              tintColor: COLORS.shape,
            }}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: COLORS.txtblack,
              fontSize: 12,
            }}>
            Entrez le numero de la carte ou scannez le code qr
          </Text>
          <TextInput
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="credit-card"
            placeholder="Ex:0000-0000-0000-0000"
            keyboardAppearance="dark"
            returnKeyType="next"
            keyboardType="numeric"
            returnKeyLabel="Suivant"
          />
          <TouchableOpacity
            onPress={goQr}
            style={{backgroundColor: COLORS.shape, ...styles.qr}}>
            <Icons.AntDesign name="qrcode" color={COLORS.txtWhite} size={30} />
            <Text style={{color: COLORS.txtWhite, ...styles.qrText}}>
              Scanner
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        color={COLORS.background}
        height={0.6}
        show={modalPartial}
        allowBgDismiss
        onDismiss={() => {
          showModalPartial(false);
          setInputs({amount: totalPrice});
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: COLORS.txtblack,
              fontSize: 16,
            }}>
            Informations de la commande
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: COLORS.txtblack,
              fontSize: 12,
            }}>
            Entrez le nom du client et le montant payé
          </Text>

          <TextInput
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            amStyle={{borderRadius: 0}}
            label=""
            iconName="user"
            placeholder="Client"
            keyboardAppearance="dark"
            returnKeyType="next"
            keyboardType="normal"
            returnKeyLabel="Suivant"
            error={errors.customer}
            value={inputs.customer}
            touched={errors.customer}
            onFocus={() => {
              hanldeError(null, 'customer');
            }}
            onChangeText={text => handleOnChange(text, 'customer')}
          />
      
      <View style={{width:width, paddingHorizontal:20, marginTop:20}}>
      <SelectList 
           onSelect={() => alert(selected)}
           setSelected={setSelected} 
       data={data} 
       boxStyles={{
        borderRadius:0
       }}
       labelStyle={{color:COLORS.txtblack}}
       searchPlaceholder="Ecrivez quelques choses"
       dropdownStyles={{color:COLORS.txtblack}}
       dropdownTextStyles={{color:COLORS.txtblack}}
       save="value"

       label="Categories"
      
    />
      </View>
          {/*<TextInput
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            editable={false}
            amStyle={{borderRadius: 0}}
            label=""
            iconName="credit-card"
            placeholder="Montant payé en $"
            keyboardAppearance="dark"
            returnKeyType="next"
            keyboardType="numeric"
            returnKeyLabel="Suivant"
            error={errors.amount}
            value={`${inputs.amount}`}
            touched={errors.amount}
            onFocus={() => {
              hanldeError(null, 'amount');
            }}
            onChangeText={text => handleOnChange(text, 'amount')}
          />*/}
          <Button
            isLoading={load}
            onPress={validate}
            label={`Payer ${inputs.amount} ${en && en.devise}`}
            color={COLORS.primary}
            colorText={COLORS.white}
            containerStyle={{marginTop: 20, borderRadius: 0}}
          />
        </View>
      </BottomSheet>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: width * 0.8,
              padding: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.touchable,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 15,
                color: COLORS.txtblack,
                marginBottom: 10,
              }}>
              Modifier la quantité
            </Text>
            <InputText
              value={qty}
              onChangeText={txt => setQty(txt)}
              style={{
                height: 40,
                borderWidth: 1,
                width: '100%',
                borderColor: COLORS.txtblack,
                paddingHorizontal: 20,
                textAlign: 'center',
                color: COLORS.txtblack,
                borderRadius: 5,
              }}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              keyboardType="numeric"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  width: (width * 0.8 - 50) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 0,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 12,
                    color: COLORS.white,
                  }}>
                  Annuler
                </Text>
              </TouchableOpacity>
              <View style={{width: 10}} />
              <TouchableOpacity
                onPress={() => editCart(selectedItem, qty)}
                style={{
                  paddingHorizontal: 20,
                  width: (width * 0.8 - 50) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: 0,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 12,
                    color: COLORS.white,
                  }}>
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <DialogBox
        visible={modal}
        btnDimiss="NON"
        btnValide="OUI"
        title="Voulez-vous vider le panier ?"
        description="Ces éléments seront supprimés de votre panier..."
        onDismiss={() => showModal(false)}
        onValidate={AlertItem}
      />
    </Provider>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    height: 90,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: width,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 7,
    marginTop: 10,
  },
  image: {
    width: width / 3,
    height: '100%',
    borderRadius: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  total: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 14,
  },
  totall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  itemContent: {
    padding: 10,
    flex: 1,
    zIndex: 100,
  },
  titleItem: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  titleItemSub: {
    fontFamily: 'Poppins-Light',
    color: 'grey',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'red',
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  storeItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  storeItemImg: {
    width: '30%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  storeItemImage: {
    width: '100%',
    height: '100%',
  },
  storeItemInfo: {
    width: '70%',
    padding: 10,
  },
  storeItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeItemPrice: {
    fontSize: 16,
    color: 'red',
  },
  addToCart: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemAmount: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartItemAmountText: {
    fontSize: 14,
    fontFamily: 'Poppins-ExtraBold',
  },
  cartItemRemove: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemRemoveButton: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartFooter: {
    justifyContent: 'space-between',
  },
  qr: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    padding: 10,
  },
  qrText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    fontSize: 16,
  },
});
