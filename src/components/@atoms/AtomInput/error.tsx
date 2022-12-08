import { FC } from 'react';
import { get } from 'lodash';
import { InputErrorStyled } from './styled';
import { AtomInputTypes } from './types';
import { FormikValues } from 'formik';

const validateErrors = (formik: FormikValues, id: string) =>
  (get(formik?.values, id) !== `` || get(formik?.touched, id)) && get(formik?.errors, id)
    ? get(formik?.errors, id)
    : ``;

const AtomInputError: FC<AtomInputTypes> = (props) => {
  const { formik, name } = props;
  if (!formik) return null;

  return <InputErrorStyled {...props}>{validateErrors(formik, name ?? '')}</InputErrorStyled>;
};

export default AtomInputError;
