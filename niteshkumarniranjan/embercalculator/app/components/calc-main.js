import Component from '@ember/component';

var operators = ['+', '-', '×', '÷'];

export default Component.extend({
  actions : {

    ins(event) {
      let value = this.get('value') || "";   
      this.set("value", value + event)
    },

    equal(){
      var equation = this.get('value');
      var lastChar = equation[equation.length - 1];
      equation = equation.replace(/×/g, '*').replace(/÷/g, '/');
      if(operators.indexOf(lastChar ) > -1 || (lastChar == '.')) {
        equation = equation.replace(/.$/,'');
      }
      if(equation) {
        this.set('value', eval(equation));
      }
    },

    clear(){
      this.set('value', '');
    },

    del() {
      let value = this.get('value') || '';   
      this.set('value', value.substring(0, value.length - 1));
    }

  }

});
