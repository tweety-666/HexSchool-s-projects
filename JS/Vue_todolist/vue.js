var app = new Vue({
    el:"#app",
    data:{
        todos:[],
        newTodo:"",
        show:0
    },
methods:{
    addTodo: function (todo) {
        this.todos.push({ content: todo, done: false })
    },
    removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    },
    allDone: function(){
        var len = this.todos.length;
        for (var i = 0; i < len; i++) {
            this.todos[i].done = true;
        }
    }
        }
});