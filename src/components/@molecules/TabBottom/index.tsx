import { AtomIcon } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';

interface AtomBottomType {
  links?: {
    name: string;
    icon: string;
    route: string;
    state?: {};
  }[];
}
const width = Dimensions.get('window').width;
const AtomBottom: FC<AtomBottomType> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { links } = props;
  return (
    <AtomView
      style={{
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 50,
        backgroundColor: '#000000',
        flexDirection: 'row',
      }}
    >
      {links?.map((link, index) => {
        const color = location.pathname === link.route ? '#fdc82f' : '#ffffff';
        return (
          <AtomButton
            type="button"
            css={() => css`
              background-color: transparent;
              padding: 0;
              height: 100%;
              display: flex;
              width: ${width / links.length}px;
              flex-direction: column;
              padding: 0;
            `}
            key={`tabBottom-${index}`}
            onPress={() => {
              navigate(link.route, {
                state: {
                  ...link?.state
                },
              });
            }}
          >
            <AtomIcon height="25px" width="25px" uri={link.icon} color={color} />
            <AtomText
              css={() => css`
                font-size: 9px;
                align-items: center;
                font-weight: bold;
                color: ${color};
              `}
              numberOfLines={1}
            >
              {link.name}
            </AtomText>
          </AtomButton>
        );
      })}
    </AtomView>
  );
};
export default AtomBottom;
