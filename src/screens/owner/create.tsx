import { AtomIcon, AtomInput, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import { useFormik } from 'formik';
import React, { FCN, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomLink from '~/components/@atoms/AtomLink';
import AtomView from '~/components/@atoms/AtomView';
import { LocationObject } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Yup from 'yup';
import { View } from 'moti/build';
import { Alert, ScrollView } from 'react-native';
import getLocation, { locationType } from '~/utils/getLocation';
import { CREATE_USER } from '~/apollo/mutations/user';
import { useMutation } from '@apollo/client';
import BackBar from '~/components/@molecules/BackBar';

const OwnerCreateScreen: FCN = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null as unknown as locationType);
  const [errorMsg, setErrorMsg] = useState(null as unknown as string);
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      navigate(-1);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  console.log(`id`, id);
  const formik = useFormik({
    initialValues: {
      dni: '',
      email: '',
      location: location?.addressString ?? '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      sex: '',
      zone: '',
    },
    enableReinitialize: true,
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
      location: Yup.string()
        .test('location', 'La ubicación es requerida', () => location !== null)
        .required('La ubicación es requerida'),
      zone: Yup.string().required('La zona es requerida'),
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
            role: 'USER',
            // observation: '',
            location: {
              address: location?.addressString ?? '',
              latitude: location?.coords?.latitude ?? 0,
              longitude: location?.coords?.longitude ?? 0,
              zone: values.zone,
            },
          },
        },
      });
    },
  });

  useEffect(() => {
    if (location === null && errorMsg !== null) {
      Alert.alert(
        'Ubicación',
        'Para poder continuar, debes permitir que la aplicación acceda a tu ubicación',
        [
          {
            text: 'Aceptar',
          },
        ]
      );
    }
  }, [setErrorMsg]);

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
          Agregar nuevo Dueño
        </AtomText>
        {/* <AtomButton
          type="button"
          css={() => css`
            background-color: transparent;
            padding: 0px;
          `}
        >
          <AtomIcon
            color="#40729f"
            uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/search.svg"
            height="20"
            width="20"
          />
        </AtomButton> */}
      </BackBar>

      <ScrollView
        style={{
          width: '100%',
        }}
      >
        <AtomWrapper
          alignItems="center"
          customCSS={css`
            padding: 20px 0;
          `}
        >
          <AtomWrapper
            customCSS={css`
              width: 90%;
            `}
          >
            <AtomInput id="dni" formik={formik} label="Numero de documento" />
            <AtomInput id="name" formik={formik} label="Nombre" />
            <AtomInput id="email" formik={formik} label="Email" keyboardType="email-address" />
            <AtomInput
              id="phone"
              formik={formik}
              label="Numero de telefono"
              keyboardType="numeric"
            />
            <AtomInput id="password" formik={formik} label="Contraseña" type="password" />
            <AtomInput
              id="passwordConfirm"
              formik={formik}
              label="confirmar contraseña"
              type="password"
            />
            <AtomInput
              id="zone"
              label="Zona"
              formik={formik}
              type="select"
              options={[
                { id: 1, label: 'Casco urbano', value: 'Urban' },
                { id: 2, label: 'Casco Rural', value: 'rural' },
                { id: 3, label: 'Corregimiento', value: 'countryside' },
              ]}
            />
            <AtomInput
              id="location"
              formik={formik}
              label="Ubicacion"
              iconUri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/location.svg"
              onPressIcon={async () => {
                const location = await getLocation();
                if (location) {
                  setLocation(location);
                } else {
                  setErrorMsg('No se pudo obtener la ubicacion');
                }
              }}
            />
            {location?.coords && (
              <View
                style={{
                  width: '100%',
                  height: 300,
                }}
              >
                <MapView
                  region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Marker
                    title="Home"
                    draggable
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    onDragEnd={async (e) => {
                      e.persist();
                      const address = await Location.reverseGeocodeAsync({
                        latitude: e.nativeEvent?.coordinate?.latitude ?? location.coords.latitude,
                        longitude:
                          e.nativeEvent?.coordinate?.longitude ?? location.coords.longitude,
                      });
                      const addressString = `${address[0]?.name ?? ''}, ${
                        address[0]?.street ?? ''
                      }, ${address[0]?.postalCode ?? ''}, ${address[0]?.city ?? ''}, ${
                        address[0]?.region ?? ''
                      }, ${address[0]?.country ?? ''}`;
                      setLocation((prev) => ({
                        ...prev,
                        coords: {
                          ...prev.coords,
                          latitude: e.nativeEvent?.coordinate?.latitude ?? prev.coords.latitude,
                          longitude: e.nativeEvent?.coordinate?.longitude ?? prev.coords.longitude,
                        },
                        address: address,
                        addressString,
                      }));
                    }}
                  />
                </MapView>
              </View>
            )}
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
              backgroundColor: '#6c2525',
            }}
            onPress={() => {
              formik.handleSubmit();
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
        </AtomWrapper>
      </ScrollView>
      {/* <AtomText>Test screen</AtomText>
      <AtomLink to="/">Back to Home</AtomLink> */}
      {/* <AtomLink to={`${location?.pathname}/aasdsa`}>Go</AtomLink> */}
    </AtomView>
  );
};
export default OwnerCreateScreen;
