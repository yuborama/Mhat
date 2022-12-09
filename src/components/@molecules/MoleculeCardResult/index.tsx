import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import AtomView from '~/components/@atoms/AtomView';
import { run } from 'algebrite';
import { css } from 'styled-components/native';
import PagerView from 'react-native-pager-view';
import AtomMathJax from '~/components/AtomMathJax';
interface MoleculeCardResultType {
  funtions: { fx: string; text?: string }[];
  title: string;
  isLatex?: boolean;
}

const MoleculeCardResult: FC<MoleculeCardResultType> = (props) => {
  const { title, funtions, isLatex } = props;
  // single fx
  // const fxLatex = String(run(`${fx ?? ''}`, true).toString()).split(',')?.[1] ?? '';
  // multiple fx
  const fxLatex = isLatex
    ? funtions
    : funtions.map((fx) => ({
        fx: String(run(`${fx.fx ?? ''}`, true).toString()).split(',')?.[1] ?? '',
        text: fx.text,
      }));
  console.log('fxLatex', fxLatex);
  return (
    <AtomView
      css={() => css`
        background-color: transparent;
        width: 100%;
        padding: 15px 0px;
      `}
    >
      <AtomWrapper
        customCSS={css`
          flex-direction: row;
          align-items: center;
          width: 100%;
          padding-bottom: 24px;
        `}
      >
        <AtomIcon
          uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/expo/resultcheck.svg"
          color="#737373"
          height="14"
          width="14"
        />
        <AtomText
          customCSS={css`
            width: auto;
            padding-left: 5px;
            font-weight: bold;
          `}
        >
          {title}
        </AtomText>
      </AtomWrapper>
      <AtomWrapper
        customCSS={css`
          border-radius: 10px;
          background-color: #edf0f2;
          min-height: 100px;
          padding-top: 5px;
          padding-left: 10px;
        `}
      >
        {fxLatex.map((fx, index) => {
          const html = `${fx?.text ?? ''}${fx.fx.replace(/[$]/g, '')}`;
          console.log('html', html);
          return (
            <PagerView
              key={`${fx}-${index + 1}`}
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <AtomMathJax html={`$${html}$`} />
            </PagerView>
          );
        })}
      </AtomWrapper>
    </AtomView>
  );
};
export default MoleculeCardResult;
