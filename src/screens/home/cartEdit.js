import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ROUTES} from '../../constants';
import {Icons} from '../../constants/Icons';
import {SelectList} from 'react-native-dropdown-select-list';
import imgs from '../../constants/imgs';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {Products} from '../../constants/DummyData';
import {useRoute, useNavigation} from '@react-navigation/native';
import themeContext from '../../constants/themeContext';
import DialogBox from '../../components/DialogBox';
import {GlobalContext} from '../../services/context';
import NumericInput from 'react-native-numeric-input';
import {Button} from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import TextInput from '../../components/InputText';
import * as config from '../../services/config';
import BottomSheet from '../../components/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  increment,
  decrement,
  addToCartOnChange,
  addToCart,
  clear,
  removeItem,
} from '../../redux/CartReducerEdit';
import {cartTotalPriceSelector} from '../../redux/SelectorEdit';
import {Provider} from 'react-native-paper';
import {CardStyleInterpolators} from '@react-navigation/stack';
const {width, height} = Dimensions.get('window');
const CartEdit = () => {
  const dispatch = useDispatch();
  const [modal, showModal] = React.useState(false);
  const [modalPartial, showModalPartial] = React.useState(false);
  const [qty, setQty] = React.useState('');
  const [price, setPrice] = React.useState(qty * 20);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const cart = useSelector(state => state.cartEdit);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const COLORS = React.useContext(themeContext);
  const [products, setProduct] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [masterData, setMasterData] = React.useState([])
  const {displayMessage, LogoutSession, forceUpdate, en,refresh, isConnected, token} =
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

  console.log(cart)

  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  console.log(item)

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
        setProduct(response.data.data);
        setMasterData(response.data.data);
        //console.log(response.data.data);
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
  }, [en,refresh]);

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
    customer:item.client,
    amount: totalPrice,
  });

  const showOpen = () => {
    openModal()
  }
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
          url: config.BASE_URL + `facture/${en && en.id_entreprise}/update/${item.id}`,
          method: 'PUT',
          data: {
            montant: totalPrice,
            table: 'Table 4',
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
              let promises = [];
              cart.map(itemm => {
                promises.push(
                  axios({
                    url:config.BASE_URL + `facture/${en.id_entreprise}/detaille/create`,
                    method: 'POST',
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                    data: {
                      id_facture: item.id,
                      id_produit: itemm.id,
                      qte: itemm.quantity,
                      prix: itemm.total,
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
               
                  //setInputs({});
                  //showModalPartial(false);
                  dispatch(clear());
                
                  navigation.goBack();
                  displayMessage(
                    'Congratulations',
                    'La facture a été modifiée avec succès',
                    'success',
                  );
                  
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
          justifyContent: 'center',
          alignItems: 'center',
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

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const nom = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return nom.indexOf(textData) > -1 ;
      });
      setProduct(newData);
      setSearch(text);
    } else {
      setProduct(masterData);
      setSearch(text);
    }
  };

  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(addToCart(item));
        }}
        style={{
          backgroundColor: COLORS.touchable,
          height: 'auto',
          marginLeft: 10,
          borderRadius: 10,
          width: (width - 20) / 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        {item.file == null ? (
          <Image style={styles.card_image1} source={imgs.product} />
        ) : (
          <Image
            style={styles.card_image1}
            source={{uri: config.IMAGE_URL + JSON.parse(item.file)}}
          />
        )}
        <View
          style={{
            width: '100%',
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: COLORS.txtblack,
              fontFamily: 'Poppins-Light',
              fontSize: 10,
            }}>
            {item.name.length < 10
              ? `${item.name}`
              : `${item.name.substring(0, 10)}...`}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-ExtraBold',
              fontSize: 8,
              color: COLORS.txtblack,
            }}>
            {item.prix_max} {en.devise}
          </Text>
        </View>

      </TouchableOpacity>
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
              <Icons.FontAwesome name="trash" color={'red'} size={20} />
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
                  fontSize: 8,
                }}>
                Quantité
              </Text>
              <Text
                style={{
                  color: COLORS.txtblack,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 8,
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
              style={{paddingHorizontal:10,paddingVertical:2,borderRadius:5, borderWidth:1, borderColor:COLORS.txtblack}}
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
        <View
          style={{
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
            backgroundColor: COLORS.shape,

            zIndex: 100,
            ...styles.header,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 100,
            }}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.goBack();
                dispatch(clear());
              }}>
              <Icons.Feather name="arrow-left" color={COLORS.white} size={20} />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  color: '#fff',
                }}>
                Modifier la facture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (cart.length > 0) {
                  showModal(true);
                }
              }}>
              <Icons.FontAwesome name="trash" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 10,
              paddingBottom: 10,
            }}>
            <SearchBar
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              amStyle={{borderRadius: 0}}
              label=""
              iconName="search"
              placeholder="Rechercher un produit"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              value={search}
              onChangeText={(text) => searchFilter(text)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              fontSize: 12,
              color: COLORS.txtblack,
            }}>
            Produits
          </Text>
        </View>
        <View style={{height: 160}}>
          {isLoading ? (
            <FlatList
         
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <SkeletonPlaceholder
                  direction="left"
                  backgroundColor={COLORS.skele}
                  borderRadius={4}>
                  <View
                    style={{
                      height:150,
                      marginLeft: 10,
                      borderRadius: 10,
                      width: (width - 20) / 4,
                     
                    }}/>
                </SkeletonPlaceholder>
              )}
            />
          ) : (
            <FlatList
            ListEmptyComponent={() => (
              <View
                style={{
                  width:width,
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                <Image
                  source={imgs.empty}
                  style={{
                    width: 100,
                    height: 100,
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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => getProduts()}
              />
            }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                paddingTop: 10,
              }}
              keyExtractor={(item, index) => item.id}
              data={products}
              renderItem={renderItemProduct}
            />
          )}
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10, paddingBottom:10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              fontSize: 12,
              color: COLORS.txtblack,
            }}>
            Dans le panier
          </Text>
        </View>
        <FlatList

          ListEmptyComponent={EmptyComponent}
          data={cart}
          contentContainerStyle={{
            paddingBottom: height * 0.2,
            flexGrow: 1,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text style={{color: COLORS.txtblack, ...styles.totall}}>
              Client:{' '}
            </Text>
            <Text style={{color: COLORS.txtblack, ...styles.total}}>
              {item.client}
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
              isLoading={load}
                onPress={() => {
                  cart.length > 0
                    ? validate()
                    : displayMessage(
                        'Erreur',
                        'Impossible de continuer, le panier est encore vide',
                        'danger',
                      );
                }}
                label="Enregistrer"
                color={COLORS.shape}
                colorText={COLORS.txtWhite}
                containerStyle={{
                  height: 40,
                  borderRadius: 5,
                  width: '100%',
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

          <View style={{width: width, paddingHorizontal: 20, marginTop: 20}}>
            <SelectList
              onSelect={() => alert(selected)}
              setSelected={setSelected}
              data={data}
              boxStyles={{
                borderRadius: 0,
              }}
              labelStyle={{color: COLORS.txtblack}}
              searchPlaceholder="Ecrivez quelques choses"
              dropdownStyles={{color: COLORS.txtblack}}
              dropdownTextStyles={{color: COLORS.txtblack}}
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

export default CartEdit;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width: '100%',
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
    width: width / 4,
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  total: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 12,
    marginLeft: 10,
  },
  totall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  itemContent: {
    padding: 10,
    flex: 1,
    zIndex: 100,
  },
  titleItem: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
  titleItemSub: {
    fontFamily: 'Poppins-Light',
    color: 'grey',
    fontSize: 8,
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
  card_template1: {
    width: (width - 20) / 4,
    height: 100,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  card_image1: {
    width: '100%',
    height: 80,
    borderRadius: 5,
    resizeMode: 'contain',
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
    fontSize: 12,
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
