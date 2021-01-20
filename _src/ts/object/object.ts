const objectTest = () => {
  type Country = {
    lang: string
    name: string
    readonly firstName: string
    gender?: string
  }
  const country: Country = {
    lang: 'Japanese',
    name: 'Japan',
    firstName: 'J'
  }
  // console.log(country);
  const capitals: {
    [contryName: string]: string
  } = {
    japan: 'tokyo',
    korea: 'seoul'
  }
  capitals.china = 'beiging'
  // console.log(capitals);
}
export default objectTest