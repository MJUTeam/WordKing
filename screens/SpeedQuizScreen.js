import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View, Alert } from 'react-native';
import Button,{ ButtonTypes } from './components/SpeedQuizButton';
import Timer from './components/Timer';
import { useState } from 'react';

const SpeedQuizScreen = () => {
  const [result,setResult] = useState("");
  const [spelling,setSpelling] = useState("testing");
  const [meaning,setMeaning] = useState("테스트");
  const [point,setPoint] = useState(0);


  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth-5)/4;

  const letters = spelling.split("");
  const maxLength = letters.length - 1;

  function nextWord() {
    setPoint((point)=>{ return point+1;});
    setMeaning((meaning)=>{ return "다음말";});
    return "nextWord";
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
        onPress: () => console.log('확인 버튼이 눌렸습니다.') }],
      { cancelable: false }
    );
  };

return (
  <View style={styles.container} >
    <StatusBar style="auto"/>
    <View style={styles.pointContainer}>
      <Text style = { styles.text } >점수 : {point}</Text>
      <Timer timeLimit={60} onTimeUp={handleTimeUp} />
    </View>

    <View style={styles.goalContainer}>
    <Text style={ styles.goal }>{meaning} </Text>
    <Text style = {styles.problem} > 문제 </Text>
    </View>

    <View style={styles.resultContainer}>
      <Text style = { styles.text } > {result} </Text>
    </View>

    <View style={styles.buttonContainer}>
      <View style={styles.leftPad}>
        
        <View style={styles.number}>
          {shuffleArray(letters.slice(0, maxLength + 1)).map((alpha, index) =>(          
            <Button 
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
        <Button title="삭제"
        onPress={()=>{
          setResult((result)=>{ return "";});
        }}
        buttonStyle={{width,height:width, marginTop:1}}
        buttonTypes={ButtonTypes.OPERATOR}
        />   
        <Button title="정답"
          onPress={()=>{
            if(result===spelling){
              setSpelling((spelling)=> {return nextWord();});
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
