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
} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import imgs from '../../constants/imgs';
import * as config from '../../services/config';
import themeContext from '../../constants/themeContext';
import { data } from '../../constants/DummyData';
import {DataTable} from 'react-native-paper';
import moment from 'moment';
import DatePicker from '../../components/DatePicker';
import {GlobalContext} from '../../services/context';
import {Icons} from '../../constants/Icons';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
const ProductList = ({route, navigation}) => {
  const {token, en} = React.useContext(GlobalContext);
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [state, setState] = React.useState({
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5'],
    widthArr: [40, 60, 80, 100, 120],
  });
  const [loading, setLoading] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const myData = [];


  const getProducts = value => {
    setLoading(true);

    axios({
      url: config.BASE_URL + `produit/${en && en.id_entreprise}/load`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        setStock(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProducts(date);
  }, [date]);

  const COLORS = React.useContext(themeContext);
  const renderItem = ({item, index}) => {
    return (
      <SkeletonPlaceholder direction="left" backgroundColor={COLORS.skele} borderRadius={4}>
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
                backgroundColor: '#fff',
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
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
              }}>
              Liste des produits
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
        </View>
        <View
          style={{
            flex: 1,
            zIndex: 100,
            //paddingTop: 10,
            backgroundColor: COLORS.background,
          }}>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}>
            {loading ? (
              data.map(item => (
                <SkeletonPlaceholder direction="left" backgroundColor={COLORS.skele} borderRadius={4}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      marginHorizontal: 10,
                    }}>
                    <View
                      style={{width: 70, height: 70, borderBottomColor: 5}}
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
                    </View>
                  </View>
                </SkeletonPlaceholder>
              ))
            ) : stock.length > 0 ? (
              stock.map(item => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    padding: 10,
                    backgroundColor: COLORS.touchable,
                    marginVertical: 5,
                    borderRadius: 10,
                    borderLeftWidth: 7,
                    borderLeftColor: COLORS.primary,
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
                    <View
                      style={{
                        marginLeft: 20,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Bold',
                          color: COLORS.txtblack,
                          fontSize: 13,
                        }}>
                        {item.name.length < 15
                          ? `${item.name}`
                          : `${item.name.substring(0, 15)}...`}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: COLORS.primary,
                          fontSize: 10,
                        }}>
                        {item.categorie}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 5,
                          marginRight: 5,
                          height: 5,
                          borderRadius: 5,
                          backgroundColor: COLORS.primary,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Light',
                          color: COLORS.primary,
                          fontSize: 10,
                        }}>
                        {item.qte} pcs
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        color: COLORS.primary,
                        fontSize: 14,
                      }}>
                      {item.prix_max} {en && en.devise}
                    </Text>
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
        </View>
      </View>
    </View>
  );
};

export default ProductList;

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
    width: width * 0.15,
    height: width * 0.15,
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
});
