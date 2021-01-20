const functionTest = () => {
  const voidFunction = (message: string): void => {
    console.log(message);
  }
  // console.log(voidFunction('message'));
  const throwFunction = (): never => {
    throw new Error('hoge');
  }
  const isUserSignedIn = (userID: string, usrname?: string): boolean => {
    if (userID !== '') {
      return true;
    }
    return false;
  }
}
export default functionTest