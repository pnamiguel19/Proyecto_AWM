import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './TextArea.styles';

const TextArea = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  required = false,
  maxLength,
  numberOfLines = 4,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[styles.textArea, error && styles.textAreaError]}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <Text style={styles.charCount}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextArea;