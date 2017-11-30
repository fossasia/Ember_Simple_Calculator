App = Ember.Application.create();

App.IndexController = Ember.Controller.extend({
	needs : ["button", "display"],
	firstOperand : undefined,
	operator : undefined,
	secondOperand : undefined,
	total : undefined,
	clearData : function(){
		this.resetValues();
		this.get('controllers.display').send('clearDisplayData');
	},
	buttonClicked : function(data) {
		this.get('controllers.display').send('setDataToDisplay',data.value);
	},
	specialButtonClicked : function(data){
		var display = this.get('controllers.display');
		var textValue = display.get('currentDisplayValue');
		display.send('clearDisplayData');
		
		var operator = data.value;
		
		if(textValue === "" || textValue === null || typeof(textValue) === "undefined"){
			//Do nothing
		}else if(typeof(this.get('firstOperand')) === "undefined"){
			this.set('firstOperand', parseFloat(textValue));
			this.set('operator', operator);
		}else if(typeof(this.get('firstOperand')) !== "undefined" && typeof(this.get('operator')) !== "undefined"){
			this.set('secondOperand', parseFloat(textValue));
			
			var total = this.calculate(this.get('firstOperand'), this.get('operator'), this.get('secondOperand'));
			this.set('total', total);
			display.send('setDataToDisplay',this.get('total'));
			this.resetValues();
			
			if(operator === "+" || operator === "-" || operator === "/" || operator === "X"){
				this.set('firstOperand', total);
				this.set('operator', operator);
				display.send('clearDisplayData');
			}
		}
	},
	calculate : function(firstOperand, operator, secondOperand){
		if(operator === "+"){
			return firstOperand + secondOperand;
		}else if(operator === "-"){
			return firstOperand - secondOperand;
		}else if(operator === "/"){
			return firstOperand / secondOperand;
		}else if(operator === "X"){
			return firstOperand * secondOperand;
		}
	},
	resetValues : function(){
		this.set('firstOperand', undefined);
		this.set('operator', undefined);
		this.set('secondOperand', undefined);
		this.set('total', undefined);
	}
});

App.ButtonController = Ember.Controller.extend({
	init: function() {
	    this._super();
	    this.set("model", App.buttonModel);
	},
//	currentValue : {},
	actions : {
		click : function(data) {
			//this.get('target').send('buttonClicked',data); //Not working
			var controller = App.__container__.lookup("controller:index");
			var buttonType = data.type;
			if (buttonType === "clear") {
				controller.send('clearData',data);
			} else {
				if (buttonType === "number" || (buttonType === "special" && data.value === ".")) {
					controller.send('buttonClicked',data);
				} else if (buttonType === "special") {
					controller.send('specialButtonClicked',data);
				}
			}
//			this.set("currentValue", data);
		}
	}
});

App.ButtonView = Ember.View.extend({
	init: function() {
	    this._super();
	    this.set("controller", App.ButtonController.create());
	},
	templateName : 'button',
	attributeBindings: ['data-actualValue', 'data-type'],
	click : function(e) {
		var ele = $(e.target);
		this.get('controller').send('click', {
			value : ele.data("actualvalue"),
			type : ele.data("type")
		});
	}
});

App.buttonModel = Ember.Object.create({
	data : {
		buttons : [ {
			type : "number",
			actualValue : 7,
			displayValue : "7"
		}, {
			type : "number",
			actualValue : 8,
			displayValue : "8"
		}, {
			type : "number",
			actualValue : 9,
			displayValue : "9"
		}, {
			type : "special",
			actualValue : "/",
			displayValue : "/"
		}, {
			type : "number",
			actualValue : 4,
			displayValue : "4"
		}, {
			type : "number",
			actualValue : 5,
			displayValue : "5"
		}, {
			type : "number",
			actualValue : 6,
			displayValue : "6"
		}, {
			type : "special",
			actualValue : "X",
			displayValue : "X"
		}, {
			type : "number",
			actualValue : 1,
			displayValue : "1"
		}, {
			type : "number",
			actualValue : 2,
			displayValue : "2"
		}, {
			type : "number",
			actualValue : 3,
			displayValue : "3"
		}, {
			type : "special",
			actualValue : "-",
			displayValue : "-"
		}, {
			type : "special",
			actualValue : ".",
			displayValue : "."
		}, {
			type : "number",
			actualValue : 0,
			displayValue : "0"
		}, {
			type : "special",
			actualValue : "=",
			displayValue : "="
		}, {
			type : "special",
			actualValue : "+",
			displayValue : "+"
		} ]
	}
});

App.displayModel = Ember.Object.create({
    data : {
    	type : "LCD"
    }
});

App.DisplayController = Ember.Controller.extend(Ember.Evented, {
	init: function() {
	    this._super();
	    this.set("model", App.displayModel);
	},
	currentDisplayValue : "",
	setDataToDisplay : function(value){
		this.trigger("setDisplayData",value);
	},
	clearDisplayData : function(){
		this.trigger("clearDisplayData");
	}
});

App.DisplayView = Ember.View.extend({
	templateName : 'display',
	didInsertElement: function () {
		var controller = App.__container__.lookup("controller:display");
		controller.on('setDisplayData', $.proxy(this.setDisplayData, this));
		controller.on('clearDisplayData', $.proxy(this.clearDisplayData, this));
	},
	clearDisplayData : function(){
		this.$().find('input').val("");
	},
	setDisplayData : function(value){
		var element = this.$().find('input');
		var currentValue = element.val();
		var newValue = currentValue + "" + value;
		element.val(newValue);
		var controller = App.__container__.lookup("controller:display");
		controller.set("currentDisplayValue", newValue);
	}
});

