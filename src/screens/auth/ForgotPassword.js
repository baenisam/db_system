import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ROUTES} from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import imgs from '../../constants/imgs';
import Svg, {Path} from 'react-native-svg';
import TextInput from '../../components/InputText';
import { Icons } from '../../constants/Icons';
import themeContext from '../../constants/themeContext';
import { Button } from '../../components/Button';
const {width,height} = Dimensions.get('window');
const ForgotPassword = (props) => {
const COLORS = React.useContext(themeContext)
  const {navigation} = props;
  return (
    <SafeAreaView style={{backgroundColor:COLORS.background,...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
  
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom:100
      }}
       style={styles.container}>
      <View style={{backgroundColor:COLORS.shape,...styles.header}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.Entypo name="chevron-left" color={COLORS.white} size={20} />
          </TouchableOpacity>
          <Text style={{color:COLORS.white,...styles.loginTxt}}>Reset password</Text>
        </View>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Image source={imgs.logo} style={styles.logo}/>
          </View>

          <View style={styles.wrapper}>
          <Text style={{color:COLORS.txtblack,...styles.loginContinueTxt}}>Entrez votre adresse email pour continuer</Text>
          </View>
          <TextInput
                color={COLORS.txtblack}
                colorPlaceholder={'grey'}
                label=""
                iconName='user'
                placeholder="Votre adresse email"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Suivant"
                keyboardType="email-address"
               
                />

                <Button label='Continuer' color={COLORS.primary} colorText={COLORS.white} containerStyle={{
                    marginTop:30,
                    paddingVertical:10,
                    borderRadius:10
                }}  />

          {/***************** FORGOT PASSWORD BUTTON *****************/}
         
        </View>

        <View style={styles.footer}>
          {/*
          <Text style={styles.footerText}> Don't have an account? </Text>
        
          <TouchableOpacity>
            <Text style={styles.signupBtn}>Sign Up</Text>
  </TouchableOpacity>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 80,
    paddingHorizontal: 10,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
    paddingVertical: 10,
    paddingTop:40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginTxt:{
    fontFamily:'Poppins-Medium',
    fontSize:17,
    marginLeft:20
  },
  container: {
    width: '100%',
    position: 'relative',
    flex: 1,
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  box: {
    height: height * 0.1,
    width:width,
    zIndex: 100,
  },
  wrapper:{
    paddingHorizontal:30,
    justifyContent:'center',
  },
  loginContinueTxt: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily:'Poppins-Light'
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
  loginText: {
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  logo:{
    width:100,
    resizeMode:'contain',
    height:100
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: 'bold',
  },
  signupBtn: {
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
    marginTop: 70,
    paddingHorizontal:10
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
