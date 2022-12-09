import React, { FC, FCN, useState } from 'react';
import { expand, float, findRoots, simplify, run, factor, d } from 'algebrite';
import AtomView from '~/components/@atoms/AtomView';
import { css } from 'styled-components/native';
import { AtomInput, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import AtomButton from '~/components/@atoms/AtomButton';
import { useFormik } from 'formik';
import MoleculeLoaderScreen from '~/components/@molecules/MoleculeLoaderScreen';
import * as Yup from 'yup';
import { ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import MoleculeCardResult from '~/components/@molecules/MoleculeCardResult';
import AtomMathJax from '~/components/AtomMathJax';
enum Operator {
  ADD = '+',
  SUBTRACT = '-',
}

// paso 1
const evaluateEquation = (fx: string) => {
  const change = fx.replace(/z/g, '(x+y*i)');
  //   console.log(change);
  const funcEval = run(change).toString();
  //   console.log(funcEval);
  //   const beautifyFunc = factor(funcEval, 'x').toString();
  //   console.log(beautifyFunc);
  return String(funcEval);
};
// paso 2
const findReIm = (fx: string) => {
  const arrayOperations = fx.split(/(\+|-)/);
  const test3 = arrayOperations.filter((item) => item !== '');
  const test4 = test3.map((item) => item.replace(/i/g, 'j'));
  const test5 = test4.reduce((acc, item, index) => {
    const isOperator = item === Operator.ADD || item === Operator.SUBTRACT;
    if (index === 0 && !isOperator) return [item];
    return isOperator ? [...acc, item + test4[index + 1]] : acc;
  }, [] as string[]);
  const uValuesArray = test5.filter((item: string) => !item.match(/j/g));
  const u = uValuesArray.toString().replace(/,/g, '');
  const vValuesArray = test5
    .filter((item: string) => item.match(/j/g))
    .map((item: string) => item.replace('j*', ''));
  const v = vValuesArray.toString().replace(/,/g, '');
  console.log(`u`, u);
  console.log(`v`, v);
  return { u, v };
};
// paso 3
const derivatesPartials = (u: string, v: string) => {
  const dudx = String(run(`d(${u}, x)`).toString());
  const dvdx = String(run(`d(${v}, x)`).toString());
  const dudy = String(run(`d(${u}, y)`).toString());
  const dvdy = String(run(`d(${v}, y)`).toString());
  return {
    dudx,
    dvdx,
    dudy,
    dvdy,
  };
};

// paso 4
const verifyCauchy = (dudx: string, dvdx: string, dudy: string, dvdy: string) => {
  const primaryRule = dudx === dvdy;
  const secondaryRule = dvdx === run(`-(${dudy})`).toString();
  return {
    primaryRule,
    secondaryRule,
  };
};

// paso 5
const applyFormula = (dudx: string, dvdx: string) => {
  const newFunc = `${dudx}+j*(${dvdx})`;
  return String(newFunc);
};

// paso 6
const factorization = (fx: string) => {
  const simplifyFunc = simplify(fx).toString();
  const beautifyFunc = factor(simplifyFunc, 'x').toString();
  return String(simplifyFunc);
};

export type steps = {
  step1: string;
  step2: {
    u: string;
    v: string;
  };
  step3: {
    dudx: string;
    dvdx: string;
    dudy: string;
    dvdy: string;
  };
  step4: {
    primaryRule: boolean;
    secondaryRule: boolean;
  };
  step5: string;
  step6: string;
  derivate: string;
};

const Cauchi: FCN = () => {
  const [loading, setloading] = useState(false);
  const [steps, setSteps] = useState<steps>({} as steps);
  const formik = useFormik({
    initialValues: {
      fx: '',
    },
    validationSchema: Yup.object({
      fx: Yup.string().required('Debe Digitar una Funcion en terminos de z'),
    }),
    onSubmit: (values) => {
      console.log('values', values);
      const data = values.fx;
      setloading(true);
      try {
        const test = evaluateEquation(data);
        console.log(`test`, test);
        const { u, v } = findReIm(test);

        const { dudx, dudy, dvdx, dvdy } = derivatesPartials(u, v);
        console.log(`dudx`, dudx);
        console.log(`dvdy`, dvdy);
        console.log(`dudy`, run(`-(${dudy})`).toString());
        console.log(`dvdx`, dvdx);
        const { primaryRule, secondaryRule } = verifyCauchy(dudx, dvdx, dudy, dvdy);
        console.log(`primaryRule`, primaryRule);
        console.log(`secondaryRule`, secondaryRule);
        if (primaryRule && secondaryRule) {
          const newFunc = applyFormula(dudx, dvdx);
          const factorizationfunc = factorization(newFunc);
          console.log(`factorizationfunc`, factorizationfunc);
          console.log(`derivate`, factorization(newFunc));
        }
        setloading(false);
        setSteps({
          step1: test.replace(/i/g, 'j'),
          step2: { u, v },
          step3: { dudx, dudy, dvdx, dvdy },
          step4: { primaryRule, secondaryRule },
          step5: `${dudx}+j*(${dvdx})`,
          step6: `${factorization(applyFormula(dudx, dvdx))}`,
          derivate: `${run(`d(${data}, z)`).toString()}`,
        });
      } catch (error) {
        setloading(false);
        console.log('error', error);
      }
    },
  });
  //   console.log('steps', steps);
  // console.log('steps', run(steps.step5, true).toString());
  return (
    <MoleculeLoaderScreen loading={loading}>
      <AtomView
        css={() => css`
          flex: 1;
          padding-bottom: 20px;
        `}
      >
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}
        >
          <AtomView
            css={() => css`
              padding: 10px 20px;
            `}
          >
            <AtomInput id="fx" placeholder="hola" label="funcion" formik={formik} />
            <AtomView
              css={() => css`
                align-items: flex-end;
              `}
            >
              <AtomButton
                onPress={() => {
                  setSteps({} as steps);
                  formik.handleSubmit();
                }}
                textProps={{
                  css: () => css`
                    color: white;
                  `,
                }}
              >
                calcular
              </AtomButton>
            </AtomView>
          </AtomView>
          {/* <MathJax html={'Solve the equation $6*j*x*y+3*x^2-3*y^2,$$6jxy+3x^2-3y^2$'} /> */}
          <PagerView
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '40%',
            }}
          >
            <AtomMathJax html={'hola1 $6jxy+3x^2-3y^2$'} />
          </PagerView>
          <PagerView
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <AtomMathJax html={'hola2 $6jxy+3x^2-3y^2$'} />
          </PagerView>
          <AtomWrapper
            customCSS={css`
              padding: 10px 20px;
            `}
          >
            {/* <MoleculeCardResult title="Paso 1" fx="2x + x^2" /> */}
          </AtomWrapper>
          {steps.step1 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 1</AtomText>
                <AtomText>evaluando la funcion y remplazando z por (x+j*y)</AtomText>
              </AtomView>
              <AtomText>{run(steps.step5, true)}</AtomText>
            </AtomView>
          )}
          {steps.step2 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 2</AtomText>
                <AtomText>Hallando fx Real e Imaginaria</AtomText>
              </AtomView>
              <AtomText>{`u = ${steps.step2.u}`}</AtomText>
              <AtomText>{`v = ${steps.step2.v}`}</AtomText>
            </AtomView>
          )}
          {steps.step3 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 3</AtomText>
                <AtomText>Hallando derivadas parciales</AtomText>
              </AtomView>
              <AtomText>{`dudx = ${steps.step3.dudx}`}</AtomText>
              <AtomText>{`dvdx = ${steps.step3.dvdx}`}</AtomText>
              <AtomText>{`dudy = ${steps.step3.dudy}`}</AtomText>
              <AtomText>{`dvdy = ${steps.step3.dvdy}`}</AtomText>
            </AtomView>
          )}
          {steps.step4 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 4</AtomText>
                <AtomText>Verificando Cauchy Riemman</AtomText>
              </AtomView>
              <AtomText
                color={steps.step4.primaryRule ? 'green' : 'red'}
              >{`${steps.step3.dudx} = ${steps.step3.dvdy}`}</AtomText>
              <AtomText color={steps.step4.secondaryRule ? 'green' : 'red'}>{`${
                steps.step3.dvdx
              } = ${
                steps.step3.dudy.startsWith('-')
                  ? steps.step3.dudy.replace(/-/, '')
                  : `-${steps.step3.dudy}`
              }`}</AtomText>
            </AtomView>
          )}
          {steps.step5 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 5</AtomText>
                <AtomText>aplicando formula de Cauchy Riemman</AtomText>
              </AtomView>
              <AtomText>{`f(z) = ${steps.step5}`}</AtomText>
            </AtomView>
          )}
          {steps.step6 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 6</AtomText>
                <AtomText>factorizancion de la funcion</AtomText>
              </AtomView>
              <AtomText>{`f(z) = ${steps.step6}`}</AtomText>
            </AtomView>
          )}
          {steps.step6 && (
            <AtomView
              css={() => css`
                padding: 10px 20px;
              `}
            >
              <AtomView
                css={() => css`
                  align-items: flex-start;
                `}
              >
                <AtomText fontWeight="bold">Paso 7</AtomText>
                <AtomText>verificar la funcion</AtomText>
              </AtomView>
              <AtomText>{`${steps.derivate} = ${steps.derivate}`}</AtomText>
            </AtomView>
          )}
        </ScrollView>
      </AtomView>
    </MoleculeLoaderScreen>
  );
};
export default Cauchi;
