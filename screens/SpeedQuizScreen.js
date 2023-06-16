import { StyleSheet, Text, useWindowDimensions, View, Alert } from 'react-native';
import SpeedQuizButton,{ ButtonTypes } from '../components/SpeedQuizButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from '../components/Timer';
import { useState } from 'react';

const SpeedQuizScreen = ({ navigation }) => {

  const [result,setResult] = useState("");
  const [spelling,setSpelling] = useState("test");
  const [meaning,setMeaning] = useState("테스트");
  const [point,setPoint] = useState(0);
  
  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth-5)/4;

  const letters = spelling.split("");
  const maxLength = letters.length - 1;

  
  const getStoredDataCount = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      getWord(randomKey);
    } catch (error) {
      console.log(error);

    }
  };

  function getWord(ID){
    AsyncStorage.getItem(ID)
        .then(value => {
          const info = JSON.parse(value);
          setMeaning((mean)=>{ return info.korean;});
          setSpelling((spelling)=>{ return info.english;});
          return info;
        })
        .catch(error => console.log(error));
  }


  function shuffleArray(array) {
    const uniqueValues = Array.from(new Set(array));
    const shuffledArray = [];
    while (uniqueValues.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueValues.length);
      const randomValue = uniqueValues.splice(randomIndex, 1)[0];
      shuffledArray.push(randomValue);
    }
    return shuffledArray;
  }



  const handleTimeUp = () => {
    Alert.alert(
      '결과',
      '시간이 종료되었습니다! 점수:'+ point,
      [{ text: '확인', 
        onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  };


return (
  <View style={styles.container} >
    <View style={styles.pointContainer}>
      <Text style = { styles.text } >점수 : {point}</Text>
      <Timer timeLimit={10} onTimeUp={handleTimeUp} />
    </View>

    <View style={styles.goalContainer}>
    <Text style={ styles.goal }>{meaning} </Text>
    <Text style = {styles.problem} > 문제 </Text>
    </View>
  
    <View style={styles.resultContainer}>
      <SpeedQuizButton title={'뒤로가기'} onPress={() => navigation.goBack()} />
      <Text style = { styles.text } > {result} </Text>
    </View>

    <View style={styles.buttonContainer}>
      <View style={styles.leftPad}>
        
        <View style={styles.number}>
          {shuffleArray(letters.slice(0, maxLength + 1)).map((alpha, index) =>(          
            <SpeedQuizButton 
            key={alpha+index}
            title={alpha.toString()}
            onPress={()=>{setResult((result)=>{ return result+alpha;});}}
            buttonStyle={{width,height:width, marginBottom:1}}
            />
          ))}

        </View>
        <View style={styles.bottom}>
          
        </View>
      </View>
      <View>
        <SpeedQuizButton title="삭제"
        onPress={()=>{
          setResult((result)=>{ return "";});
        }}
        buttonStyle={{width,height:width, marginTop:1}}
        buttonTypes={ButtonTypes.OPERATOR}
        />   
        <SpeedQuizButton title="정답"
          onPress={()=>{
            if(result===spelling){
              getStoredDataCount()
              setPoint((point)=>{ return point+10;});
            }
            
            setResult((result)=>{ return "";});
            
        }}
            buttonTypes={ButtonTypes.OPERATOR}
            buttonStyle={{width,height:width, marginBottom:1}}
          />       
      </View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection:'column',
  backgroundColor: '#ffffff',
  alignItems: 'stretch',
  justifyContent: 'center',
},
pointContainer: {
  flex: 0.2,
  paddingTop:20,
},
goalContainer: {
  flex: 0.5,
  justifyContent: 'center',
  alignItems: 'center',
},

problem:{
  fontSize:20,
  color: '#ffffff',
  backgroundColor:'#000000',
},
goal:{
  fontSize:60,
  fontWeight:'700',
  color: '#000000',
  paddingBottom : 30,
},
resultContainer: {
  flex: 0.5,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
},
text:{
  fontSize:60,
  fontWeight:'700',
  color: '#b11000',
  paddingBottom : 30,
  paddingRight : 30,
},
buttonContainer:{
  backgroundColor:'#000000',
  flexDirection:"row",
  justifyContent:'space-evenly',
},
leftPad:{
  width:'75%',
},
number:{
  flexWrap:'wrap-reverse',
  flexDirection:"row",
  justifyContent:'space-evenly',
},
bottom:{    
  flexDirection:"row",
  justifyContent:'space-evenly',
},
});

export default SpeedQuizScreen;
