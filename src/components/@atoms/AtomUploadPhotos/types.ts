import { MultiPickerOptions } from '@baronha/react-native-multiple-image-picker';
import { AtomModalType } from '@ixulabs/native-ui/build/core/@atoms/AtomModal/types';
import { FormikValues } from 'formik';
import { CSS } from '~/types';
import { AtomButtonTypes } from '../AtomButton/types';
import { AtomImageTypes } from '../AtomImage/types';
import { ImagePickerProps } from '../AtomImagePicker';
import { AtomTextTypes } from '../AtomText/types';
import { AtomViewTypes } from '../AtomView/types';

export type AtomUploadPhotosTypes = {
  id?: string;
  name?: string;
  label?: AtomTextTypes;
  labelText?: string;
  options?: MultiPickerOptions;
  view?: AtomViewTypes;
  picker?: ImagePickerProps;
  button?: AtomButtonTypes;
  buttonText?: AtomTextTypes;
  buttonTextLabel?: string;
  image?: AtomImageTypes;
  formik?: FormikValues;
  css?: CSS;
};
