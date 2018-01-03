import Component from '@ember/component';

export default Component.extend({
    actions: {
        inputData(value) {
            const old = $('#userInput').val();
            let newValue = "";
            if (value === '=') return;
            if (value === 'clear') newValue = "0";
            else if (value === 'Del') newValue = old.substring(0, old.length - 1);
            else newValue = old + value;
            $('#userInput').val(newValue);
            $('#userInput').keyup().focus();
        }
    }
});
