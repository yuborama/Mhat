import { useFormik } from 'formik';
import { useAtomValue, useSetAtom } from 'jotai';
import { FCN, useState } from 'react';
import { Alert, Image, Keyboard } from 'react-native';
import { useNavigate } from 'react-router-native';
import { SvgCssUri } from 'react-native-svg';
import * as Yup from 'yup';
import { LOGIN_MEMBER } from '~/apollo/mutations/user';
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
import { useMutation } from '@apollo/client';
import AtomImage from '~/components/@atoms/AtomImage';
import { AtomInput } from '@ixulabs/native-ui';
import { MeReducer } from '~/jotai/me';
import { IUser } from '~/types/schemas';

const Login: FCN = () => {
  const project = useAtomValue(ProjectAtom);
  const customize = useAtomValue(CustomizeAtom);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { refetch } = useAtomValue(QueryMeAtom);
  const navigate = useNavigate();
  const setToken = useSetAtom(TokenAtom);

  const [EXELOGIN] = useMutation<IMutationFilter<'login'>>(LOGIN_MEMBER, {
    onError: (error) => {
      setLoading(false);
      Alert.alert('Error', error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: 'johan@gmail.com',
      password: '12345678',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().required(`Escribe tu email`),
      password: Yup.string().required(`Escribe tu password`),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { data } = await EXELOGIN({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
      await setToken(data?.login?.autentication);
      await AsyncStorage.setItem('token', data?.login.autentication ?? '');
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
        <AtomImage
          resizeMode="contain"
          css={() => css`
            width: 100%;
            height: 200px;
          `}
          source={{
            uri: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/imagen_recortada-removebg-preview.png',
          }}
        />
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
          <AtomText
            css={() => css`
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 20px;
              text-align: center;
            `}
          >
            Iniciar sesión
          </AtomText>
          <AtomInput id="email" placeholder="Correo electrónico" formik={formik} />
          <AtomInput id="password" type="password" placeholder="Contraseña" formik={formik} />
          <AtomLink to={'/recover'}>¿Olvidaste tu contraseña?</AtomLink>
          <AtomButton
            type="button"
            loading={loading}
            onPress={() => {
              formik.handleSubmit();
            }}
            css={() => css`
              width: 100%;
              height: 30px;
            `}
          >
            <AtomText
              astype="button"
              css={() => css`
                color: #ffffff;
              `}
            >
              Continuar
            </AtomText>
          </AtomButton>
        </AtomView>
        <AtomImage
          resizeMode="contain"
          css={() => css`
            width: 100%;
            height: 100px;
          `}
          source={{
            uri: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/WhatsApp_Image_2022-09-16_at_6.56.20_PM-removebg-preview.png',
          }}
        />
      </AtomViewKeyboard>
    </AtomViewTouchableWithout>
  );
};

export default Login;
