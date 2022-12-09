import { FormikValues } from 'formik';
import React, { FC } from 'react';
import lodash from 'lodash';
import { StyleSheet, Text } from 'react-native';

interface AtomTextErrorType {
  formik?: FormikValues;
  color?: string;
  id: string;
}

const AtomTextError: FC<AtomTextErrorType> = (props) => {
  const { formik, id, color } = props;
  return formik ? (
    (lodash.get(formik?.values, id) !== `` || lodash.get(formik?.touched, id)) &&
    lodash.get(formik?.errors, id) ? (
      <Text style={[styles.error, { color: color ?? 'red' }]}>
        {lodash.get(formik?.errors, id)}
      </Text>
    ) : (
      <Text {...{ children: null }} />
    )
  ) : (
    <></>
  );
};
export default AtomTextError;

const styles = StyleSheet.create({
  error: { color: 'red', fontSize: 12 },
});
