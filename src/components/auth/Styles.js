import React from "react";
import styled from "styled-components";


export const CodeInputSection = styled.View`
justify-content:center;
align-items:center;
margin-bottom:0px;
margin-top:35px;
`

export const HiddenTextInput = styled.TextInput`
position:absolute;
width:1px;
height:1px;
opacity:0;
`
export const StyledButton = styled.TouchableOpacity`
padding:15px;
background-color:grey;
justify-content:center;
align-items:center;
border-radius:5px;
margin-vertical:5px;
height:50px;
${(props) => props.google == true &&
    `
    background-color:green;
    justify-content:center;
    flex-direction:row
    `
}
`
export const ButtonText = styled.Text`
color:#fff;
font-size:16px;

${(props) => props.google == true &&
    `
    padding-left:25px
    `
}
`

export const CodeInputContainer = styled.Pressable`
width:70%;
flex-direction:row;
justify-content:space-between
`

export const CodeInput = styled.View`
min-width:15%;
heght:50%;
border-radius:10px;
border:1px;
padding:7px;
margin:2px
`
export const CodeInputText = styled.Text`
font-size:22px;
font-weight:bold;
text-align:center;
`
export const CodeInputFocused = styled(CodeInput)`
border-color:green;
`