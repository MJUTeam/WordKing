import { StyleSheet, Text, useWindowDimensions, View, Alert } from 'react-native';
import SpeedQuizButton,{ ButtonTypes } from '../components/SpeedQuizButton';
import IconButton from '../components/IconButton';
import Timer from '../components/Timer';
import { useEffect,useState } from 'react';
import { getAllItemsByBookshelves } from '../utils/ItemStorage';

const SpeedQuizScreen = ({ navigation, route  }) => {
  const { name } = route.params;

  const [result,setResult] = useState("");
  const [spelling,setSpelling] = useState("");
  const [meaning,setMeaning] = useState("");
  const [point,setPoint] = useState(0);
  const [letters,setLetters] = useState([]);

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth-5)/4;

  const maxLength = letters.length - 1;

  const getWord = async () => {
    try {
      const items = await getAllItemsByBookshelves(name);
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];
      setSpelling(randomItem.english);
      setMeaning(randomItem.korean);
      setLetters((letters)=>{ return (randomItem.english).split("")});
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(() => {getWord(); }, []);


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
    <View style={styles.goalContainer}>
    <Text style = {styles.problem} > 문제 </Text>
    <Text style={ styles.goal }>{meaning} </Text>

    </View>

    <View style={styles.pointContainer}>
      <Text style = { styles.text } >점수 : {point}</Text>
      <IconButton
        size={50}
        onPress={() => {
          navigation.goBack();
        }}
        iconName={'arrow-left-bold-box-outline'}
      />
    </View>

    <View style={styles.resultContainer}>
      
      <Text style = { styles.text } > {result} </Text>
      
    </View>
    <Timer timeLimit={100} onTimeUp={handleTimeUp} />
    <View style={styles.buttonContainer}>
      <View style={styles.leftPad}>
        
        <View style={styles.number}>
          {
          shuffleArray(letters.slice(0, maxLength+1)).map((alpha, index) =>(          
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
              getWord()
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
  flex: 0.1,
  flexDirection:'row',
  alignItems: 'space-between',
},
goalContainer: {
  flex: 0.2,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:20,
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
  flex: 0.2,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
},
text:{
  fontSize:40,
  fontWeight:'700',
  color: '#b11000',
  paddingBottom : 10,
  paddingRight : 30,
},
buttonContainer:{
  flex: 0.5,
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
