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
