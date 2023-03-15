import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
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
import themeContext from '../../constants/themeContext';
import {Button} from '../../components/Button';
import MaterialTextInput from '../../components/MaterialTextInput';
import langContext from '../../constants/langContext';
import Svg, {Path} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
const screenWidth = Dimensions.get('screen').width;
const Token = props => {
  const {navigation} = props;
  const COLORS = React.useContext(themeContext);
  const tr = React.useContext(langContext)

  return (
    <SafeAreaView style={{backgroundColor: COLORS.background, ...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{
          backgroundColor: COLORS.background,
          flex: 1,
          ...styles.container,
        }}>
        <View style={styles.wFull}>
          <View style={{backgroundColor: COLORS.shape, ...styles.header}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons.Entypo
                name="chevron-left"
                color={COLORS.white}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Image source={imgs.logo} style={styles.logo} />
          </View>

          <View style={styles.wrapper}>
            <Text style={{color: COLORS.txtblack, ...styles.loginContinueTxt}}>
              {tr.token}
            </Text>
          </View>

          <TextInput
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Ex:0000-0000-0000-0000"
            keyboardAppearance="dark"
            returnKeyType="next"
            keyboardType="numeric"
            returnKeyLabel="Suivant"
            amStyle={{
              marginHorizontal:10
            }}
          />
        </View>
      </ScrollView>
      <View style={{backgroundColor: COLORS.background, ...styles.footer}}>
        <Button
          label={tr.continuer}
          color={COLORS.shape}
          colorText={COLORS.white}
          containerStyle={{
            marginTop: 0,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Token;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 70,
    paddingHorizontal: 10,
    zIndex: 10,
    paddingTop: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
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
    height: height * 0.18,
    width: width,
    zIndex: 100,
  },
  bottomWavy: {
    position: 'absolute',
    top: 0,
  },
});
