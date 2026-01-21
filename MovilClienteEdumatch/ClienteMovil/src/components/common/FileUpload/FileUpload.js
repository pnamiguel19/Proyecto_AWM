import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './FileUpload.styles';

const FileUpload = ({ label, image, onImageSelect, error }) => {
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return cameraStatus === 'granted' && libraryStatus === 'granted';
  };

  const showImageOptions = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción',
      [
        {
          text: 'Cámara',
          onPress: () => pickImageFromCamera(),
        },
        {
          text: 'Galería',
          onPress: () => pickImageFromGallery(),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permisos necesarios',
        'Se requieren permisos de cámara para tomar una foto'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0]);
    }
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permisos necesarios',
        'Se requieren permisos de galería para seleccionar una foto'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.uploadArea, error && styles.uploadAreaError]}
        onPress={showImageOptions}
        activeOpacity={0.8}
      >
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.uploadText}>Haz clic para subir tu foto</Text>
            <Text style={styles.uploadHint}>JPG, PNG (máx. 5MB)</Text>
          </View>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FileUpload;