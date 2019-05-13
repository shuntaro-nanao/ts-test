$(function(){

  const message:string = 'hoge';
  if(message){
    console.log(message);
  }

  const arr = [ 10 , 20 , 30 ];
  for(let i in arr){
    console.log(arr[i]);
  }


  $('#change').addClass('hoge');

});