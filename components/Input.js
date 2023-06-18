import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { forwardRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GRAY, PRIMARY } from "../colors";

export const KeyboardTypes = {
  DEFAULT: "default",
  EMAIL: "email-address",
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

export const InputTypes = {
  EMAIL :'EMAIL',
  PASSWORD : 'PASSWORD'
}

const Input = forwardRef(({ inputType, value, returnKeyType, onChangeText }, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];


  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (text) => {
    onChangeText(text);
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={[defaultStyles.title,
        {color:value||isFocused?PRIMARY.DEFAULT:GRAY.DARK},  
      ]}>{title}</Text>

      <View>
        <TextInput
          ref={ref}
          value={value}
          style={[defaultStyles.input,
          {
            borderColor:value||isFocused?PRIMARY.DEFAULT:GRAY.DARK,
            color:value||isFocused?PRIMARY.DEFAULT:GRAY.DARK,
          }
          ]}
          placeholder={placeholder}
          placeholderTextColor={GRAY.DEFAULT}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardAppearance="light"
          onFocus={()=>setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          onChangeText={handleTextChange}
    
        />
        <View style={defaultStyles.icon}>
          <MaterialCommunityIcons 
          name={isFocused ? active:inactive} 
          size={24} 
          color={value||isFocused?PRIMARY.DEFAULT:GRAY.DARK}   
          />
        </View>
      </View>
    </View>
  );
});

const InputTypeProps = {
  EMAIL:{
    title:'EMAIL',
    placeholder:"your@email.com",
    keyboardTypes:'email-address',
    secureTextEntry:false,
    iconName:{active:'email',inactive:'email-outline'},
  },
  PASSWORD:{
    title:'PASSWORD',
    placeholder:'PASSWORD',
    keyboardTypes:'default',
    secureTextEntry:true,
    iconName:{active:'lock',inactive:'lock-outline'},
  },
}

const defaultStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginBottom: 4,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 35,
  },
  icon: {
    position: "absolute",
    left: 8,
    height: "100%",
    justifyContent: "center",
  },
});

export default Input;
