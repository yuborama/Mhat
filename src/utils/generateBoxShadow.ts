import { Platform } from 'react-native';

type IGenerateShadowBox = {
  xOffset?: number;
  yOffset?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

const initConfig = {
  elevation: 10,
  shadowColor: '#bebebe',
  shadowOpacity: 0.1,
  shadowRadius: 1.41,
  xOffset: 0,
  yOffset: 1,
};

export const GenerateShadowBox = (props?: IGenerateShadowBox) => {
  const { xOffset, yOffset, shadowColor, shadowOpacity, shadowRadius, elevation } = {
    ...initConfig,
    ...props,
  };

  return Platform.OS === 'android'
    ? {
        elevation,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowColor: shadowColor,
      }
    : {
        shadowColor: shadowColor,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      };
};
