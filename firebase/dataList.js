var data = {
    "father": {
        "title": "father",
        "age": 44,
        "weight": 88,
        "height": 178
    },
    "mom": {
        "title": "mom",
        "age": 42,
        "weight": 66,
        "height": 166
    },
    "son": {
        "title": "son",
        "age": 13,
        "weight": 40,
        "height": 133
    },
    "daughter": {
        "title": "daughter",
        "age": 8,
        "weight": 35,
        "height": 110
    }
}


//資料寫入firebase
var datalist = firebase.database().ref("data");
datalist.set(data);

//DOM
var select = document.getElementById("select");
var list = document.getElementById("list");
var rev = document.getElementById("reverse");

//選單改變，根據改變來排序data
select.addEventListener('change', function (e) {
    // console.log(e.target.value);
    if (e.target.value !== '') {
        if (e.target.value == 'weight') {
            select.orderByChild('weight').once('value', function (snapsnapshot) {
                let weightshot = snapshot.val();
                // console.log(weightsnapshotsnapshot);
                let str = '';
                snapshot.forEach(function (item) {
                    itemValue = item.val()
                    str += `<li>${item.key}:${itemValue.weight}</li>`;
                    console.log(str);
                    list.innerHTML = str;
                });
            });
        } else if (e.target.value == 'age') {
            select.orderByChild('age').once('value', function (snapshot) {
                let agesnapshot = snapshot.val();
                // console.log(agesnapshot);
                let str = '';
                snapshot.forEach(function (item) {
                    itemValue = item.val();
                    str += `<li>${item.key}:${itemValue.age}</li>`;
                    console.log(str);
                    list.innerHTML = str;
                });
            });
        } else if (e.target.value == 'height') {
            select.orderByChild('height').once('value', function (snapshot) {
                let heightsnapshot = snapshot.val();
                // console.log(heightsnapshot);
                let str = '';
                snapshot.forEach(function (item) {
                    itemValue = item.val();
                    str += `<li>${item.key}:${itemValue.height}</li>`;
                    console.log(str);
                    list.innerHTML = str;
                });
            });
        }
    } else {
        list.innerHTML = `
                <li>father</li>
                <li>mother</li>
                <li>son</li>
                <li>daugher</li>
            `;
    }
});

//點擊反轉順序，把已選資料反轉
rev.addEventListener("click",function () {
   if (select.value == "age") {
       order.orderByChild('age').reverse().once('value', function (snapshot) {
           let heightsnapshot = snapshot.val();
           // console.log(heightsnapshot);
           let str = '';
           snapshot.forEach(function (item) {
               itemValue = item.val();
               str += `<li>${item.key}:${itemValue.height}</li>`;
               console.log(str);
               list.innerHTML = str;
           });
       });
    
   }

   else if (select.value == "weight"){
       order.orderByChild('weight').reverse().once('value', function (snapshot) {
           let heightsnapshot = snapshot.val();
           // console.log(heightsnapshot);
           let str = '';
           snapshot.forEach(function (item) {
               itemValue = item.val();
               str += `<li>${item.key}:${itemValue.height}</li>`;
               console.log(str);
               list.innerHTML = str;
           });
       });
   }

   else if (select.value == "height") {
       order.orderByChild('height').reverse().once('value', function (snapshot) {
           let heightsnapshot = snapshot.val();
           // console.log(heightsnapshot);
           let str = '';
           snapshot.forEach(function (item) {
               itemValue = item.val();
               str += `<li>${item.key}:${itemValue.height}</li>`;
               console.log(str);
               list.innerHTML = str;
           });
       });
   }
   else{
       list.innerHTML = `
                <li>father</li>
                <li>mother</li>
                <li>son</li>
                <li>daugher</li>
            `;

   }
});