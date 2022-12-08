import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  let permissionsResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionsResult.granted === false) {
    alert('Los permissos fueron negados.');
    return;
  }
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    // allowsEditing: true,
    // aspect: [4, 3],
    quality: 1,
  });
  if (result.cancelled) {
    return;
  }
  if (!result.cancelled) {
    return result;
  }
};

export default pickImage;
