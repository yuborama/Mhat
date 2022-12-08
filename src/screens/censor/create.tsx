import { AtomInput, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import { useFormik } from 'formik';
import React, { FCN } from 'react';
import { Outlet, useNavigate } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomLink from '~/components/@atoms/AtomLink';
import AtomView from '~/components/@atoms/AtomView';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '~/apollo/mutations/user';
import { Alert } from 'react-native';
import BackBar from '~/components/@molecules/BackBar';

const CensorCreateScreen: FCN = () => {
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      navigate(-1);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });
  const formik = useFormik({
    initialValues: {
      dni: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      sex: '',
    },
    validationSchema: Yup.object({
      dni: Yup.string().required('El DNI es requerido'),
      name: Yup.string().required('El nombre es requerido'),
      email: Yup.string().email('El email no es válido').required('El email es requerido'),
      phone: Yup.string()
        .min(10, 'el teléfono no tiene suficientes datos')
        .required('El teléfono es requerido'),
      password: Yup.string().required('La contraseña es requerida'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('confirmar contraseña es requerida'),
      sex: Yup.string().required('El sexo es requerido'),
    }),
    onSubmit: (values) => {
      createUser({
        variables: {
          input: {
            dNI: values.dni,
            name: values.name,
            email: values.email,
            phone: values.phone,
            gender: values.sex,
            password: values.password,
            role: 'CENSOR',
          },
        },
      });
    },
  });
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <BackBar
        iconColor="#40729f"
        stlyes={{
          AtomView: () => css`
            justify-content: flex-start;
          `,
        }}
      >
        <AtomText
          customCSS={css`
            color: #40729f;
            font-weight: bold;
            font-size: 18px;
            padding-left: 30px;
          `}
        >
          Agregar nuevo Encuestador
        </AtomText>
      </BackBar>
      <AtomWrapper
        customCSS={css`
          width: 90%;
        `}
      >
        <AtomInput id="dni" formik={formik} label="Numero de documento" />
        <AtomInput id="name" formik={formik} label="Nombre" />
        <AtomInput id="email" formik={formik} label="Email" keyboardType="email-address" />
        <AtomInput id="phone" formik={formik} label="Numero de telefono" keyboardType="numeric" />
        <AtomInput id="password" formik={formik} label="Contraseña" type="password" />
        <AtomInput
          id="passwordConfirm"
          formik={formik}
          label="confirmar contraseña"
          type="password"
        />
        <AtomInput
          id="sex"
          formik={formik}
          label="Sexo"
          type="select"
          options={[
            { id: 1, label: 'Masculino', value: 'MALE' },
            {
              id: 2,
              label: 'Femenino',
              value: 'FEMALE',
            },
          ]}
        />
      </AtomWrapper>

      <AtomButton
        style={{
          backgroundColor: '#167BD8',
        }}
        onPress={() => formik.handleSubmit()}
        loading={loading}
        textProps={{
          style: {
            fontSize: 20,
            color: '#fff',
          },
        }}
      >
        Enviar
      </AtomButton>
      {/* <AtomText>Test screen</AtomText>
      <AtomLink to="/">Back to Home</AtomLink> */}
      {/* <AtomLink to={`${location?.pathname}/aasdsa`}>Go</AtomLink> */}
      <Outlet />
    </AtomView>
  );
};
export default CensorCreateScreen;
