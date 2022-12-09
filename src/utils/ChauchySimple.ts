import { simplify, run, factor } from 'algebrite';

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
  fx: string;
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

const ApplyCauchy = (fx: string): steps | undefined => {
  const data = fx;
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

    return {
      fx: data,
      step1: test.replace(/i/g, 'j'),
      step2: { u, v },
      step3: { dudx, dudy, dvdx, dvdy },
      step4: { primaryRule, secondaryRule },
      step5: `${dudx}+j*(${dvdx})`,
      step6: `${factorization(applyFormula(dudx, dvdx))}`,
      derivate: `${run(`d(${data}, z)`).toString()}`,
    };
  } catch (error) {
    console.log('error', error);
  }
};

export default ApplyCauchy;
