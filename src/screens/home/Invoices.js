import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  RefreshControl,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icons} from '../../constants/Icons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as config from '../../services/config';
import {GlobalContext} from '../../services/context';
import {ROUTES} from '../../constants';
import DatePicker from 'react-native-date-picker';
import imgs from '../../constants/imgs';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import themeContext from '../../constants/themeContext';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const Invoices = props => {
  const COLORS = React.useContext(themeContext);
  const {en, refresh, token} = React.useContext(GlobalContext);
  const [date, setDate] = React.useState(new Date());
  const maskRowHeight = Math.round((height - 200) / 20);
  const maskColWidth = (width - 200) / 2;
  const {navigation} = props;
  const [modalQ, showModalQ] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [masterData, setMasterData] = React.useState([]);
  const [total, setTotal] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    getProduts(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
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

  const getProduts = data => {
    setLoading(true);
    axios({
      url: config.BASE_URL + `facture/${en && en.id_entreprise}/load/${data}/0`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        //console.log(response);
        setInvoices(response.data.data.liste);
        setMasterData(response.data.data.liste);
        setLoading(false);
        setTotal(response.data.data.total);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProduts(moment(date).format('YYYY-MM-DD'));
  }, [en, refresh]);

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const nom = item.client ? item.client.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return nom.indexOf(textData) > -1;
      });
      setInvoices(newData);
      setSearch(text);
    } else {
      setInvoices(masterData);
      setSearch(text);
    }
  };
  const renderItem = ({item}) => {
    return (
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
              backgroundColor: item.etat == 0 ? 'orange' : 'green',
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
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background1,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={{
          backgroundColor: COLORS.shape,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          ...styles.header,
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
          <Text style={{color: COLORS.white, ...styles.title}}>Factures</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SETTINGS_NAVIGATOR)}
            style={{...styles.IconBtn}}>
            <Icons.FontAwesome name="cog" color={COLORS.txtWhite} size={20} />
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <SearchBar
            value={search}
            onChangeText={txt => searchFilter(txt)}
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="search"
            placeholder="Rechercher par client"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            amStyle={{
              marginRight: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
        }}>
        {loading ? (
          <FlatList
            style={{flex: 1}}
            data={data}
            contentContainerStyle={{paddingHorizontal: 10}}
            keyExtractor={item => item.id}
            renderItem={item => (
              <SkeletonPlaceholder
                direction="left"
                backgroundColor={COLORS.skele}
                borderRadius={4}>
                <View
                  style={{
                    width: '100%',
                    height: 70,
                    marginVertical: 5,
                    borderRadius: 5,
                  }}
                />
              </SkeletonPlaceholder>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <>
            <FlatList
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
                    Aucune facture
                  </Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  onRefresh={() =>
                    getProduts(moment(date).format('YYYY-MM-DD'))
                  }
                />
              }
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 100,
              }}
              style={{flex: 1}}
              data={invoices}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'space-between',
            bottom: 0,
            left: 0,
            eight: 0,
            width: width,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              height: 50,
              alignItems: 'center',
              paddingVertical: 5,
              width: '100%',
              backgroundColor: COLORS.primary,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                color: COLORS.white,
                fontSize: 16,
                marginRight: 10,
              }}>
              Total:
            </Text>
            {loading ? (
              <ActivityIndicator size={15} color={COLORS.white} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: COLORS.white,
                  fontSize: 16,
                }}>
                {total} {en.devise}
              </Text>
            )}
          </View>
        </View>
      </View>
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
    </SafeAreaView>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width: '100%',
  },
  button: {
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  IconBtn: {
    borderRadius: 3,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: height,
    width: width,
    borderRadius: 10,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 200,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},
  scrollViewStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
});
