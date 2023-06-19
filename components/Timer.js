import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const Timer = ({ timeLimit , onTimeUp}) => {
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const progress = (remainingTime / timeLimit) * 100;

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }else{
      onTimeUp();
    }
  }, [remainingTime]);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    width: '80%',
    height: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#ff0000',
  },
});

export default Timer;