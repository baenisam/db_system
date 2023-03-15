import * as React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';



export const Button = ({onPress, label, colorText, disabled, color, containerStyle, isLoading}) => {
    return (
        <TouchableOpacity activeOpacity={isLoading ? 0.5 : 1}
        disabled={isLoading || disabled}
        style={{
            justifyContent:'center',
            alignItems:'center',
            height:45,
            backgroundColor:isLoading ? 'rgba(53, 89, 123, .5)' : disabled ? 'rgba(53, 89, 123, .5)' : color,
            width:'100%',
            borderRadius:5,
            ...containerStyle
        }} onPress={onPress}>
            {!isLoading ? 
            <Text style={{
                fontFamily:'font1',
                fontSize:16,
                color:colorText
            }}>{label}</Text>
            :

            <ActivityIndicator size={20} color={colorText} />
        }

        </TouchableOpacity>
    )
}