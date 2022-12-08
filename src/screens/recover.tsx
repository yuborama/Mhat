import { useFormik } from 'formik';
import { useAtomValue } from 'jotai';
import { FCN, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import * as Yup from 'yup';
import { LOGIN_MEMBER } from '~/apollo/mutations/user';
import { IMutationFilter } from '~/types';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import AtomViewKeyboard from '~/components/@atoms/AtomViewKeyboard';
import AtomText from '~/components/@atoms/AtomText';
import AtomViewTouchableWithout from '~/components/@atoms/AtomViewTouchableWithout';
import { GenerateShadowBox } from '~/utils/generateBoxShadow';
import { useTheme, css } from 'styled-components';
import { CustomizeAtom } from '~/jotai/customize';
import AtomBackgroundImage from '~/components/@atoms/AtomBackgroundImage';
import AtomInputText from '~/components/@atoms/AtomInput/Text/InputText';
import AtomLink from '~/components/@atoms/AtomLink';
import { useMutation } from '@apollo/client';
import { RECOVER_PASSWORD } from '~/apollo/mutations/member';
import CONFIG from '~/config';

const initialValues = {
  email: '',
};

const Login: FCN = () => {
  const customize = useAtomValue(CustomizeAtom);
  const theme = useTheme();
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [EXELOGIN] = useMutation<IMutationFilter<'loginMember'>>(LOGIN_MEMBER, {
    onError: (error) => {
      setLoading(false);
      Alert.alert('Error', error.message);
    },
  });

  const [EXERECOVERPASSWORD] = useMutation<IMutationFilter<`recoverPassword`>>(RECOVER_PASSWORD, {
    onCompleted: () => {
      setSend(true);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().required(`Escribe tu email`),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      await EXERECOVERPASSWORD({
        variables: {
          input: {
            email: values.email,
            url: `http://${CONFIG?.HOST}/recover-password/`,
          },
        },
      });
      setSend(true);
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

            {send ? (
              <>
                <AtomText
                  css={() => css`
                    color: ${customize?.colors?.primary};
                    text-align: center;
                    font-size: 16px;
                    margin: 0px 0px 20px 0px;
                    font-weight: 700;
                  `}
                >
                  Te enviamos un email para recuperar tu contraseña.
                </AtomText>

                <AtomView
                  css={() => css`
                    background-color: transparent;
                    flex-direction: row;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <AtomLink to={'/login'}>Iniciar sesión</AtomLink>
                </AtomView>
              </>
            ) : (
              <>
                <AtomText
                  css={() => css`
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-align: center;
                  `}
                >
                  Indícanos tu correo electrónico para recuperar contraseña
                </AtomText>
                <AtomInputText
                  name="email"
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
                  formik={formik}
                />
                <AtomButton
                  loading={loading}
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
                  <AtomText>¿Recordaste tu contraseña?</AtomText>
                  <AtomLink to={'/login'}>Iniciar sesión</AtomLink>
                </AtomView>
              </>
            )}
          </AtomView>
        </AtomBackgroundImage>
      </AtomViewKeyboard>
    </AtomViewTouchableWithout>
  );
};

export default Login;
