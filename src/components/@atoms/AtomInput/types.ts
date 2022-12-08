import { FormikValues } from 'formik';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export type AtomInputTypes = {
  name?: string;
  label?: string;
  formik?: FormikValues;
  css?: CSS;
};
