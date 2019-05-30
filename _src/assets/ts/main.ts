$(function(){

  const a: null = null;

  const message:string = 'hoge';
  if(message){
    console.log(message);
  }

  const arr = [ 10 , 20 , 30 ];
  for(let i in arr){
    console.log(arr[i]);
  }

  //引数に型を設定、()の隣は返り値の型
  function omikuji(age : number , name : string) : string {
    let unn : string = '';
    if(age >= 17){
      unn = '大吉';
    }else{
      unn = '凶';
    }
    return name + 'さんの運勢は' + unn + 'です。';
  }
  console.log(omikuji(0 , '木村'));

  //省略可能な引数には ? をつける
  function ageCount(age? : number) : number {
    let ageeeee : number = 0;
    if(!age){
      ageeeee = 1;
    }
    return ageeeee;
  }
  //空が通る
  console.log(ageCount());


  $('#change').addClass('hoge');

});