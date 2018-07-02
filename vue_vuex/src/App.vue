<template>
  <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
        <div class="form-inline mr-3">
          <select name="" id="" class="form-control" @change="changeStatus" v-model="status">
            <option value="線上">線上</option>
            <option value="線下">線下</option>
          </select>
        </div>
        <div class="navbar-text">Hi,{{ showUsername }}</div>
      </div>
    </nav>
    <router-view  @pushNewName="getNewName"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {status:this.$store.state.status,
            username:"",}
        },
  methods:{
    changeStatus(){
      this.$store.state.status = this.status
                  },
    
    getNewName (newName) {
      let vm = this
      vm.username = newName
                          }
          },
  computed:{
    showUsername(){
      return this.$store.state.username
    }
  }
}

</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap"

</style>
