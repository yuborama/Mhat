import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import lodash from 'lodash';
import { FC } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { css, useTheme } from 'styled-components/native';
import AtomTextError from './textError';
import AtomInputType from './type';

const InputText: FC<AtomInputType> = (props) => {
  const {
    formik,
    value,
    id,
    label,
    wrapperWidth,
    placeholder,
    onPressIcon,
    iconUri,
    inputIconWidth,
    inputIconHeigth,
    inputIconcolor,
    backgroundColor,
    labelFontSize: fontSize,
    inputStyle,
    viewLabel,
    customCSSWrapper,
  } = props;

  const theme = useTheme();
  return (
    <AtomWrapper
      width={wrapperWidth ?? '100%'}
      style={{
        marginBottom: 5,
      }}
    >
      <>
        {label && viewLabel === undefined && (
          <AtomText
            style={{
              fontSize: fontSize as number,
              fontWeight: 'bold',
              color: theme?.input?.inputText?.colorLabel ?? '#000',
            }}
          >
            {label}
          </AtomText>
        )}
        {viewLabel}
        <AtomWrapper
          style={[
            {
              backgroundColor: backgroundColor ?? theme?.input?.inputText?.colorBackground,
            },
            styles.inputContainer,
          ]}
          customCSS={css`
            padding-left: 10px;
            ${customCSSWrapper}
          `}
        >
          <TextInput
            style={[
              styles.input,
              {
                width: iconUri ? '85%' : '100%',
                flex: 1,
                height: '100%',
                color: theme?.input?.inputText?.colorText,
              },
              inputStyle,
            ]}
            placeholder={placeholder}
            value={value ?? lodash.get(formik?.values, id)}
            onChangeText={formik?.handleChange(id)}
            {...props}
          />
          {iconUri && (
            <TouchableOpacity onPress={onPressIcon} style={styles.iconContainer}>
              <AtomIcon
                color={inputIconcolor ?? theme?.input?.inputText?.colorIcon}
                uri={iconUri}
                width={inputIconWidth || '22px'}
                height={inputIconHeigth || '22px'}
              />
            </TouchableOpacity>
          )}
        </AtomWrapper>
        <AtomTextError {...props} color={props.ColorTextError} />
      </>
    </AtomWrapper>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: '#ececec',
    minHeight: 40,
    maxHeight: 200,
    height: 'auto',
    borderRadius: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  input: {
    fontSize: 16,
    color: '#ffffff',
  },
});
