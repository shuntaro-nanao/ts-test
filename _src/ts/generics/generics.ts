const genericsTest = () => {
  const stringReduce = (array: string[], initialValue: string): string => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }
  // console.log(stringReduce(['a','b','c'], 'hoge'));
  const numberReduce = (array: number[], initialValue: number): number => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }
  // console.log(numberReduce([1, 2, 3], 1000));

  // type Reduce = {
  //   (array: string[], initialValue: string): string
  //   (array: number[], initialValue: number): number
  // }

  // ↓↓ Generics ↓↓

  type GenericReduce<T> = {
    (array: T[], initialValue: T): T
  }

  const genericStringReduce: GenericReduce<string> = (array, initialValue) => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }
  // console.log(stringReduce(['a','b','c'], 'hoge'));

  type Map<T, U> = (array: T[], fn: (item: T) => U) => U[]

  const mapStringsToNumbers: Map<string, number> = (array, fn) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      result[i] = fn(item)
    }
    return result
  }
  // console.log(mapStringsToNumbers(['1', '2'], (item) => Number(item)));
}
export default genericsTest