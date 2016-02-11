$('document').ready(function(){
  var total, operator, arg1, arg2;
  var temp = ""; //stores current input field value

  $('.digit, .operator').on('click',function(){
    var value = $(this).attr('value');

    //IF ENTRY IS A NUMBER >> add digit to temp and display
    
    if(!isNaN(value) || value == "."){
      temp += value;
      $('.displayField').text(formatNum(temp));
      console.log('temp is now: ' + temp);
      
    //IF ENTRY IS AN OPERATOR other then =
      
    }else if (value !== 'result'){

      // if arg1 has not been set >> assign temp to arg1 and the value to operator

      if (arg1 === undefined){
        arg1 = parseFloat(temp);
        operator = value;
        temp = "";
        console.log('assigned '+ arg1 +' to arg1 and '+ operator+' to operator');

      // Got arg1, and operator >> assign temp to arg2, then perform calculation (using the old operator value), then update the value of the operator   
      
      } else if (arg2 === undefined && operator !== undefined){
        arg2 = parseFloat(temp);

        switch(operator){
          case "plus":
            total = arg1 + arg2;
            break;
          case "minus":
            total = arg1 - arg2;
            break;
          case "multi":
            total = arg1 * arg2;
            break;
          case "divide":
            total = arg1 / arg2;
            break;
          case "percent":
            total = arg1 * arg2 / 100;
            break;
        } //switch

        $('.displayField').text(formatNum(total));
        console.log('performed: '+ arg1 + operator + arg2);
        console.log('new operator is: '+ value);

        operator = value;
        temp = "";
        arg1 = total;
        arg2 = undefined;
        console.log('running total is: ' + arg1);

      // Got arg1, but no arg2 and no operator (like after the equal button is pressed) >> set operator
      } else if (arg2 === undefined && operator === undefined){
        operator = value;
        console.log('operator is now: ' + operator);
      }
      

    //IF ENTRY IS = >> calculate total (only if both arg1 and the operator are set);
      
    }else if(arg1 !== undefined && operator!== undefined ){
      arg2 = parseFloat(temp);

      switch(operator){
        case "plus":
          total = arg1 + arg2;
          break;
        case "minus":
          total = arg1 - arg2;
          break;
        case "multi":
          total = arg1 * arg2;
          break;
        case "divide":
          total = arg1 / arg2;
          break;
      } //switch statement

      $('.displayField').text(formatNum(total));
      console.log('performed: '+ arg1 + operator + arg2);

      arg1 = total;
      arg2 = undefined;
      operator = undefined;
      temp = "";
    } //else if

  });//calculator functions

  $('.clearAll').on('click', function(){
     arg1 = undefined;
     arg2 = undefined;
     temp = '';
     total = undefined;
     operator = undefined;
     $('.displayField').text('0');   
   });
    
     $ ('.clearInput').on('click', function(){
     temp = '';
     $('.displayField').text(temp);   
   });
}); //$('document').ready

// Format number x,xxx,xxx
function formatNum (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}