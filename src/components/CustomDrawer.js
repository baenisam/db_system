import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  ActivityIndicator,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import imgs from '../constants/imgs';
import ToggleSwitch from 'toggle-switch-react-native';
import DialogBox from './DialogBox';
import {useNavigation} from '@react-navigation/native';
import themeContext from '../constants/themeContext';
import langContext from '../constants/langContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Loader from '../screens/home/Loader';
import {GlobalContext} from '../services/context';
import {Icons} from '../constants/Icons';
const {width, height} = Dimensions.get('window');

const CustomDrawer = props => {
  const {
    mode,
    toogleTheme,
    en,
    getEntreprise,
    Logout,
    allEntreprise,
    toogleSound,
    sound,
    ShoosedEntreprise,
    userData,
    isLoading,
  } = React.useContext(GlobalContext);
  const COLORS = React.useContext(themeContext);
  const navigation = useNavigation();
  const tr = React.useContext(langContext);

  const [modal, showModal] = React.useState(false);
  const data = [1, 2, 3, 4, 5, 6, 7];
  const logout = () => {
    // navigation.closeDrawer();
    showModal(true);
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.headerWhite}}>
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center',
          paddingBottom: 0,
          marginBottom: 0,
        }}>
        <ImageBackground
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain',
          }}
          imageStyle={{
            borderRadius: 40,
          }}
          source={imgs.avatar}
        />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: COLORS.txtblack,
              fontSize: 16,
            }}>
            {userData && userData.fullname}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              marginTop: -5,
              color: COLORS.txtblack,
              fontSize: 12,
            }}>
            {en && en.fonction}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex:1}}
        {...props}>
        <DrawerItemList {...props} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icons.MaterialCommunityIcons
              name="theme-light-dark"
              color={COLORS.txtblack}
              size={18}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: COLORS.txtblack,
                marginLeft: 5,
                fontSize: 15,
              }}>
              {tr.theme} {tr.sombre}
            </Text>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icons.AntDesign name="sound" color={COLORS.txtblack} size={18} />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: COLORS.txtblack,
                marginLeft: 5,
                fontSize: 15,
              }}>
              Sound
            </Text>
          </View>
          <ToggleSwitch
            isOn={sound}
            onColor="green"
            offColor="grey"
            size="medium"
            onToggle={value => toogleSound(value)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              fontSize: 16,
              color: 'gray',
            }}>
            Entreprises
          </Text>
          <TouchableOpacity onPress={() => getEntreprise()}>
            <Icons.FontAwesome
              name="refresh"
              color={COLORS.txtblack}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {isLoading
          ? data.map(item => (
              <SkeletonPlaceholder
                direction="left"
                backgroundColor={COLORS.skele}
                borderRadius={4}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 20,
                    paddingHorizontal: 20,
                    marginTop: 30,
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 5,
                      height: 20,
                      width: '80%',
                    }}
                  />
                </View>
              </SkeletonPlaceholder>
            ))
          : allEntreprise.map(item => (
              <View
                key={item.id_entreprise}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    ShoosedEntreprise(item);
                    props.navigation.closeDrawer();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icons.MaterialIcons
                    name="business-center"
                    size={18}
                    color={
                      item.id_entreprise == en.id_entreprise
                        ? COLORS.primary
                        : COLORS.txtblack
                    }
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color:
                        item.id_entreprise == en.id_entreprise
                          ? COLORS.primary
                          : COLORS.txtblack,
                      marginLeft: 5,
                      fontSize: 15,
                    }}>
                    {item.nom_entreprise}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
      </DrawerContentScrollView>
      <View style={{borderColor: COLORS.txtblack, ...styles.footer}}>
        <Text
          style={{
            fontFamily: 'Poppins-Light',
            color: COLORS.txtblack,
            fontSize: 10,
            marginTop: 10,
          }}>
          Db System version 1.0.0
        </Text>
      </View>
      <DialogBox
        visible={modal}
        btnDimiss="NON"
        btnValide="OUI"
        title="Voulez-vous vous déconnecter ?"
        description="Toutes les informations de votre compte seront supprimées de cet appareil"
        onDismiss={() => showModal(false)}
        onValidate={() => {
          props.navigation.closeDrawer();
          Logout();
          showModal(false);
        }}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footertext: {
    fontFamily: 'Poppins-ExtraBold',
    marginLeft: 10,
  },
});
