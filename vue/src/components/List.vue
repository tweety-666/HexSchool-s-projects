<template>
  <div id="hello container-fluid mt-5">
    <div class="form-inline mr-1">
      <div class="mr-2">在線狀態:{{status}}</div>
        <input type="text"  class="form-control mr-1" v-model="username">
        <button class="btn btn-primary" @click="update">更新姓名</button>
    </div>
    <table class="table table-striped mt-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">User</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,i) in listData">
      <th scope="row">{{i+1}}</th>
      <td><img :src="item.picture.medium" width="50"></td>
      <td>{{ item.name.first }}{{ item.name.last }}</td>
      <td>{{ item.email }}</td>
      <td><button class="btn btn-outline-primary" @click="clickMe(item)">點我</button></td>
    </tr>
  </tbody>
</table>

  </div>
  
    
</template>

<script>
export default {
  props:['status'],
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      listData:[],
      username:""
      }
    },

    methods: {
      getData(){
        let vm = this
          vm.axios.get('https://randomuser.me/api/?results=50')
            .then(function (response) {
              // 成功回應
              console.log(response.data)
              vm.listData = response.data.results
            })
            .catch(function (error) {
              // 失敗回應
              console.log(error);
            });
                },
      update(){
        let vm = this
        vm.$emit('pushNewName', vm.username)
      },
      clickMe(item){

      }
    },

    mounted(){
      this.getData()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
