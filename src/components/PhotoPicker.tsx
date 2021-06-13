import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, ImagePickerResult } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

const askForPermissions = async () => {
  const {status} = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.MEDIA_LIBRARY
  )
  if (status != 'granted') {
    Alert.alert('Ошибка', 'Вы не дали прав на создание фото');
    return false;
  }
  return true;
}

interface PhotoPickerProps {
  onPick: (uri: string) => void
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({onPick}) => {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const hasPermissions: boolean = await askForPermissions();
    if (!hasPermissions) {
      return null;
    }

    const img: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9]
    });
    if (!img.cancelled) {
      setImage(img.uri)
      onPick(img.uri);
    }
  }
  
  return <View style={styles.main}>
    <Button
      title='Сделать фото'
      onPress={takePhoto}
    />
    {image && <Image style={styles.image} source={{uri: image}}/>}
  </View>;
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20
  }
});