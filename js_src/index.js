import Vue from "vue";

const hello = (name) => {
    return `hello ${name}`; 
};

console.info(hello('es2015'))

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
