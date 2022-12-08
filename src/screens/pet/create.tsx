import { AtomIcon, AtomInput, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import { useFormik } from 'formik';
import React, { FCN, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import * as Yup from 'yup';
import AtomUploadPhotos, { IPhotos } from '~/components/@atoms/AtomUploadPhotos';
import { Alert, ScrollView } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { IQueryFilter } from '~/types';
import { USER_BY_ID } from '~/apollo/querys/user';
import UpdoadPhotos from '~/utils/UploadPhotos';
import { CREATE_PET } from '~/apollo/mutations/pet';
import BackBar from '~/components/@molecules/BackBar';

const optionSize = [
  { id: 1, value: 'SMALL', label: 'Pequeño' },
  { id: 2, value: 'MEDIUM', label: 'Mediano' },
  { id: 3, value: 'LARGE', label: 'Grande' },
];

const optionType = [
  { id: 1, value: 'DOG', label: 'Perro' },
  { id: 2, value: 'CAT', label: 'Gato' },
];

const optionGender = [
  { id: 1, label: 'Macho', value: 'MALE' },
  {
    id: 2,
    label: 'Hembra',
    value: 'FEMALE',
  },
];

const validationSchema = (id?: string) => {
  return id
    ? Yup.object({
        photos: Yup.array().min(1, 'Debe subir al menos una foto'),
        sex: Yup.string().required('El sexo es requerido'),
        name: Yup.string().required('El nombre es requerido'),
        type: Yup.string().required('El tipo es requerido'),
        breed: Yup.string().required('La raza es requerida'),
        size: Yup.string().required('El tamaño es requerido'),
        dateOfBirth: Yup.string().required('La fecha de nacimiento es requerida'),
        color: Yup.string().required('El color es requerido'),
      })
    : Yup.object({
        photos: Yup.array().min(1, 'Debe subir al menos una foto'),
        sex: Yup.string().required('El sexo es requerido'),
        name: Yup.string().required('El nombre es requerido'),
        type: Yup.string().required('El tipo es requerido'),
        breed: Yup.string().required('La raza es requerida'),
        size: Yup.string().required('El tamaño es requerido'),
        dateOfBirth: Yup.string().required('La fecha de nacimiento es requerida'),
        color: Yup.string().required('El color es requerido'),
      });
};
const dateNow = new Date();

const PetCreateScreen: FCN = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [exeCreatePet] = useMutation(CREATE_PET, {
    onCompleted: (data) => {
      navigate(-1);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const { data, loading } = useQuery<IQueryFilter<'userById'>>(USER_BY_ID, {
    skip: !id,
    variables: {
      userByIdId: id,
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      breed: '',
      size: '',
      photos: [] as IPhotos[],
      dateOfBirth: dateNow,
      color: '',
      sex: '',
    },
    validationSchema: validationSchema(id),
    onSubmit: async (values) => {
      const photos = await UpdoadPhotos(values.photos);
      const userId = id ? { userId: data?.userById?.id } : {};
      const zone = id
        ? {
            address: data?.userById?.location?.address,
            latitude: data?.userById?.location?.latitude,
            longitude: data?.userById?.location?.longitude,
            zone: data?.userById?.location?.zone,
          }
        : {};
      exeCreatePet({
        variables: {
          input: {
            images: photos,
            name: values.name,
            petType: values.type,
            breed: values.breed,
            size: values.size,
            dateOfBirth: values.dateOfBirth,
            color: values.color,
            gender: values.sex,
            ...userId,
            ...zone,
            // address: '',
            // latitude: 0,
            // longitude: 0,
            // zone: '',
          },
        },
      });
    },
  });
  console.log(`image`, id);
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
          Agregar nueva Mascota
        </AtomText>
      </BackBar>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <AtomWrapper
          customCSS={css`
            padding: 0 20px;
          `}
        >
          <AtomUploadPhotos id="photos" labelText="Suba sus imagenes favoritas" formik={formik} />
          <AtomInput id="name" formik={formik} label="Nombre de la mascota" />
          <AtomInput
            id="type"
            formik={formik}
            label="Tipo de animal"
            type="select"
            options={optionType}
          />
          <AtomInput id="breed" formik={formik} label="Raza" />
          <AtomInput id="size" formik={formik} label="Tamaño" type="select" options={optionSize} />
          <AtomInput id="dateOfBirth" formik={formik} label="Fecha de nacimiento" type="date" />
          <AtomInput id="color" formik={formik} label="Color" />
          <AtomInput id="sex" formik={formik} label="Sexo" type="select" options={optionGender} />
        </AtomWrapper>
      </ScrollView>
      <AtomButton
        style={{
          backgroundColor: '#167BD8',
        }}
        onPress={() => {
          formik.handleSubmit();
          console.log(`errors`, formik.errors);
        }}
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
export default PetCreateScreen;
