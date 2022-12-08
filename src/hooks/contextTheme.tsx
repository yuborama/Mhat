import React from 'react';
import { useSetAtom, useAtom } from 'jotai';
import { ThemeProvider } from 'styled-components/native';
import { FC, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContextProps, ThemeKeyType } from '../types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeKeyAtom, ThemeAtom, ThemeCallbackAtom } from '~/jotai/theme';

const ThemeContext: FC<ThemeContextProps> = (props) => {
  const { children, themes, defaultTheme } = props;
  const [theme, setTheme] = useAtom(ThemeAtom);
  const [themeCallback, setThemeCallback] = useAtom(ThemeCallbackAtom);
  const setThemeKey = useSetAtom(ThemeKeyAtom);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      const keySystem = colorScheme === 'dark' ? 'dark' : 'light';
      const keyTheme = (await AsyncStorage.getItem('THEME_KEY')) as ThemeKeyType;
      const key = keyTheme === 'auto' ? keySystem : keyTheme;
      setTheme(themes?.select?.[key] ?? defaultTheme);
      setThemeKey(key ?? 'auto');
      setThemeCallback(() => async (keyArgs: ThemeKeyType) => {
        const keySystem = colorScheme === 'dark' ? 'dark' : 'light';
        const keyTheme = (await AsyncStorage.getItem('THEME_KEY')) as ThemeKeyType;
        const key = keyArgs ?? keyTheme ?? keySystem;
        setTheme(
          key === 'auto'
            ? themes?.select?.[keySystem] ?? defaultTheme
            : themes?.select?.[key] ?? defaultTheme
        );
        setThemeKey(key);
        await AsyncStorage.setItem('THEME_KEY', key);
      });
    };
    loadTheme();
    return () => {};
  }, [!themeCallback]);

  useEffect(() => {
    const loadTheme = async () => {
      const key = (await AsyncStorage.getItem('THEME_KEY')) as ThemeKeyType;
      if (key === 'auto') {
        const keySystem = colorScheme === 'dark' ? 'dark' : 'light';
        setTheme(themes?.select?.[keySystem] ?? defaultTheme);
        setThemeKey('auto');
      }
    };
    loadTheme();
    return () => {};
  }, [colorScheme]);

  return <ThemeProvider theme={theme ?? defaultTheme}>{children}</ThemeProvider>;
};

export default ThemeContext;
