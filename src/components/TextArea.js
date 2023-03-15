import * as React from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icons} from '../constants/Icons';
import themeContext from '../constants/themeContext';

const TextArea = ({
  label,
  iconName,
  color,
  colorPlaceholder,
  error,
  amStyle,
  placeholder,
  ref,
  isPassword,
  value,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsfocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(isPassword);
  const COLORS = React.useContext(themeContext)
  return (
    <>
      <View
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: error ? 'red' : color,
          backgroundColor:COLORS.inputBg,
          marginTop:20,
          ...styles.input,
          ...amStyle,
        }}>
        <RNTextInput
        multiline = {true}
        numberOfLines = {4}
        
          underlineColorAndroid="transparent"
          placeholderTextColor={colorPlaceholder}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          value={value}
          onFocus={() => {
            onFocus();
            setIsfocused(true);
          }}
          onBlur={() => {
            setIsfocused(false);
          }}
          placeholder={placeholder}
          ref={ref}
          {...props}
          style={{color: color,textAlignVertical: 'top', ...styles.textInput}}
        />
        {!!isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icons.Entypo
              name={hidePassword ? 'eye' : 'eye-with-line'}
              color={color}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View>
          <Text style={{fontFamily: 'font2', fontSize: 10, color: 'red'}}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    //borderWidth: 1,

    paddingHorizontal: 5,
    flexDirection: 'row',
    alignContent:'flex-start',
    borderRadius: 0,
    paddingVertical: 0,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'font11',
    alignItems:'flex-start'

  },

  bouton: {
    width: 400,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#e3a220',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action1: {
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#e4ebe2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput1: {
    flex: 1,
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  label: {
    fontFamily: 'font4',
    fontSize: 16,
  },
});
