import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
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
const StockDetail = () => {
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
      url:
        config.BASE_URL + `stock/${en && en.id_entreprise}/by/${item.article}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        //console.log(response);
        setItems(response.data.data);
        console.log(response.data.data);
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
    <View style={{backgroundColor: COLORS.shape,flex:1}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />

      <View
        style={{
          width: width,
        }}>
        <View
          style={{
            flexDirection: 'row',
            zIndex: 300,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
            paddingHorizontal: 10,
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
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: COLORS.white,
              marginLeft: 20,
              fontSize: 16,
            }}>
            Detail
          </Text>
          <View style={{flexDirection: 'row', width: 50}}></View>
        </View>
      </View>
      {loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <SkeletonPlaceholder
        direction="left"
        backgroundColor={COLORS.skele}
        borderRadius={4}>
        <View
          style={{
            width: width,
            height: height / 7,
          }}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        direction="right"
        backgroundColor={COLORS.skele}
        borderRadius={4}>
           <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '40%', height: 20}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', height: 60}} />
        </View>
      </SkeletonPlaceholder>
    </View>
  ) : (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl onRefresh={() => getProduts()} refreshing={loading} />
        }
        
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: width,
            height: height / 8,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-ExtraBold',
                fontSize: 24,
                color: COLORS.white,
                marginBottom: -10,
              }}>
              {item.article}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 10,
                color: COLORS.white,
              }}>
              {item.categorie}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: COLORS.background,
            flex: 1,
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              color: COLORS.txtblack,
              marginLeft: 10,
            }}>
            Historique
          </Text>
          {items.map(item => (
            <View
              style={{
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
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: 'gray',
                    fontSize: 12,
                  }}>
                  {moment(item.createdAt).format('DD MMMM YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    QI:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    {item.qi}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    QE:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    {item.qe}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    QS:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    {item.qs}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    QF:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 12,
                      color: COLORS.txtblack,
                    }}>
                    {item.qf}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>)}
    </View>
  );
};

export default StockDetail;

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
