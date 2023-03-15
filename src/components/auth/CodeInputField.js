import React, {useRef, useState, useEffect} from "react";
import { CodeInputSection,StyledButton, ButtonText, HiddenTextInput, CodeInputContainer, CodeInput, CodeInputText, CodeInputFocused } from "./Styles";
export default function CodeInputField  ({setPinReady, code, setCode, maxLength, color, placeholder}) {

    const codeDigitsArray = new Array(maxLength).fill(0);

    const textInputRef = useRef(null);

    const[inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
    const handleOnBur = () => {
        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
    }, [code]);
    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    }

    const toCodeDigitsInput = (_value, index) => {
        const emptyInputCahr = '';
        const digit = code[index] || emptyInputCahr;

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;
        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
        const StyledCodeIpunt = inputContainerIsFocused && isDigitFocused?
        CodeInputFocused : CodeInput;
        return (
            <StyledCodeIpunt style={{borderColor:color}} key={index}
            >
                <CodeInputText style={{
                    color:color
                }}
                
                >{digit}</CodeInputText>
            </StyledCodeIpunt>
        );
    }
    return (
      <CodeInputSection>
        <CodeInputContainer onPress={handleOnPress} >
            {codeDigitsArray.map(toCodeDigitsInput)}
        </CodeInputContainer>
        <HiddenTextInput
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={maxLength}
        
        />
      </CodeInputSection>
    )
}

