import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

// 문제 수 표현
const [correct, setCorrect] = useState(0);
// 답안 표현
const [sentence, setSentence] = useState({
  english: '',
  korean: '',
});
// 점수 표현
const [goal, setGoal] = useState(0);

const QuizSetting = () => {
  // 4지선다 답안 선택 random 구현
  let array = [];
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * arrayLength);
    if (array.includes(random)) {
      i--;
    } else {
      array.push(random);
    }
  }

  // 문제 1개 선택
  let random = Math.floor(Math.random() * 4);
  let sentence = AsyncStorage.getItem[array[random]];
  setSentence({
    english: sentence.english,
    korean: sentence.korean,
  });

  // 각 답의 뜻 저장 -> 답 비교
  setCorrect([
    {
      korean: AsyncStorage.getItem[array[0]].korean,
    },
    {
      korean: AsyncStorage.getItem[array[1]].korean,
    },
    {
      korean: AsyncStorage.getItem[array[2]].korean,
    },
    {
      korean: AsyncStorage.getItem[array[3]].korean,
    },
  ]);
};
export default QuizSetting;
