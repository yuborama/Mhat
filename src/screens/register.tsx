import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useAtomValue, useSetAtom } from 'jotai';
import { FCN, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigate } from 'react-router-native';
import { SvgCssUri } from 'react-native-svg';
import * as Yup from 'yup';
import { ProjectAtom } from '~/jotai/project';
import { IMutationFilter } from '~/types';
import { TokenAtom } from '~/jotai/token';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import AtomViewKeyboard from '~/components/@atoms/AtomViewKeyboard';
import AtomText from '~/components/@atoms/AtomText';
import AtomViewTouchableWithout from '~/components/@atoms/AtomViewTouchableWithout';
import { GenerateShadowBox } from '~/utils/generateBoxShadow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, css } from 'styled-components';
import { QueryMeAtom } from '~/jotai/me';
import { CustomizeAtom } from '~/jotai/customize';
import AtomBackgroundImage from '~/components/@atoms/AtomBackgroundImage';
import AtomInputText from '~/components/@atoms/AtomInput/Text/InputText';
import AtomLink from '~/components/@atoms/AtomLink';
import { CREATEMEMBER } from '~/apollo/mutations/member';

const initialValues = {
  email: '',
  password: '',
};

const Login: FCN = () => {
  const customize = useAtomValue(CustomizeAtom);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { loading: loadingQueryMe, refetch } = useAtomValue(QueryMeAtom);
  const navigate = useNavigate();
  const setToken = useSetAtom(TokenAtom);

  const [EXECREATEMEMBER] = useMutation<IMutationFilter<'createMember'>>(CREATEMEMBER, {
    onError: (error) => {
      setLoading(false);
      Alert.alert('Error', error.message);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, ingrese un email válido')
        .required('Por favor, ingrese un email'),
      password: Yup.string()
        .required('Por favor, ingrese una contraseña')
        .test('string', 'La contraseña debe tener mínimo 8 caracteres', (value) =>
          value === '' ? true : `${value}`.length >= 8
        ),
    }),
    onSubmit: async (valores) => {
      setLoading(true);
      const { data } = await EXECREATEMEMBER({
        variables: {
          input: {
            email: valores.email,
            password: valores.password,
          },
        },
      });
      await setToken(data?.createMember?.accessToken);
      await AsyncStorage.setItem('token', data?.createMember?.accessToken ?? '');
      await refetch()?.finally(() => {
        navigate('/');
      });
    },
  });

  return (
    <AtomViewTouchableWithout onPress={Keyboard.dismiss}>
      <AtomViewKeyboard
        css={() => css`
          background-image: url(${customize?.logo?.main?.url});
        `}
      >
        <AtomBackgroundImage
          source={{
            uri: 'https://storage.googleapis.com/bucket_ixuabs_general/Ixulabs/ADMIN/backgrounds-form/background-movite-transparent.png',
          }}
          resizeMethod="scale"
          resizeMode="cover"
          css={() => css`
            width: 100%;
            height: 100%;
            background-color: ${customize?.colors?.primary};
          `}
        >
          <AtomView
            astheme="secondary"
            css={() => css`
              width: 80%;
              border-radius: 10px;
              padding: 40px 40px;
            `}
            style={{
              ...GenerateShadowBox({
                shadowColor: theme?.shadow?.color,
              }),
            }}
          >
            <SvgCssUri
              width="200px"
              height="50px"
              uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Ixulabs/icons/logo%20-%20copia.svg"
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 30,
              }}
            />
            <AtomText
              css={() => css`
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                text-align: center;
              `}
            >
              Registrate para acceder a nuestra plataforma
            </AtomText>
            <AtomInputText
              name="email"
              label="Correo electrónico"
              placeholder="Correo electrónico"
              formik={formik}
            />
            <AtomInputText
              name="password"
              textContentType="password"
              secureTextEntry={true}
              placeholder="Contraseña"
              label="Contraseña"
              keyboardType="numbers-and-punctuation"
              formik={formik}
            />
            <AtomButton
              loading={loading || loadingQueryMe}
              onPress={() => {
                formik.handleSubmit();
              }}
              css={() => css`
                width: 100%;
                margin: 0px 0px 20px 0px;
              `}
            >
              Continuar
            </AtomButton>
            <AtomView
              css={() => css`
                background-color: transparent;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <AtomText>¿Ya tienes una cuenta?</AtomText>
              <AtomLink to={'/login'}>Iniciar sesión</AtomLink>
            </AtomView>
          </AtomView>
        </AtomBackgroundImage>
      </AtomViewKeyboard>
    </AtomViewTouchableWithout>
  );
};

export default Login;
