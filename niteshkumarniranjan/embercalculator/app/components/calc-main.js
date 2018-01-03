import Component from '@ember/component';

var operators = ['+', '-', '×', '÷'];

export default Component.extend({
  actions : {

    // insert text (event) to screen
    ins(event) {
      let value = this.get('value') || "";   
      this.set("value", value + event)
    },

    // equal button clicked
    equal(){
      // get eqaution from screen
      var equation = this.get('value');
      var lastChar = equation[equation.length - 1];
      equation = equation.replace(/×/g, '*').replace(/÷/g, '/');
      // if last character is a opertator
      if(operators.indexOf(lastChar ) > -1 || (lastChar == '.')) {
        equation = equation.replace(/.$/,'');
      }
      if(equation) {
        // evaluate the eqation
        this.set('value', eval(equation));
      }
    },

    // clear text screen
    clear(){
      this.set('value', '');
    },

    // delete last character form screen
    del() {
      let value = this.get('value') || '';   
      this.set('value', value.substring(0, value.length - 1));
    }

  }

});
