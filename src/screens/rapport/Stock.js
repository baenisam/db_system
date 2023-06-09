import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import imgs from '../../constants/imgs';
import * as config from '../../services/config';
import { ROUTES } from '../../constants';
import {data} from '../../constants/DummyData';
import themeContext from '../../constants/themeContext';
import {DataTable} from 'react-native-paper';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
//import DatePicker from '../../components/DatePicker';
import {GlobalContext} from '../../services/context';
import {Icons} from '../../constants/Icons';
import axios from 'axios';
import TextInput from '../../components/InputText';
const {width, height} = Dimensions.get('window');
const Stock = ({route, navigation}) => {
  const {token, en} = React.useContext(GlobalContext);
  const [date, setDate] = React.useState(new Date());

  const [state, setState] = React.useState({
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5'],
    widthArr: [40, 60, 80, 100, 120],
  });
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    getProducts(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const [loading, setLoading] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const myData = [];
  const getProducts = value => {
    setLoading(true);

    axios({
      url: config.BASE_URL + `stock/${en && en.id_entreprise}/load/${value}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        setStock(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProducts(moment(date).format('YYYY-MM-DD'));
  }, [date, en]);

  const COLORS = React.useContext(themeContext);
  const renderItem = ({item, index}) => {
    return (
      <SkeletonPlaceholder backgroundColor={COLORS.skele} borderRadius={4}>
        <View style={{...styles.card_template}} />
      </SkeletonPlaceholder>
    );
  };
  return (
    <View style={{backgroundColor: COLORS.background, ...styles.layout}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={{flex: 1, backgroundColor: COLORS.shape}}>
        <Image
          source={imgs.bg}
          style={{
            width: width,
            height: '100%',
            zIndex: 1,
            opacity: 0.1,
            ...StyleSheet.absoluteFill,
          }}
        />
        <View
          style={{
            width: width,
            zIndex: 100,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
              }}>
              Stock
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                padding: 5,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
              }}>
              <Image
                source={imgs.avatar}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 0,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: width - 70,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: COLORS.white,
                justifyContent: 'center',
                height: 35,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: COLORS.white,
                }}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)}
              style={{
                padding: 10,
                borderRadius: 5,
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}>
              <Icons.FontAwesome
                name="calendar"
                color={COLORS.primary}
                size={15}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            zIndex: 100,
            paddingHorizontal: 0,
            backgroundColor: COLORS.background,
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getProducts(moment(date).format('YYYY-MM-DD'))}
              />
            }
            style={{
              flex: 1,
            }}
            contentContainerStyle={{paddingTop: 30, paddingBottom: 30}}
            showsVerticalScrollIndicator={false}>
            {loading ? (
              data.map(item => (
                <SkeletonPlaceholder backgroundColor={COLORS.skele} key={item.id} borderRadius={4}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      padding: 10,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{width: 100, height: 100, borderBottomColor: 5}}
                    />
                    <View style={{flex: 1, marginLeft: 10}}>
                      <View
                        style={{
                          height: 30,
                          borderBottomColor: 5,
                          marginBottom: 5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 4,
                          borderBottomColor: 5,
                        }}
                      />
                     <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      alignItems:'center'
                     }}>
                       <View
                        style={{
                          height: 20,
                          width: width / 5,
                          borderBottomColor: 5,
                          marginTop:10
                        }}
                      />
                       <View
                        style={{
                          height: 20,
                          width: width / 5,
                          borderBottomColor: 5,
                          marginTop:10
                        }}
                      />
                     </View>
                    </View>
                  </View>
                </SkeletonPlaceholder>
              ))
            ) : stock.length > 0 ? (
              stock.map(item => (
                <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.STOCK_DETAIL, {item:item})}
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    padding: 10,
                    backgroundColor: COLORS.touchable,
                    marginVertical: 5,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 11,
                    },
                    shadowOpacity: 0.57,
                    shadowRadius: 5,

                    elevation: 15,
                  }}
                  key={item.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item.file == null ? (
                      <Image style={styles.card_image} source={imgs.product} />
                    ) : (
                      <Image
                        style={styles.card_image}
                        source={{uri: config.IMAGE_URL + JSON.parse(item.file)}}
                      />
                    )}
                  </View>
                  <View style={{
                    flexDirection:'column'
                  }}>
                    <View style={{
                       width:width - (width * .25) - 50,
                      marginLeft:10
                    }}>
                      <Text style={{
                        fontFamily:'Poppins-Bold',
                        fontSize:16,
                        color:COLORS.txtblack
                      }}>{item.article}</Text>
                      <Text style={{
                        fontFamily:'Poppins-Light',
                        fontSize:12,
                        color:COLORS.txtblack,
                        marginTop:-5
                      }}>{item.categorie}</Text>
                    </View>
                    <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      alignItems:'center',
                      width:width - (width * .25) - 60,
                      marginLeft:10,
                      marginTop:10
                    }}>
                      <Text style={{
                        fontFamily:'Poppins-Bold',
                        fontSize:14,
                        color:COLORS.txtblack
                      }}>PRIX: {item.prix_max} {en.devise}</Text>
                      <Text style={{
                        fontFamily:'Poppins-Bold',
                        fontSize:14,
                        color:COLORS.txtblack
                      }}>QTE: {item.qf}</Text>
                    </View>
                  </View>

                </TouchableOpacity>
              ))
            ) : (
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
          </ScrollView>
          <DatePicker
            modal
            mode="date"
            confirmText="Valider"
            cancelText="Annuler"
            title="Séléctionner une date"
            locale="fr"
            open={isDatePickerVisible}
            date={date}
            onConfirm={date => {
              setDatePickerVisibility(false);
              setDate(date);
              handleConfirm(date);
            }}
            onCancel={() => {
              setDatePickerVisibility(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Stock;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 80) / 4,
    height: (width - 80) / 4,
    borderRadius: (width - 80) / 4,
  },
  contentImage: {
    width: (width - 80) / 6,
    height: (width - 80) / 6,
    borderRadius: (width - 80) / 6,
    resizeMode: 'contain',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontFamily: 'Poppins-Regular'},
  dataWrapper: {marginTop: -1},
  row: {height: 40},
  textCenter: {
    justifyContent: 'center',
    width: 100,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  text1: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'Poppins-ExtraBold',
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    marginTop: -5,
  },
  banner: {
    height: 180,
    width: width / 1.2,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 50,
    marginTop: -120,
  },
  justifyContentBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  card_template: {
    width: width / 2 - 30,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  card_image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 5,
    resizeMode:'stretch',
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
});
