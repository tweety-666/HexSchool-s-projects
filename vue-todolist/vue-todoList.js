const app = new Vue({
    el: '#app',
    data: {
        todos: [],
        newTodo: '',
        visibility: 'all',
        cacheTodo: {},
        cacheTitle: '',
        count: 0,
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let timestamp = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.push({
                id: timestamp,
                title: value,
                completed: false
            });
            this.newTodo = '';
        },

        removeTodo: function (key) {
            this.todos.splice(key, 1)
        },

        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },

        cancelEdit: function () {
            this.cacheTodo = {}
        },

        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        },

        clearAll: function () {
            this.todos = [];
        }
    },
    computed: {
        filteredTodos: function () {
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'active') {
                let newTodos = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            } else if (this.visibility == 'completed') {
                let newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            }
            return [];
        },
        countUndone: function () {
            let cnt = 0;
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    cnt++;
                    console.log(cnt);
                }
            })
            return this.count = cnt;
        },
    },

})