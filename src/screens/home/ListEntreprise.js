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
const ListEntreprise = props => {
  const COLORS = React.useContext(themeContext);
  const {en, token,getEntreprise,refresh, isLoading, allEntreprise} = React.useContext(GlobalContext);
  const [date, setDate] = React.useState(new Date());
  const maskRowHeight = Math.round((height - 200) / 20);
  const maskColWidth = (width - 200) / 2;
  const {navigation} = props;
  const [modalQ, showModalQ] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);
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


  React.useEffect(() => {
    getEntreprise()
  }, [en,refresh]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems:'center',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
            }}
            source={imgs.logo}
          />
          <View style={{marginLeft: 10, width: '60%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: COLORS.txtblack,
              }}>
              {item.nom_entreprise}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                color: 'gray',
                fontSize: 12,
              }}>
              {item.categorie}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {item.fonction == 'Super Admin' && <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.EDIT_ENTREPRISE, {item:item})}
            style={{
              padding: 10,
              borderRadius:5,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons.FontAwesome name="edit" color={COLORS.white} size={20} />
          </TouchableOpacity>}
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
            onPress={() => navigation.goBack()}>
            <Icons.FontAwesome
              name="arrow-left"
              color={COLORS.white}
              size={15}
            />
          </TouchableOpacity>
          <Text style={{color: COLORS.white, ...styles.title}}>
            Mes entreprises
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ADD_ENTREPRISE)}
            style={{...styles.IconBtn}}>
            <Icons.FontAwesome
              name="plus-circle"
              color={COLORS.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
        }}>
        {isLoading ? (
        <FlatList
        style={{flex: 1}}
        data={data}
        contentContainerStyle={{paddingHorizontal: 10}}
        keyExtractor={item => item.id}
        renderItem={item => (
          <SkeletonPlaceholder direction="left" backgroundColor={COLORS.skele} borderRadius={4}>
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
                onRefresh={() => getEntreprise()}
              />
            }
            style={{flex: 1}}
            data={allEntreprise}
            keyExtractor={item => item.id_entreprise}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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

export default ListEntreprise;

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
