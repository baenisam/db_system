import React from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import imgs from '../../constants/imgs';
import { Button } from '../Button';
import { Icons } from '../../constants/Icons';
const {width, height} = Dimensions.get('window');
const KeyboardAvoidingWrapper = ({
  children,
  isLoading,
  label,
  disabled,
  onPress,
  color,
  colorLoader,
  colorHeader,
  colorText,
}) => {
  function renderHeader() {
    return (
      <View
        style={{
          marginTop: height / 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={imgs.logo}
          style={styles.logo}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
            color: colorText,
          }}>
          Enter code
        </Text>
      </View>
    );
  }

  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: color}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
         <View style={{backgroundColor: colorHeader, ...styles.header}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.FontAwesome5
              name="arrow-left"
              color={'#fff'}
              size={20}
            />
          </TouchableOpacity>
          <Text style={{
            fontFamily:'Poppins-Medium',
            fontSize:16,
            color: '#fff',
            marginLeft:(width - 20) / 5
          }}>Validation du compte</Text>
        </View>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: color, width: width}}>
          {renderHeader()}

          <TouchableWithoutFeedback style={{flex:1, height:height}} onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </View>
        <Button
            label={'Valider'}
            isLoading={isLoading}
            disabled={disabled}
            color={colorHeader}
            colorText={'#fff'}
            containerStyle={{
              paddingVertical: 10,
              borderRadius: 0,
            }}
            onPress={onPress}
          />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

const styles = StyleSheet.create({
    logo: {
        width: 100,
        resizeMode: 'contain',
        height: 100,
      },
      header: {
        height: 80,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flexDirection: 'row',
        alignItems: 'center',
      },
})
