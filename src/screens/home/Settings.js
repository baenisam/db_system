import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import themeContext from '../../constants/themeContext';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import langContext from '../../constants/langContext';
import DialogBox from '../../components/DialogBox';
import {GlobalContext} from '../../services/context';
import {ROUTES} from '../../constants';
import Loader from './Loader';
import {Icons} from '../../constants/Icons';
import ToggleSwitch from 'toggle-switch-react-native';
import {useNavigation} from '@react-navigation/native';
import Sound from 'react-native-sound';
import beep from '../../assets/sound/beep.mp3';
const {width, height} = Dimensions.get('window');

const Settings = () => {
  const COLORS = React.useContext(themeContext);
  const tr = React.useContext(langContext);
  const navigation = useNavigation();
  const {
    mode,
    lg,
    toogleTheme,
    toogleLanguage,
    toogleSound,
    sound,
    Logout,
    isLoading,
  } = React.useContext(GlobalContext);

  const [modalLg, showModalLg] = React.useState(false);
  const [modal, showModal] = React.useState(false);

  const langue = [
    {
      name: tr.francais,
      lg: 'fr',
    },
    {
      name: tr.anglais,
      lg: 'en',
    },
    {
      name: tr.kiswahili,
      lg: 'ks',
    },
  ];

  const LangueList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          toogleLanguage(item.lg);
          showModalLg(false);
        }}
        style={{
          borderBottomColor: COLORS.txtblack,
          ...styles.lg,
        }}>
        <Text
          style={{
            color: COLORS.txtblack,
            ...styles.lg1,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: COLORS.txtblack,
            ...styles.lg2,
          }}>
          {item.lg}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Loader
        visible={isLoading}
        label="Déconnexion..."
        color={COLORS.touchable}
        colorText={COLORS.txtblack}
      />
      <View
        style={{
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Icons.FontAwesome
            name="arrow-left"
            color={COLORS.primary}
            size={15}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            color: COLORS.txtblack,
            fontSize: 15,
          }}>
          {tr.settings}
        </Text>
        <TouchableOpacity
          style={{

            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}></TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          flex: 1,
        }}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.MaterialIcons
              name="language"
              size={20}
              color={COLORS.txtblack}
            />
            <TouchableOpacity
              onPress={() => showModalLg(true)}
              style={{flex: 1, ...styles.subItem}}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                {tr.langue}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                {lg === 'en'
                  ? tr.anglais
                  : lg === 'ks'
                  ? tr.kiswahili
                  : tr.francais}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              backgroundColor: COLORS.touchable,
              ...styles.item,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icons.Feather
                name={mode == true ? 'moon' : 'sun'}
                size={20}
                color={COLORS.txtblack}
              />
              <View style={styles.subItem}>
                <Text style={{color: COLORS.txtblack, ...styles.title}}>
                  {tr.theme}
                </Text>
                <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                  {mode == true ? tr.sombre : tr.clair}
                </Text>
              </View>
            </View>
            <ToggleSwitch
              isOn={mode}
              onColor="green"
              offColor="grey"
              size="medium"
              onToggle={value => toogleTheme(value)}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              backgroundColor: COLORS.touchable,
              ...styles.item,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icons.AntDesign name="sound" size={20} color={COLORS.txtblack} />
              <View style={styles.subItem}>
                <Text style={{color: COLORS.txtblack, ...styles.title}}>
                  Sound
                </Text>
                <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                  Activer ou désactiver le son lors de l'ajout d'un produit au
                  panier
                </Text>
              </View>
            </View>
            <ToggleSwitch
              isOn={sound}
              onColor="green"
              offColor="grey"
              size="medium"
              onToggle={value => toogleSound(value)}
            />
          </View>
          <View style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.MaterialIcons
              name="print"
              size={20}
              color={COLORS.txtblack}
            />
            <TouchableOpacity style={{flex: 1, ...styles.subItem}}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                {tr.print}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                {tr.printMsg}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.MaterialCommunityIcons
              name="currency-usd"
              size={20}
              color={COLORS.txtblack}
            />
            <TouchableOpacity style={{flex: 1, ...styles.subItem}}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                {tr.devise}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                {tr.deviseMsg}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.MaterialIcons
              name="business-center"
              size={20}
              color={COLORS.txtblack}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LIST_ENTREPRISE)}
              style={{flex: 1, ...styles.subItem}}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                {'Mes entreprises'}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                Cliquez ici pour voir la liste des entreprises que vous gerez
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.Feather name="users" size={20} color={COLORS.txtblack} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.USER_LIST)}
              style={{flex: 1, ...styles.subItem}}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                {'Employés'}
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                Cliquez ici pour voir la liste des employés des entreprises que
                vous gerez
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => showModal(true)}
            style={{backgroundColor: COLORS.touchable, ...styles.item}}>
            <Icons.FontAwesome
              name="sign-out"
              size={20}
              color={COLORS.txtblack}
            />
            <View style={styles.subItem}>
              <Text style={{color: COLORS.txtblack, ...styles.title}}>
                Se déconnecter
              </Text>
              <Text style={{color: COLORS.txtblack, ...styles.subTitle}}>
                Cliquer ici pour supprimer toutes vos information dans cet
                appareil
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalLg}>
        <TouchableWithoutFeedback onPress={() => showModalLg(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0, 0.2)',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width * 0.6,
                borderRadius: 10,
                padding: 10,
                backgroundColor: COLORS.touchable,
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={langue}
                keyExtractor={item => item.lg}
                renderItem={LangueList}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <DialogBox
        visible={modal}
        btnDimiss="NON"
        btnValide="OUI"
        title="Voulez-vous vous déconnecter ?"
        description="Toutes les informations de votre compte seront supprimées de cet appareil"
        onDismiss={() => showModal(false)}
        onValidate={() => {
          //navigation.closeDrawer();
          Logout();
          showModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  subItem: {
    marginLeft: 20,
    width: '60%',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Poppins-Light',
    color: 'grey',
    fontSize: 12,
  },
  lg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 5,
  },
  lg1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  lg2: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
});
