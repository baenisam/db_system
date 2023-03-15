import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {ROUTES} from '../../constants';
import imgs from '../../constants/imgs';
import TextInput from '../../components/InputText';
import { GlobalContext } from '../../services/context';
import {Icons} from '../../constants/Icons';
import {Button} from '../../components/Button';
import themeContext from '../../constants/themeContext';
import langContext from '../../constants/langContext';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const {width, height} = Dimensions.get('window');
const Login = props => {
  const {navigation} = props;
  const COLORS = React.useContext(themeContext);
  const {LoginAccount, isLoading} = React.useContext(GlobalContext)
  const tr = React.useContext(langContext);

  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valide = true;

    if (!inputs.email) {
      hanldeError('Veuillez renseigner ce champ', 'email');
      valide = false;
    } 
    if (!inputs.password) {
      hanldeError('Veuillez renseigner ce champ', 'password');
      valide = false;
    }

    if (valide) {
      LoginAccount(inputs);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const hanldeError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.primary, ...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <ScrollView
        style={{flex:1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex:1
        }}
        >
        <View style={{backgroundColor: COLORS.shape, ...styles.header}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.FontAwesome5
              name="arrow-left"
              color={COLORS.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.wFull}>
          <View style={{paddingHorizontal:20,paddingBottom:30, paddingTop:30, width:width}}>
            <Text style={{
              fontFamily:'Poppins-ExtraBold',
              fontSize:30,
              color:COLORS.white
            }}>{tr.login}</Text>
           
            <Text style={{color: COLORS.white, ...styles.loginContinueTxt}}>
              {tr.logText}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width:width,
              paddingTop:40,
              backgroundColor: COLORS.background,
              paddingHorizontal: 20,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <TextInput
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              label=""
              iconName="user"
              placeholder={tr.userNamePhone}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              error={errors.email}
              value={inputs.email}
              touched={errors.email}
              onFocus={() => {
                hanldeError(null, 'email');
              }}
              onChangeText={text => handleOnChange(text, 'email')}
            />
            <TextInput
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              label=""
              iconName="lock"
              placeholder={tr.password}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              isPassword={true}
              error={errors.password}
              value={inputs.password}
              touched={errors.password}
              onFocus={() => {
                hanldeError(null, 'password');
              }}
              onChangeText={text => handleOnChange(text, 'password')}
            />
            {/*<TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
              style={styles.forgotPassBtn}>
              <Text style={{color: COLORS.txtblack, ...styles.forgotPassText}}>
                {tr.forgot}
              </Text>
            </TouchableOpacity>*/}
            <Button
              isLoading={isLoading}
              label={tr.login}
              color={COLORS.shape}
              colorText={COLORS.white}
              containerStyle={{
                marginTop: 40,
                height: 55,
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={validate}
            />
            <View style={styles.footer}>
              {/*
          <Text style={styles.footerText}> Don't have an account? </Text>
        
          <TouchableOpacity>
            <Text style={styles.signupBtn}>Sign Up</Text>
  </TouchableOpacity>*/}
            </View>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    marginLeft: 20,
  },
  forgotPassBtn: {
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  container: {
    width: '100%',
    position: 'relative',
    flex: 1,
  },

  box: {
    height: height * 0.18,
    width: width,
    zIndex: 100,
  },
  wrapper: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  loginContinueTxt: {
    fontSize: 12,
    marginBottom: 14,
    fontFamily: 'Poppins-Medium',
    marginTop:10
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

  forgotPassText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginTop: 15,
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
    height: 100,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },

  // utils
  wFull: {
    flex: 1,
  },
  row: {
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
