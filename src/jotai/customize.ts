import { atom } from "jotai";

export const CustomizeInit = {
  fonts: {
    title: 'Montserrat',
    description: 'Montserrat',
  },
  colors: {
    primary: '#f1576c',
    secondary: '#ff686b',
    navbar: '#ffffff',
    footer: '#ff686b',
    card: '#ffffff',
    cardPrimary: '#f1576c',
    cardSecondary: '#ff686b',
    background: '#ffffff',
  },
  banner: {
    main: {
      url: 'https://storage.googleapis.com/bucket_ixuabs_general/Ixulabs/template1/loginDefaul-img.png',
      file: undefined as File | undefined,
    },
  },
  image: {
    main: {
      url: 'https://storage.googleapis.com/bucket_ixuabs_general/Ixulabs/template1/loginDefaul-img.png',
      file: undefined as File | undefined,
    },
  },
  logo: {
    main: {
      url: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/logos/horizontal/logo.svg',
      file: undefined as File | undefined,
    },
    tagline: 'Ixulabs',
  },
  button: {
    color: '#f1576c',
    radius: '4px',
  },
};

export const CustomizeAtom = atom(CustomizeInit);