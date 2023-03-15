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
  const {en, token} = React.useContext(GlobalContext);
  const [loader, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState([]);
  const navigation = useNavigation();
  let AnimatedHeaderValue = new Animated.Value(0);
  const HeaderMaxheight = 350;
  const headerMinheight = 100;

  //pie chart
  const widthAndHeight = 250;
  const series = [123,300];
  const sliceColor = [COLORS.primary, 'red'];
  console.log(series)

  const animateHeaderheight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HeaderMaxheight - headerMinheight],
    outputRange: [HeaderMaxheight, headerMinheight],
    extrapolate: 'clamp',
  });

 
  const getProduts = (data) => {
    setLoading(true);
    axios({
      url: config.BASE_URL + `operations/${en && en.id_entreprise}/load/${moment().format('YYYY-MM-DD')}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        setStats(response.data.data.total)
        setLoading(false);
        console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => { 
    getProduts()
  }, [en])

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
              onPress={() => navigation.openDrawer()}
              style={{
                backgroundColor: '#fff',
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
                color={COLORS.primary}
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
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false} style={{flex: 1, zIndex: 100}}>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
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
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-around',
              marginTop: 40,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.PRODUCT_LIST)}
              style={styles.item}>
              <View style={styles.content}>
                <Image
                  source={imgs.prod}
                  style={{tintColor: COLORS.primary, ...styles.contentImage}}
                />
              </View>
              <Text style={{color: COLORS.white, ...styles.itemText}}>
                Produits
              </Text>
            </TouchableOpacity>
            <View style={{width: 20}} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.STOCK)}
              style={styles.item}>
              <View style={styles.content}>
                <Image
                  source={imgs.stock}
                  style={{tintColor: COLORS.primary, ...styles.contentImage}}
                />
              </View>
              <Text style={{color: COLORS.white, ...styles.itemText}}>
                Stock
              </Text>
            </TouchableOpacity>
            <View style={{width: 20}} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.RAPPORTS)}
              style={styles.item}>
              <View style={styles.content}>
                <Image
                  source={imgs.report}
                  style={{tintColor: COLORS.primary, ...styles.contentImage}}
                />
              </View>
              <Text style={{color: COLORS.white, ...styles.itemText}}>
                Rapports
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: COLORS.background,
              flex: 1,
              marginTop:20,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              justifyContent:'center',
              alignItems:'center'
            }}>
              {loader ?
           <SkeletonPlaceholder>
            <View style={{
              width:width * .7,
              height:width * .7,
              borderRadius:width * .7,
            }}/>
           </SkeletonPlaceholder>
           :
           <PieChart
            widthAndHeight={width * .7}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.5}
            coverFill={COLORS.background}
          />}
          <View style={{
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems: 'center',
            marginTop:20
          }}>
            {stats.map(item => (
            <View style={{
                backgroundColor:item.type == 'ENTREE' ? COLORS.primary : 'red',
                paddingHorizontal:20,
                marginLeft:item.type == 'SORTIE' ? 20 : 0,
                paddingVertical:5,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:30
            }}>
              <Text style={{
                fontFamily:'Poppins-Regular',
                fontSize:10,
                color:COLORS.white
              }}>{item.type}</Text>
            </View>
            ))}
    
          </View>
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
