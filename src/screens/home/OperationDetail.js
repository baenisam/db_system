import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../../services/context';
import {ROUTES} from '../../constants';
import SearchBar from '../../components/SearchBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import themeContext from '../../constants/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import * as config from '../../services/config';
import {Icons} from '../../constants/Icons';
import imgs from '../../constants/imgs';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const OperationDetail = () => {
  const COLORS = React.useContext(themeContext);
  const {en, token} = React.useContext(GlobalContext);
  const navigation = useNavigation();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const route = useRoute();
  const {item} = route.params;

  const getProduts = () => {
    setLoading(true);
    axios({
      url: config.BASE_URL + `facture/${en && en.id_entreprise}/by/${item.id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        //console.log(response);
        setItems(response.data.data.detaille);
        console.log(response.data.data.detaille);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProduts();
  }, []);

  return (
    <View style={{backgroundColor: COLORS.background, ...styles.layout}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View
        style={{
          width: width,
          flex: 1,
          backgroundColor: COLORS.shape,
        }}>
        <View
          style={{
            flexDirection: 'row',
            zIndex: 20,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
            paddingHorizontal: 20,
            paddingBottom: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons.MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: COLORS.white,
                marginLeft: 20,
                fontSize: 16,
              }}>
              Detail de l'opération
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Icons.MaterialIcons name="edit" size={25} color={COLORS.white} />
            </TouchableOpacity>
            <View style={{width: 10}} />
            <TouchableOpacity>
              <Icons.MaterialIcons
                name="print"
                size={25}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 50,
            flex: 1,
          }}>
          <View
            style={{
              width: width,
              height: height / 4,
            }}>
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
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  color: COLORS.white,
                }}>
                Montant de la facture
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-ExtraBold',
                  fontSize: 24,
                  color: COLORS.white,
                  marginBottom: 10,
                }}>
                {item.montant}{en && en.devise}
              </Text>
            </View>
            <View
              style={{
                borderTopColor: COLORS.white,
                borderTopWidth: 0.5,
                paddingTop: 10,
                paddingHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#f2f2f2',
                }}>
                Date
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#f2f2f2',
                }}>
                {moment(item.createdAt).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.background,
              flex: 1,
              zIndex: 200,
            }}>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: -50,
                zIndex: 100,
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: 'gray',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.4,
                    width: '100%',
                    marginBottom: 10,
                    fontSize: 16,
                  }}>
                  INFORMATIONS DU CLIENT
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 14,
                    color: 'gray',
                  }}>
                  Nom
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: COLORS.txtblack,
                  }}>
                  {item.client}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 14,
                    color: 'gray',
                  }}>
                  Phone
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: COLORS.txtblack,
                  }}>
                  {item.client_phone == null ? '#' : item.client_phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                zIndex: 100,
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: 'gray',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.4,
                    width: '100%',
                    marginBottom: 10,
                    fontSize: 16,
                  }}>
                  ITEMS
                </Text>
              </View>

              {items.map(data => (
                <View
                  key={data.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginBottom: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 12,
                        color: COLORS.txtblack,
                      }}>
                      {data.designation}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Light',
                        fontSize: 10,
                        color: 'gray',
                      }}>
                      {data.qte} pcs
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    {data.prix} {en && en.devise}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderTopColor: 'gray',
                  borderTopWidth: 0.4,
                  padding: 10,
                  marginTop: 20,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: 'gray',
                    fontSize: 16,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: COLORS.txtblack,
                    fontSize: 16,
                  }}>
                  {item.montant} {en && en.devise}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OperationDetail;

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
