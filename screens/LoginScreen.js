import { Image,Keyboard, StyleSheet,Text, View } from "react-native";
import Input, {InputTypes,ReturnKeyTypes} from "../components/Input";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import {useNavigation} from '@react-navigation/native';
import { ContentRoutes } from "../navigations/routes";
import {useState,useRef,useEffect} from "react";
import Button from "../components/Button";
import HR from '../components/HR';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {top,bottom} = useSafeAreaInsets();
  const passwordRef=useRef();

  const[isLoading,setIsLoading]=useState(false);
  const[disabled,setDisabled]=useState(true);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(()=>{
    setDisabled(!email||!password);
  },[email,password]);

  const onSubmit = () =>{
    Keyboard.dismiss();
    if(!disabled&&!isLoading){
      setIsLoading(ture);
      console.log(email,password);
      setIsLoading(false);
    }
  }
  
  return (
    <SafeInputView>
    <View style={[styles.container,{paddingTop:top}]}>
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../assets/cover.png')}
          style={{width:'100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={[styles.form,{paddingTop:bottom}]}>
      <Text>Login</Text>
      <Input
        style={styles.input}
        inputType={InputTypes.EMAIL}
        placeholder="Email"
        onChangeText={(text) => {setEmail(text);}}
        returnKeyTypes={ReturnKeyTypes.NEXT}
      />
      <Input
        ref={passwordRef}
        onSubmitEditing={onSubmit}
        onChangeText={(text) => {setPassword(text);}}
        style={styles.input}
        inputType={InputTypes.PASSWORD}
        returnKeyTypes={ReturnKeyTypes.DONE}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
            title="Login"
            onPress={()=>navigation.navigate(ContentRoutes.Main.name)}
            styles={{
              container:{
                paddingHoriaontal:20,
                marginTop:20,
              },
            }}
            />
          <HR text={'OR'} styles={{container:{marginVertical:30}}}/>
          <Button
            title="회원가입"
            onPress={()=>navigation.navigate(ContentRoutes.Main.name)}
            styles={{
              container:{
                paddingHoriaontal:20,
                marginTop:20,
              },
            }}
            />
      </View>
    </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal:20,
    paddingTop:40,
    paddingBottom:40,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
});

export default LoginScreen;
