import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../api/firebase';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import { useNavigation } from '@react-navigation/native';
import { ContentRoutes } from '../navigations/routes';
import { useState, useRef } from 'react';
import LoginButton from '../components/LoginButton';
import HR from '../components/HR';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUp = async () => {
    try {
      const createdUser = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      Alert.alert('완료', '회원가입 완료');
    } catch (err) {
      switch (err.code) {
        case 'auth/weak-password':
          Alert.alert('실패', '비밀번호는 6자리 이상이어야 합니다');
          break;
        case 'auth/invalid-email':
          Alert.alert('실패', '잘못된 이메일 주소입니다');
          break;
        case 'auth/email-already-in-use':
          Alert.alert('실패', '이미 가입되어 있는 계정입니다');
          break;
      }
    }
  };

  const handleLogin = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigation.replace(ContentRoutes.Main.name);
    } catch (err) {
      Alert.alert('실패', '잘못 입력하셨습니다.');
    }
  };

  return (
    <SafeInputView>
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.form, { paddingTop: bottom }]}>
          <Text></Text>
          <Input
            style={styles.input}
            inputType={InputTypes.EMAIL}
            value={email}
            placeholder="Email"
            onChangeText={handleEmailChange}
            returnKeyTypes={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordRef}
            onChangeText={handlePasswordChange}
            style={styles.input}
            inputType={InputTypes.PASSWORD}
            returnKeyTypes={ReturnKeyTypes.DONE}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Text></Text>
          <LoginButton
            title=" Login "
            onPress={handleLogin}
            styles={{
              container: {
                paddingHoriaontal: 20,
              },
            }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />
          <LoginButton
            title=" Sign In "
            onPress={handleSignUp}
            styles={{
              container: {
                paddingHoriaontal: 20,
                marginTop: 20,
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default LoginScreen;
