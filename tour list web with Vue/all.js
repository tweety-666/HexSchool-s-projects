var app = new Vue({
    el:"#app",
    data:{
        data:[],
        currentPage:0,//現在所在的頁數
        totalPages:0, //總共有幾頁
        locations:[],
        currentArea:''
    },
    methods:{
        getCertainAreaData(){
            const locations=new Set() //不重複內容用Set
            const vm = this
            vm.data.forEach((item,i)=>{
                locations.add(item.Zone)
            })
            vm.locations=Array.from(locations)//Set to Array
        },
        previousPage(){
            const vm = this
            if(vm.currentPage>0){
                vm.currentPage-=1
            }
            else{
                vm.currentPage=0
            }
        },
        nextPage(){
            const vm = this
            if(vm.currentPage<vm.totalPages-1){
                vm.currentPage+=1
            }
            else{
                vm.currentPage=vm.totalPages-1
            }
        }
    },
    computed:{
        filterData(){
            //有幾頁? 
            //每頁有幾個資料內容? 一頁10筆資料
            //newData=[ [第1頁好幾筆] , [第2頁好幾筆]....]
            const vm =this
            //先過濾地區
            let items=[]
            console.log(vm.currentArea)
            if(vm.currentArea !== ""){
                items=vm.data.filter((item,i)=>{
                    return item.Zone == vm.currentArea
                })
            }else{
                items=vm.data
            }
            //處理分頁
            const pageShowNum =10
            const newData=[]
            items.forEach((item,i) => {
                if(i%pageShowNum===0){
                    newData.push([])
                }
                const page = parseInt(i/pageShowNum)
                newData[page].push(item)
            });
            vm.totalPages = ( items.length)/pageShowNum
            return newData
        }
    },
    created() {
        const vm = this
        axios.get('data.json')
        .then(function (response) {
            // handle success
            vm.data = response.data.data.result.records
            // console.log(response);
            console.log(vm.data);
            vm.getCertainAreaData()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    },
})