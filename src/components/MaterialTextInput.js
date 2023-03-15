import * as React from "react";
import { View,Text, StyleSheet,TouchableOpacity } from "react-native";
import { Icons } from "../constants/Icons";
import { TextInput } from "@react-native-material/core";
import { COLORS } from "../constants";

const MaterialTextInput = ({
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

    const [name, setname] = React.useState('')
    const [isFocused, setIsfocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(isPassword);
    return (

      
        <TextInput 
        label="Email"
        inputStyle={styles.textInput1}
        value={name}
        onChangeText={(value)=> setname(value)}
        inputContainerStyle={styles.input}
        color='grey'
        leadingContainerStyle={{width:30}}
        secureTextEntry={hidePassword}
        variant='outlined'
        leading={() => (
            <Icons.Feather name="user" size={15}/>
        )}
        trailing={() => isPassword && (
            
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icons.Entypo
              name={hidePassword ? 'eye' : 'eye-with-line'}
              color={color}
              size={16}
            />
          </TouchableOpacity>
        )}
        />

    )
  }

  export default MaterialTextInput;

  const styles = StyleSheet.create({
    input: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
      },
      textInput1: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        paddingTop:20,
        fontSize: 16,
      },
  })