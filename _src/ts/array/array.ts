const arrayTest = () => {
  const colors: string[] = [
    'red',
    'blue'
  ];

  const sizes: Array<string> = [
    's',
    'm'
  ];

  const ids: (string | number)[] = [
    'a',
    1
  ];

  const vegetableses: readonly string[] = [
    'cabbage'
  ];
  // error!!
  // vegetableses.push('carrot')

  const meats: ReadonlyArray<string> = [
    'chicken'
  ];
  // error!!
  // meats.push('beef')

};
export default arrayTest