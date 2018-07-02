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

<<<<<<< HEAD
=======

>>>>>>> 3ef535d5af0905662d70ae3998fd92a582f4d147
//資料寫入firebase
var datalist = firebase.database().ref("data");
datalist.set(data);

//DOM
var select = document.getElementById("select");
var list = document.getElementById("list");
var rev = document.getElementById("reverse");

//選單改變，根據改變來排序data
select.addEventListener('change', function (e) {
<<<<<<< HEAD
    if (e.target.value !== '') {
        let sel = select.value;
        datalist.orderByChild(sel).once('value', function (snapshot) {
            let str = '';
            snapshot.forEach(function (item) {
                let itemValue = item.val()
                console.log(itemValue);
                switch (e.target.value) {
                    case 'weight':
                        content = `${itemValue.weight} kg`;
                        break;
                    case 'age':
                        content = `${itemValue.age} years old`;
                        break;
                    case 'height':
                        content = `${itemValue.height} cm`;
                        break;
                }
                str += `<li>${item.key}:${content}</li>`;
                console.log(str);
                list.innerHTML = str;
            });
        });
=======
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
>>>>>>> 3ef535d5af0905662d70ae3998fd92a582f4d147
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
<<<<<<< HEAD
rev.addEventListener("click", function () {
    if (select.value == "weight") {

        datalist.orderByChild("weight").on("value", function (snapshot) {
            var str = '';
            var revData = [];
            snapshot.forEach(function (item) {
                revData.push(item.val());
                console.log(revData);
            })
            revData.reverse();
            for (var item in revData) {
                str += '<li>' + revData[item].title + ":" + revData[item].weight + '</li>';
            }
            list.innerHTML = str;
        })

    } else if (select.value == "height") {
        datalist.orderByChild("height").on("value", function (snapshot) {
            var str = '';
            var revData = [];
            snapshot.forEach(function (item) {
                revData.push(item.val());
                console.log(revData);
            })
            revData.reverse();
            for (var item in revData) {
                str += '<li>' + revData[item].title + ":" + revData[item].height + '</li>';
            }
            list.innerHTML = str;
        })
    } else if (select.value == "age") {
        datalist.orderByChild("age").on("value", function (snapshot) {
            var str = '';
            var revData = [];
            snapshot.forEach(function (item) {
                revData.push(item.val());
                console.log(revData);
            })
            revData.reverse();
            for (var item in revData) {
                str += '<li>' + revData[item].title + ":" + revData[item].age + '</li>';
            }
            list.innerHTML = str;
        })
    } else { return; }
}

);
=======
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
>>>>>>> 3ef535d5af0905662d70ae3998fd92a582f4d147
