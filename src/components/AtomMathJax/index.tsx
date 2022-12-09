import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const chargeInfoHtml = (content: string, options: String) => {
  return `
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config(${options});
        MathJax.Hub.Queue(function() {
            const height = document.documentElement.scrollHeight;
            window.ReactNativeWebView.postMessage(String(height));
            document.getElementById("formula").style.visibility = '';
        });
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
    <div id="formula" style="visibility: hidden;">
        ${content}
    </div>
`;
};

const defaultOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
  },
};

interface AtomMathJaxType {
  html: string;
}

const AtomMathJax: FC<AtomMathJaxType> = (props) => {
  const { html } = props;
  const options = JSON.stringify(Object.assign({}, defaultOptions));
  const htmlContent = chargeInfoHtml(html, options);
  const [height, setHeight] = useState(1);

  return (
    <View
      style={{
        height: height,
        backgroundColor: 'transparent',
      }}
    >
      <WebView
        scrollEnabled={false}
        onMessage={(event) => {
          setHeight(Number(event.nativeEvent.data));
        }}
        source={{ html: htmlContent }}
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: 'auto',
          
        }}
      />
    </View>
  );
};

export default AtomMathJax;
