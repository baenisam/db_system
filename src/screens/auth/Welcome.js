import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
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
import {Icons} from '../../constants/Icons';
import {Button} from '../../components/Button';
import themeContext from '../../constants/themeContext';
import langContext from '../../constants/langContext';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const {width, height} = Dimensions.get('window');
const Welcome = props => {
  const {navigation} = props;
  const COLORS = React.useContext(themeContext);
  const tr = React.useContext(langContext);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.background, ...styles.main}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
        <View style={{...styles.header}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.FontAwesome5
              name="arrow-left"
              color={COLORS.txtblack}
              size={20}
            />
          </TouchableOpacity>
        </View>
      <ScrollView
      style={{flex:1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        }}
       >
      
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Image source={imgs.logo} style={{tintColor:COLORS.primary, ...styles.logo}}/>
          </View>
          <View
            style={{
              flex:1,
              width:width,
              paddingTop:40,
              backgroundColor: COLORS.shape,
              paddingHorizontal: 20,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
              <Text style={{
              fontFamily:'Poppins-ExtraBold',
              fontSize:30,
              color:COLORS.white
            }}>{tr.welcomeAuth}</Text>
           
            <Text style={{color: COLORS.white, ...styles.loginContinueTxt}}>
              {tr.logText}
            </Text>
            <View style={{flexDirection:'row'}}>
            <Button
              label={tr.login}
              color={COLORS.white}
              colorText={COLORS.primary}
              containerStyle={{
                marginTop: 40,
                height: 45,
                width:(width - 50) / 2,
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
            />
            <View style={{width:10}}/>
            <Button
              label={tr.register}
              colorText={COLORS.white}
              containerStyle={{
                marginTop: 40,
                borderWidth:1,
                borderColor:COLORS.white,
                height: 45,
                width:(width - 50) / 2,
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={() => navigation.navigate(ROUTES.REGISTER)}
            />
            </View>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

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
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Poppins-Light',
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
    width: '100%',
    flex: 1,
    height:height
  },
  row: {
    marginBottom: 20,
    justifyContent:'center',
    height:height /2,
    alignItems:'center'
  },
  mr7: {
    marginRight: 7,
  },
});
