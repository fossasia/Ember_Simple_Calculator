import Component from '@ember/component';

export default Component.extend({
    userInput: "0",
    result: "0",
    lastLength: 0,
    parse() {
        if (!this.goodBrackets()) return;
        let input = this.userInput;
        const last = (this.userInput.length > 1) ? this.userInput[this.userInput.length - 1] : null;
        if (last === '+' || last === '-' || last === '/' || last === '*') input = input.substring(0, input.length - 1);
        const answer = this.simplify(input);
        this.set('result', answer);
    },
    simplify(query) {
        if (query.indexOf('(') <= 0) return this.answer(query);
        let queryCopy = query;
        let sQuery = "";
        let opened = 0;
        for (let i = 0; i < query.length; i++) {
            const char = query[i];

            if (char === '(') {
                if (!opened) sQuery = "";
                opened++;
            }

            if (opened) sQuery += char;

            if (char === ')') {
                opened--;
                if (!opened) {
                    queryCopy = queryCopy.replace(sQuery, this.simplify(sQuery.substring(1, sQuery.length - 1)));
                }
            }
        }
        return this.answer(queryCopy);
    },
    answer(line) {
        const operations = [];
        for (let i = 0; i < line.length; i++) {
            const charL = 48;
            const charH = 57;
            const charDot = 46;
            const charCode = line.charCodeAt(i)
            if ((charCode >= charL && charCode <= charH) || charCode === charDot) continue;

            operations.push(line[i]);
            line = line.split('');
            line[i] = '|';
            line = line.join('');   
        }
        if (operations.length < 1) return Number(line);

        line = line.split('|');
        let answer = Number(line[0]);
        for (let i = 0; i < operations.length; i++) {
            answer = this.solveSimple(answer + operations[i] + line[i + 1]);
        }
        return answer;
    },
    solveSimple(query) {
        if (query.indexOf('+') >= 0) {
            const numbers = query.split('+');
            return Number(numbers[0]) + Number(numbers[1]);
        } else if (query.indexOf('-') >= 0) {
            const numbers = query.split('-');
            return Number(numbers[0]) - Number(numbers[1]);
        } else if (query.indexOf('*') >= 0) {
            const numbers = query.split('*');
            return Number(numbers[0]) * Number(numbers[1]);
        } else if (query.indexOf('/') >= 0) {
            const numbers = query.split('/');
            return Number(numbers[0]) / Number(numbers[1]);
        }
        return 0;
    },
    goodBrackets() {
        let open = 0;
        let close = 0;

        for (let i = 0; i < this.userInput.length; i++) {
            if (this.userInput[i] === '(') open++;
            else if (this.userInput[i] === ')') close++;
            if (close > open) return false;
        }

        return open === close;
    },
    validKey(event) {
        const key = event.keyCode || event.which;
        const ekey = event.key;
        return (key > 48 && key < 57 && !event.shiftKey) || (key >= 96 && key <= 105) || key === 48 || key === 57 || ekey === '+' || ekey === "-" || ekey === '/' || ekey === '*' || ekey === '.' || key === 8 || key === undefined;
    },
    actions: {
        inputQ(value, event) {
            if (!this.validKey(event) && this.lastLength !== this.userInput.length) {
                this.set('userInput', value.substring(0, this.lastLength));
                if (this.userInput.length < 1) this.set('userInput', "0");
                return;
            }
            if (!value) return void this.set('userInput', "0");
            if (value[0] === '0') this.set('userInput', value.substring(1, value.length));
            this.lastLength = this.userInput.length;
            this.parse();
        }
    }
});
