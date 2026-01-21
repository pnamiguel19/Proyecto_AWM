import React from 'react';
import { View, Text } from 'react-native';
import styles from './Stepper.styles';

const Stepper = ({ steps, currentStep }) => {
  const currentStepData = steps[currentStep - 1];
  
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${(currentStep / steps.length) * 100}%` }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.currentStepContainer}>
        <View style={styles.stepInfo}>
          <Text style={styles.stepIndicator}>
            Paso {currentStep} de {steps.length}
          </Text>
          <Text style={styles.stepLabel}>{currentStepData.label}</Text>
        </View>
        <View style={styles.stepIconContainer}>
          <Text style={styles.stepIcon}>{currentStepData.icon}</Text>
        </View>
      </View>
    </View>
  );
};

export default Stepper;