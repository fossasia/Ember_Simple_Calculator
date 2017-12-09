import Component from '@ember/component';

let query = ''
let result = ''

export default Component.extend({
  actions: {
    input(val) {
      if (val == "exec") {
        try {
          result = eval(query)
        } catch (err) {
          result = "Operation Error!"
        } finally {
          this.$("#result").text(result)
          query = result == "Operation Error!"? '': result
        }
        return
      }
      if (val == "C") {
        query = ''
        this.$("#result").text(query)
        return
      }
      if (val == "del") {
        query = query.toString().slice(0, -1)
        this.$("#result").text(query)
        return
      }
      query += val
      this.$("#result").text(query)
    }
  }
});
