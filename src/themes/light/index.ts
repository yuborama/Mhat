import { IPalette } from '~/types';

const colors = {
  button: {
    background: '#d86816',
  },
};

const ThemeLight: IPalette = {
  general: {
    color: {
      primary: '#ffffff',
      secondary: '#5a6a8a',
      accent: '#1461EB',
    },
  },
  button: {
    color: {
      primary: colors.button.background,
      secondary: '#5a6a8a',
      accent: '#1461EB',
    },
    type: 'flat',
  },
  view: {
    color: {
      primary: '#fafafa',
      secondary: '#ffffff',
      accent: '#1461EB',
    },
  },
  loader: {
    color: {
      primary: '#3459A8',
      secondary: '#5a6a8a',
      accent: '#1461EB',
    },
  },
  icon: {
    color: {
      primary: '#202124',
      secondary: '#5a6a8a',
      accent: '#3459a8',
    },
  },
  text: {
    color: {
      primary: '#1a1a1a',
      secondary: '#fafafa',
      accent: '#e2446c',
    },
  },
  input: {
    inputText: {
      colorLabel: '#162C5B',
      colorBackground: '#F4F4F4',
      colorBorder: '#000000',
      colorPlaceholder: '#BCBCBC',
      colorText: '#167BD8',
      colorIcon: '#167BD8',
    },
    inputSelect: {
      borderColor: '#000000',
      colorText: '#000000',
      colorIcon: '#000000',
      colorModal: '#ffffffd7',
    },
    color: {
      primary: '#ffffff',
      secondary: '#3459a8',
      accent: '#db4a4a',
      hover: '#3459a8',
      border: '#e3e3e3',
      shadow: '#e3e3e3',
      placeholder: '#6b6b6b',
    },
  },
  scrollbar: {
    width: 7,
    thumb: '#3459A8',
    track: '#e6e6e6',
  },
  shadow: {
    color: '#bebebe',
  },
};

export default ThemeLight;
