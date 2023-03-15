import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Keyboard,
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
import PopPupSuccess from '../../components/PopPupSuccess';
import {Icons} from '../../constants/Icons';
import {GlobalContext} from '../../services/context';
import {Button} from '../../components/Button';
import themeContext from '../../constants/themeContext';
import langContext from '../../constants/langContext';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const {width, height} = Dimensions.get('window');
const Register = props => {
  const {navigation} = props;
  const COLORS = React.useContext(themeContext);
  const {
    CreateAccount,
    isLoading,
    modal,
    successMessge,
    errorMessage,
    hideModal,
  } = React.useContext(GlobalContext);
  const tr = React.useContext(langContext);

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    password_confirmation: '',
    nom: '',
    phone: '',
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valide = true;

    if (!inputs.email) {
      hanldeError('Veuillez renseigner ce champ', 'email');
      valide = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      hanldeError('Veuillez entrer un email valide', 'email');
      valide = false;
    }
    if (!inputs.nom) {
      hanldeError('Veuillez renseigner ce champ', 'nom');
      valide = false;
    }
    if (!inputs.phone) {
      hanldeError('Veuillez renseigner ce champ', 'phone');
      valide = false;
    }
    if (!inputs.password) {
      hanldeError('Veuillez renseigner ce champ', 'password');
      valide = false;
    } else if (
      !inputs.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      )
    ) {
      hanldeError(
        'Votre mot de passe doit contenir des chiffres, lettres et symboles',
        'password',
      );
      valide = false;
    } else if (inputs.password.length < 8) {
      hanldeError(
        'Votre mot de passe doit contenir au moins 8 caractères',
        'password',
      );
      valide = false;
    }

    if (!inputs.password_confirmation) {
      hanldeError('Veuillez renseigner ce champ', 'password_confirmation');
      valide = false;
    } else if (inputs.password_confirmation !== inputs.password) {
      hanldeError(
        'Les deux mots de passe ne correspondent pas',
        'password_confirmation',
      );
      valide = false;
    }

    if (valide) {
      CreateAccount(inputs);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const hanldeError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.background, ...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{backgroundColor: COLORS.shape, ...styles.header}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.FontAwesome5
            name="arrow-left"
            color={COLORS.white}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{...styles.container}}>
        <View style={{backgroundColor: COLORS.shape, ...styles.wFull}}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 10,
              paddingTop: 10,
              width: width,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-ExtraBold',
                fontSize: 24,
                color: COLORS.white,
              }}>
              {tr.register}
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              width: width,
              height: height,
              paddingTop: 40,
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
              placeholder="Nom complet"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              error={errors.nom}
              value={inputs.nom}
              touched={errors.nom}
              onFocus={() => {
                hanldeError(null, 'nom');
              }}
              onChangeText={text => handleOnChange(text, 'nom')}
            />
            <TextInput
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              label=""
              iconName="mail"
              placeholder={tr.email}
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
              iconName="phone"
              placeholder="Ex:+243999999999"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              error={errors.phone}
              value={inputs.phone}
              touched={errors.phone}
              onFocus={() => {
                hanldeError(null, 'phone');
              }}
              onChangeText={text => handleOnChange(text, 'phone')}
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
            <TextInput
              color={COLORS.txtblack}
              colorPlaceholder={'grey'}
              label=""
              iconName="lock"
              placeholder="Confirm Mot de passe"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="Suivant"
              isPassword={true}
              error={errors.password_confirmation}
              value={inputs.password_confirmation}
              touched={errors.password_confirmation}
              onFocus={() => {
                hanldeError(null, 'password_confirmation');
              }}
              onChangeText={text =>
                handleOnChange(text, 'password_confirmation')
              }
            />
            <Button
              isLoading={isLoading}
              label={tr.register}
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
      <PopPupSuccess
        visible={modal}
        icon={errorMessage ? 'error' : successMessge ? 'check-circle' : 'error'}
        color={errorMessage ? 'red' : successMessge ? 'green' : ''}
        description={
          errorMessage ? errorMessage : successMessge ? successMessge : ''
        }
        button="D'ACCORD"
        onPress={() => hideModal(errorMessage ? '' : ROUTES.LOGIN)}
      />
    </SafeAreaView>
  );
};

export default Register;

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
    marginTop: 10,
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
    width: '100%',
    flex: 1,
  },
  row: {
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
