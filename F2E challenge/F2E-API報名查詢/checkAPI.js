//DOM
var send = document.querySelector("#send");
var yourName = document.querySelector("#name");
console.log(yourName);

//監聽
send.addEventListener("click", signUp, true);
yourName.addEventListener("change", showName, true);

//函式
//讓使用者輸入姓名，姓名顯示到畫面上，呈現"嗨，OOO，報名成功了嗎?""
function showName() {
    var yourName = document.querySelector("#name");
    var nameValue = yourName.value
    document.querySelector(".username").textContent = nameValue + ",";
}

function showMeTotal() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://www.thef2e.com/api/signUpTotal", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(null);
    xhr.onload = () => {
        console.log(xhr);
        var str = "";
        var signUptotal = JSON.parse(xhr.responseText);
        console.log(signUptotal.total);
        str += signUptotal.total;
        document.querySelector(".showTotalStr").innerHTML = "目前有" + str + "位參賽者";
    }
}
showMeTotal();

function signUp() {
    var email = document.querySelector("#email").value;
    var account = {};
    account.email = email;

    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://www.thef2e.com/api/isSignUp", true);
    xhr.setRequestHeader("Content-type", "application/json");
    var accountStr = JSON.stringify(account);
    xhr.send(accountStr);
    xhr.onload = () => console.log(xhr);
    xhr.onload = () => {
        var callbackData = JSON.parse(xhr.responseText);
        if (callbackData.message == "報名成功！") {
            alert("報名成功！")
            var signupName = callbackData.nickName;
            var signupSkill = callbackData.skill;
            var signupTime = new Date(callbackData.timeStamp);
            var dateStr = signupTime.getFullYear() + "/" + (signupTime.getMonth() + 1) + "/" + signupTime.getDate() + "  " + signupTime.getHours() + ":" + signupTime.getMinutes() + ":" + signupTime.getSeconds();
            document.querySelector(".signupInfor").innerHTML = "你的報名資訊：";
            document.querySelector("#nickName").innerHTML = "你的報名名稱： " + signupName;
            document.querySelector("#skill").innerHTML = "你的報名項目： " + signupSkill;
            document.querySelector("#date").innerHTML = "你的報名時間： " + dateStr;

        } else if (callbackData.message == "此 Mail 尚未報名" && email != "") {
            alert("未報名成功！")
        } else {
            alert("email 參數未提供")
        }
    }
}
