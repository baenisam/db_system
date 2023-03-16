import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  RefreshControl,
  ImageBackground,
  Animated,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../../services/context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import {ROUTES} from '../../constants';
import moment from 'moment';
import * as config from '../../services/config';
import SearchBar from '../../components/SearchBar';
import PieChart from 'react-native-pie-chart';
import themeContext from '../../constants/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import {Icons} from '../../constants/Icons';
import imgs from '../../constants/imgs';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const Home = () => {
  const COLORS = React.useContext(themeContext);
  const {en, token, refresh} = React.useContext(GlobalContext);
  const [loader, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState({});
  const [invoices, setInvoices] = React.useState([]);
  const navigation = useNavigation();
  let AnimatedHeaderValue = new Animated.Value(0);
  const HeaderMaxheight = 350;
  const headerMinheight = 100;

  //pie chart
  const widthAndHeight = 250;
  const series = [123, 300];
  const sliceColor = [COLORS.primary, 'red'];
  console.log(series);

  const animateHeaderheight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HeaderMaxheight - headerMinheight],
    outputRange: [HeaderMaxheight, headerMinheight],
    extrapolate: 'clamp',
  });

  const getProduts = async () => {
    setLoading(true);
    const one = await axios({
      url: config.BASE_URL + `account/${en && en.id_entreprise}/dashboard`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const two = await axios({
      url:
        config.BASE_URL +
        `facture/${en && en.id_entreprise}/load/${moment().format(
          'YYYY-MM-DD',
        )}/0`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    axios
      .all([one, two])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data.data;
          const responseTwo = responses[1].data.data.liste;
          setStats(responseOne);
          setInvoices(responseTwo);
          setLoading(false);
          // use/access the results
        }),
      )
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProduts();
  }, [en, refresh]);
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
            height: height,
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
              onPress={() => navigation.openDrawer()}
              style={{
                padding: 5,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
              }}>
              <Icons.SimpleLineIcons
                name="menu"
                size={15}
                color={COLORS.white}
              />
            </TouchableOpacity>

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
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
        contentContainerStyle={{flex:1, zIndex:300}}
          refreshControl={<RefreshControl onRefresh={() => getProduts()} refreshing={loader} />}
          showsVerticalScrollIndicator={false}
          style={{zIndex: 200}}>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  color: COLORS.white,
                }}>
                {en ? en.nom_entreprise : null}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  marginTop: -5,
                  fontSize: 14,
                  color: COLORS.white,
                }}>
                {en ? en.categorie : null}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.background,
              flex: 1,
              paddingTop: 0,
              zIndex:200,
              marginTop: 20,
              borderTopRightRadius: 30,
            }}>
            {loader ? (
              <View style={{flex:1}}>
                <SkeletonPlaceholder backgroundColor={COLORS.skele}  borderRadius={4}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                      marginTop: 20,
                      marginBottom: 30,
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        padding: 10,
                        width: (width - 80) / 3,
                        height: (width - 80) / 4,
                        borderRadius: 10,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        padding: 10,
                        width: (width - 80) / 3,
                        height: (width - 80) / 4,
                        borderRadius: 10,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        padding: 10,
                        width: (width - 80) / 3,
                        height: (width - 80) / 4,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <View style={{width:'40%', height:20}}/>
                  </View>
               
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  {data.map(item => (
                   
                      <View
                        style={{
                          width: '100%',
                          height: 70,
                          marginVertical: 5,
                          borderRadius: 5,
                        }}
                      />
           
                  ))}
                </View>
                </SkeletonPlaceholder>
              </View>
            ) : (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PRODUCT_LIST)}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: COLORS.touchable,
                      ...styles.content,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 30,
                        color: COLORS.primary,
                      }}>
                      {stats && stats.count_produit}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 10,
                        color: COLORS.primary,
                        marginTop: -10,
                      }}>
                      Produits
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.USER_LIST)}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: COLORS.touchable,
                      ...styles.content,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 30,
                        color: COLORS.primary,
                      }}>
                      {stats && stats.count_identification}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 10,
                        color: COLORS.primary,
                        marginTop: -10,
                      }}>
                      Utilisateurs
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.OPERATIONS)}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: COLORS.touchable,
                      ...styles.content,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 30,
                        color: COLORS.primary,
                      }}>
                      {stats && stats.count_operations}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 10,
                        color: COLORS.primary,
                        marginTop: -10,
                      }}>
                      Opérations
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 14,
                      color: COLORS.txtblack,
                    }}>
                    Factures recentes
                  </Text>
                </View>
                {invoices.length > 0 ? (
                  invoices.map(item => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ROUTES.INVOICE_DETAILS, {
                          item: item,
                        })
                      }
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                        padding: 10,
                        backgroundColor: COLORS.touchable,
                        marginVertical: 5,
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 16,
                            color: COLORS.txtblack,
                          }}>
                          {item.client}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Light',
                            color: 'gray',
                            fontSize: 12,
                          }}>
                          {moment(item.createdAt).format('DD MMMM YYYY')}
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 16,
                            color: COLORS.txtblack,
                          }}>
                          {item.montant} {en && en.devise}
                        </Text>
                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            backgroundColor:
                              item.etat == 0 ? 'orange' : 'green',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Light',
                              fontSize: 8,
                              color: COLORS.white,
                            }}>
                            {item.etat == 0 ? 'En attente' : 'Confirmée'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 0,
                      paddingHorizontal: 20,
                      flex: 1,
                      height:height
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
                      Aucune facture
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    borderRightWidth: 5,
    borderRightColor: 'orange',
    alignItems: 'center',
    padding: 10,
    width: (width - 80) / 3,
    height: (width - 80) / 4,
    borderRadius: 10,
  },
  contentImage: {
    width: (width - 80) / 6,
    height: (width - 80) / 6,
    borderRadius: (width - 80) / 6,
    resizeMode: 'contain',
  },
  header: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight * 1.2 : 0,
    paddingHorizontal: 20,
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
});
