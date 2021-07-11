import Vue from "vue";
const hello = (name) => {
    return `hello ${name}`; 
};

console.info(hello('es2015'))

const Counter = {
    data() {
        return {
            counter: 0
        }
    },
    mounted() {
        setInterval(() => {
          this.counter++
        }, 1000)
    }
}

Vue.createApp(Counter).mount('#counter')