import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ROUTES} from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import imgs from '../../constants/imgs';
import TextInput from '../../components/InputText';
import {Icons} from '../../constants/Icons';
import {Button} from '../../components/Button';
import MaterialTextInput from '../../components/MaterialTextInput';
import themeContext from '../../constants/themeContext';
import Svg, {Path} from 'react-native-svg';
import langContext from '../../constants/langContext';
import { GlobalContext } from '../../services/context';
const {width, height} = Dimensions.get('window');
const ScreenWidth = Dimensions.get('screen').width;
const SetLangue = props => {
  const [selectedlangue, setSelectedLangue] = React.useState([
    false,
    false,
    false,
  ]);
  const {toogleLanguage} = React.useContext(GlobalContext)
  const [selected, setSelected] = React.useState(false);
  const {navigation} = props;
  const COLORS = React.useContext(themeContext);
  const tr = React.useContext(langContext)
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

  const saveLanguage = () => {
    navigation.navigate(ROUTES.ONBOARDING);
  };
  

  const LangueList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLangue(item);
          setSelected(true);
          toogleLanguage(item.lg)
        }}
        style={{
          backgroundColor:
            selectedlangue.lg == item.lg ? COLORS.shape : COLORS.background,
          ...styles.lg,
        }}>
        <Text
          style={{
            color:
              selectedlangue.lg == item.lg ? COLORS.white : COLORS.txtblack,
            ...styles.lg1,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color:
              selectedlangue.lg == item.lg ? COLORS.white : COLORS.txtblack,
            ...styles.lg2,
          }}>
          {item.lg}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.background, ...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />

      <View style={{backgroundColor: COLORS.background, ...styles.container}}>
        <View style={styles.wFull}>
        
          <FlatList
            ListHeaderComponent={() => (
              <View style={styles.row}>
              <Image source={imgs.logo} style={{tintColor:COLORS.primary, ...styles.logo}} />
              <View style={styles.wrapper}>
                <Text
                  style={{color: COLORS.txtblack, ...styles.loginContinueTxt}}>
                 {tr.shoose}
                </Text>
              </View>
            </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            data={langue}
            keyExtractor={item => item.lg}
            renderItem={LangueList}
          />
        </View>
      </View>
      <View style={styles.footer}>
        {selected && (
          <Button
            label={tr.continuer}
            color={COLORS.shape}
            colorText={COLORS.white}
            containerStyle={{
              marginTop: 30,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={saveLanguage}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SetLangue;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  lg1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  lg2: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  header: {
    width: width,
    zIndex: 100,
  },
  svg: {
    zIndex: 1,
  },
  loginTxt: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 17,
    marginLeft: 20,
  },
  container: {
    padding: 15,
    flex: 1,
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  wrapper: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  loginContinueTxt: {
    fontSize: 12,
    textAlign: 'center',

    marginBottom: 16,
    fontFamily: 'Poppins-Light',
  },
  input: {
    borderWidth: 1,

    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 10,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },

  logo: {
    width: 100,
    resizeMode: 'contain',
    height: 100,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },

  // utils
  wFull: {
    width: '100%',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop:height * .1
  },
  mr7: {
    marginRight: 7,
  },
  bottom: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
  },
  box: {
    height: 200,
    zIndex: 2,
  },
  bottomWavy: {
    position: 'absolute',
    top: 0,
  },
});
