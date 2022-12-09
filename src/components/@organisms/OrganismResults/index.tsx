import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import { css } from 'styled-components/native';
import AtomSeparator from '~/components/@atoms/AtomSeparator';
import MoleculeCardResult from '~/components/@molecules/MoleculeCardResult';
import AtomMathJax from '~/components/AtomMathJax';
import { steps } from '~/utils/ChauchySimple';
import { run, factor } from 'algebrite';

interface OrganismResultsType {
  steps: steps;
}

const OrganismResults: FC<OrganismResultsType> = (props) => {
  const { steps } = props;
  console.log(steps.step6);
  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <AtomWrapper
        customCSS={css`
          padding: 10px 20px;
        `}
      >
        <AtomWrapper
          customCSS={css`
            flex-direction: row;
            align-items: center;
            padding: 10px 0px;
          `}
        >
          <AtomIcon
            color="#000000"
            width="28"
            height="28"
            uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/expo/result.svg"
          />
          <AtomText
            customCSS={css`
              width: auto;
              padding-left: 5px;
              font-weight: bold;
              font-size: 32px;
            `}
          >
            Resultado
          </AtomText>
        </AtomWrapper>
        <AtomSeparator borderBottomColor="#BDBEBE" />
      </AtomWrapper>
      <AtomWrapper
        customCSS={css`
          padding: 10px 20px;
        `}
      >
        <AtomWrapper
          customCSS={css`
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #cdcdcd;
          `}
        >
          <AtomWrapper
            customCSS={css`
              background-color: #f9aaaa;
              padding: 5px 10px;
            `}
          >
            <AtomText
              customCSS={css`
                font-weight: bold;
              `}
            >
              RESUELVA LA ECUACION
            </AtomText>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              min-height: 80px;
            `}
          >
            <PagerView
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <AtomMathJax html={`${run(steps.fx, true).toString().split(',')?.[1] ?? ''}`} />
            </PagerView>
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            padding-top: 32px;
          `}
        >
          <MoleculeCardResult
            title="Evaluando la función y remplazando z por (x+j*y)"
            funtions={[{ fx: steps.step1 }]}
          />
          <MoleculeCardResult
            title="Hallando fx Real e Imaginaria"
            funtions={[
              { text: 'u=', fx: steps.step2.u },
              { text: 'v=', fx: steps.step2.v },
            ]}
          />
          <MoleculeCardResult
            title="Hallando derivadas parciales"
            funtions={[
              { fx: steps.step3.dudx, text: 'dudx =' },
              { fx: steps.step3.dvdx, text: 'dvdx =' },
              { fx: steps.step3.dudy, text: 'dudy =' },
              { fx: steps.step3.dvdy, text: 'dvdy =' },
            ]}
          />
          <MoleculeCardResult
            title="Verificando Cauchy Riemman"
            isLatex
            funtions={[
              {
                fx: `${run(steps.step3.dudx, true).toString().split(',')?.[1] ?? ''} = ${
                  run(steps.step3.dvdy, true).toString().split(',')?.[1] ?? ''
                }`,
              },
              {
                fx: `${run(steps.step3.dvdx, true).toString().split(',')?.[1] ?? ''} = ${
                  run(`-(${steps.step3.dudy})`, true).toString().split(',')?.[1] ?? ''
                }`,
              },
            ]}
          />
          <MoleculeCardResult
            title="Aplicando formula de Cauchy Riemman"
            funtions={[{ fx: steps.step5 }]}
          />
          <MoleculeCardResult
            title="Factorización de la función"
            isLatex
            funtions={[{ fx: steps.step6.replace(/[*]/g, '') }]}
          />
          <MoleculeCardResult
            title="Verificar la función"
            isLatex
            funtions={[
              {
                fx: `${run(steps.derivate, true).toString().split(',')?.[1] ?? ''} = ${
                  run(steps.derivate, true).toString().split(',')?.[1] ?? ''
                }`,
              },
            ]}
          />
        </AtomWrapper>
      </AtomWrapper>
    </ScrollView>
  );
};
export default OrganismResults;
