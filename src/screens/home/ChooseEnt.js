import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ROUTES } from '../../constants';
import React from 'react';
import Loader from './Loader';
import {Icons} from '../../constants/Icons';
import {GlobalContext} from '../../services/context';
import themeContext from '../../constants/themeContext';
import { useNavigation } from '@react-navigation/native';
import imgs from '../../constants/imgs';
import DialogBox from '../../components/DialogBox';
const {width, height} = Dimensions.get('window');
const ChooseEnt = props => {
  const COLORS = React.useContext(themeContext);
  const {navigation} = props;
  const {userData, ShoosedEntreprise,getEntreprise, allEntreprise, Logout, isLoading} =
    React.useContext(GlobalContext);
  const [modal, showModal] = React.useState(false);
  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => ShoosedEntreprise(item)}
        style={[
          styles.card_template,
          {
            backgroundColor: COLORS.touchable,
            justifyContent: 'center',
            alignItems: 'center',
          },
          index % 2 == 0 ? {marginRight: 5} : {marginLeft: 5},
        ]}>
        <Image style={{tintColor:COLORS.primary, ...styles.card_image}} source={imgs.logo} />
        <Text
          style={{
            color: COLORS.txtblack,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          }}>
          {item.nom_entreprise}
        </Text>
        <Text
          style={{
            color: COLORS.txtblack,
            fontFamily: 'Poppins-Light',
            fontSize: 12,
          }}>
          {item.categorie}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />


      <View
        style={{
          height: height / 6,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View>
          <Text style={styles.desc}>Sélectionnez l'entreprise,{"\n"}succursale ou organisation</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20,
            backgroundColor:COLORS.white,
            paddingVertical:5,
            paddingHorizontal:20
          }} onPress={() => {navigation.navigate(ROUTES.ADD_ENTREPRISE)}}>
            <Icons.FontAwesome name="plus" size={16} color={COLORS.primary} />
            <Text style={{
              fontFamily:'Poppins-ExtraBold',
              fontSize:12,
              color:COLORS.primary,
              marginLeft:10
            }}>Nouvelle</Text>
          </TouchableOpacity>
          <View style={{width: 10}} />
          
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.background,
        }}>
        <Image
          source={imgs.logo}
          style={{
            alignSelf: 'center',
            marginTop: height / 5,
            opacity: 0.1,
            ...StyleSheet.absoluteFill,
          }}
        />
        <FlatList
        refreshControl={<RefreshControl onRefresh={() => getEntreprise()} refreshing={isLoading} />}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: (height - 100) / 5,
                height: height,
                paddingHorizontal: 50,
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
                  fontSize: 12,
                  color: COLORS.txtblack,
                  textAlign: 'center',
                }}>
                Votre compte n'est associé à aucune entreprise
              </Text>
            </View>
          )}
          //ItemSeparatorComponent={() => (<View style={{width:10}}/>)}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingHorizontal: 10, paddingTop: 20}}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          data={allEntreprise}
          renderItem={renderItemProduct}
          showsVerticalScrollIndicator={false}
        />
        <DialogBox
          visible={modal}
          btnDimiss="NON"
          btnValide="OUI"
          title="Voulez-vous vider le panier ?"
          description="Ces éléments seront supprimés de votre panier..."
          onDismiss={() => showModal(false)}
          onValidate={() => {
            //navigation.closeDrawer();
            showModal(false);
            Logout();
          }}
        />
      </View>
    </View>
  );
};

export default ChooseEnt;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    marginTop: 10,
    fontSize: 24,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 14,
  },
  header: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  subTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 24,
    marginTop: -10,
  },
  category: {
    width: 100,
    marginRight: 5,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  product: {
    width: '45%',
    marginRight: 5,
    marginBottom: 5,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cate: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  imageProduct: {
    width: '90%',
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  catTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
  card_template: {
    width: width / 2 - 15,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 3,
  },
  card_image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 5,
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
  card_title: {
    color: 'white',
  },
  modal: {
    height: 130,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
