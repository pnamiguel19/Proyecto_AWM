import { useState } from 'react';

export const useFormStep = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    progress,
    isFirstStep,
    isLastStep,
    totalSteps
  };
};