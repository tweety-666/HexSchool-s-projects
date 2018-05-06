//先處理DOM
var btn = document.querySelector('.button');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
let liColor = document.getElementsByClassName("list li").style.border-left;


//監聽和更新
btn.addEventListener('click', BMI, false);
list.addEventListener('click', toggleBmi, false);
updateList(data);


//定義各種函式
//定義計算BMI函式
function BMI(e) {
    e.preventDefault();
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;
    var m = (height) / 100;
    var kg = weight;
    var BMI = (kg / (m * m)).toFixed(2);
    var status = "";
    var liColor ="";
    if (BMI == "NaN") {
        alert('請輸入正確的數值!');
        return;
    } else if (height == '') {
        alert("您尚未輸入身高！");
        return;
    } else if (weight == '') {
        alert("您尚未輸入體重！");
        return;}
    }


// 計算日期跟時間
var date = new Date();
var MM = (date.getMonth() + 1);  // 從0開始 +1
var DD = date.getDate();
var YY = date.getFullYear();
var hours = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var time = YY + '-' + MM + '-' + DD + ' ' + hours + ':' + min + ':' + sec;

//判斷BMI且改li狀態，以及改btn、liColor的顏色
if (BMI < 18.5) {
    status = '過輕';
    liColor = "#86D73F";
    btn.setAttribute("class", "blue");
} else if (18.5 <= BMI && BMI < 24) {
    status = '理想';
    liColor = '#31BAF9';
    btn.setAttribute("class", "green");
} else if (24 <= BMI && BMI < 27) {
    status = '過重';
    liColor = '#FF982D';
    btn.setAttribute("class", "orange1");
} else if (27 <= BMI && BMI < 30) {
    status = '輕度肥胖';
    liColor = '#FF6C03';
    btn.setAttribute("class", "orange2");
} else if (30 <= BMI && BMI < 35) {
    status = '中度肥胖';
    liColor = '#FF6C03';
    btn.setAttribute("class", "orange2");
} else if (BMI >= 35) {
    status = '重度肥胖';
    liColor = '#FF1200';
    btn.setAttribute("class", "red");
}

//在按鈕那改BMI狀態
document.querySelector('.value').textContent = BMI;
document.querySelector('.bmi').textContent = 'BMI';
document.querySelector('.button').textContent = '';

// 組合成物件
var bmiAll = {
    status: status,
    height: height,
    weight: kg,
    BMI: BMI,
    time: time,
};
// 將資料物件 存入array
data.push(bmiAll);
// 將資料更新  
updateList(data);
// 存到 localstage
localStorage.setItem('bmiData', JSON.stringify(data));


// 更新內容
function updateList(item) {
    var str = '';
    for (var i = 0; i < item.length; i++) {
        str += '<li><div class="status">' + item[i].status + '</div><div class="box"><div class="bmiName">BMI</div> <div class="value">' + item[i].BMI + '</div></div><div class="box"><div class="bmiName">weight</div><div class="value">' + item[i].weight + 'kg</div></div><div class="box"><div class="bmiName">height</div><div class="value">' + item[i].height + 'cm</div></div><div class="date">' + item[i].time + '</div><img src="https://github.com/Jimmywei01/Pratice/blob/master/img.jpg?raw=true" alt="" data-index=' + i + '></li>';
    }
    list.innerHTML = str;
}

// 刪除內容
function toggleBmi(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') { return };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    updateList(data);
    localStorage.setItem('bmiData', JSON.stringify(data));
}
