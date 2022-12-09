import React, { FCN, useState } from 'react';
import AtomView from '~/components/@atoms/AtomView';
import { css } from 'styled-components/native';
import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import AtomButton from '~/components/@atoms/AtomButton';
import { useFormik } from 'formik';
import MoleculeLoaderScreen from '~/components/@molecules/MoleculeLoaderScreen';
import * as Yup from 'yup';
import InputText from '~/components/@atoms/AtomInput/typeText/InputText';
import ApplyCauchy, { steps } from '~/utils/ChauchySimple';
import OrganismResults from '~/components/@organisms/OrganismResults';
import { Image, Keyboard } from 'react-native';
const Cauchi: FCN = () => {
  const [loading, setloading] = useState(false);
  const [steps, setSteps] = useState<steps>(null as unknown as steps);
  const formik = useFormik({
    initialValues: {
      fx: '',
    },
    validationSchema: Yup.object({
      fx: Yup.string().required('Debe Digitar una Funcion en terminos de z'),
    }),
    onSubmit: (values) => {
      console.log(values);
      setloading(true);
      setTimeout(() => {
        setSteps(ApplyCauchy(values.fx) as steps);
        setloading(false);
      }, 2000);
    },
  });
  return (
    <MoleculeLoaderScreen loading={loading}>
      <AtomView
        css={() => css`
          flex: 1;
        `}
      >
        <AtomWrapper
          customCSS={css`
            flex: 1;
          `}
        >
          {steps === null ? (
            <AtomWrapper
              customCSS={css`
                flex: 1;
                justify-content: center;
                align-items: center;
              `}
            >
              <AtomIcon
                uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/expo/home.svg"
                width="112"
                height="112"
                color="#737373"
              />
              <AtomText
                customCSS={css`
                  padding-top: 30px;
                  max-width: 60%;
                  text-align: center;
                `}
              >
                Aún no has calculado tu derrivada, digita una funcion.
              </AtomText>
            </AtomWrapper>
          ) : (
            <OrganismResults steps={steps} />
          )}
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            align-items: center;
            padding: 20px;
            background-color: #27272b;
            /* position: absolute;
            bottom: 0; */
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
          `}
        >
          <InputText
            id="fx"
            formik={formik}
            style={{
              fontSize: 16,
            }}
            placeholder="Escribe tu función a evaluar"
            ColorTextError="#ffffff"
            customCSSWrapper={css`
              padding: 20px 0 20px 24px;
            `}
            onSubmitEditing={() => {
              setSteps(null as unknown as steps);
              Keyboard.dismiss();
              formik.handleSubmit();
            }}
            viewLabel={
              <AtomWrapper
                customCSS={css`
                  width: 100%;
                  flex-direction: row;
                  align-items: center;
                  padding: 10px 0;
                `}
              >
                <AtomIcon
                  uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/expo/f.svg"
                  color="#ffffff"
                  width="20"
                  height="20"
                />
                <AtomText
                  customCSS={css`
                    width: auto;
                    padding-left: 5px;
                    font-weight: bold;
                    color: #ffffff;
                  `}
                >
                  Función
                </AtomText>
              </AtomWrapper>
            }
          />
          <AtomButton
            css={() => css`
              width: 100%;
              background-color: #f02a2a;
              padding: 19px 30px;
              border-radius: 8px;
            `}
            onPress={() => {
              setSteps(null as unknown as steps);
              formik.handleSubmit();
              Keyboard.dismiss();
            }}
            textProps={{
              css: () => css`
                font-size: 20px;
                color: #ffffff;
                font-weight: bold;
              `,
            }}
          >
            Calcular
          </AtomButton>
        </AtomWrapper>
      </AtomView>
    </MoleculeLoaderScreen>
  );
};
export default Cauchi;
