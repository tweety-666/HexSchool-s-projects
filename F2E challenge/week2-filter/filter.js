//$('#section2 p.headColor').html('幾筆結果')
var categoryArray = new Array();
var place = "";
var search = "";
var categoryMap = new Map();
var dataArray = [];//搜尋結果的資料陣列
var num = 10;//一頁幾筆資料

function loadJsonTOption(url, selector, option) {
    $.getJSON(
        url,
        function (data) {
            $.each(data, function (i, item) {
                selector.append("<option value='" + item.value + "'>" + item.text + "</option>");
                categoryMap.set(item.value, item.text);
            });
            selector.fastselect({
                onItemSelect: function (i, item) {
                    if (option == "single") {
                        place = item.value;
                    } else {
                        categoryArray.push(item.value);
                    }
                }
            });
        }
    );
}
$(document).on('click', '.fstChoiceRemove', function (event) {
    var value = $(this).parent().attr("data-value");
    var index = categoryArray.indexOf(value);
    categoryArray.splice(index, 1);
});
//超過的多行文字以...取代
function overFlowText(description, len, selector) {
    if (description.length > len) {// 超過50個字以"..."取代
        selector.after("<input type='hidden' value='" + selector.text() + "'>");
        var text = `${description.substring(0, len - 1)}
      <button style='color:black;padding:0;' title='詳細內容'>.....</button>
      <input type='hidden' value='${description}'>`;
        return text;
    } else {
        return description;
    }
}
$(document).on('click', '.content p button', function (event) {
    $(this).parent().parent().css("overflow", "auto");
    $(this).parent().html($(this).next().val());
});
$(document).on('click', '.content .detailInfo button', function (event) {
    $(this).parent().parent().parent().css("overflow", "auto");
    $(this).parent().html($(this).next().val());
});
function creatTag(data) {
    if (data != null && data != undefined && data != "") {
        var width = (categoryMap.get(data).length + 2).toString() + "em";
        var css = "width:" + width;
        return `<div class='tag' style=${css}>${categoryMap.get(data)}</div>`;
    } else {
        return "";
    }
}
function isFree(data) {
    if (data != null && data != undefined && data != "") {
        return `(${data})`;
    } else {
        return "";
    }
}
function loadArticleTemp(item) {
    var temp =
        `<article>
      <div class="imgDiv" style="background-image:url(${item.Picture1});"></div>
      <div class="content">
        <h2 style="margin:12px 0px;" class="headColor">${item.Name}</h2>
        <p style="text-indent:2em;margin:0;">${overFlowText(item.Description, 49, $(".content p"))}</p>
        <h4 style="margin:8px 0px;">
          <i class="fa fa-map-marker fa-lg"></i>${item.Zone}
          ${creatTag(item.Class1)}${creatTag(item.Class2)}
        </h4>
        <div class="detailInfo"><i class="fa fa-phone fa-lg"></i>${item.Tel}</div>      
        <div class="detailInfo"><i class="fa fa-home fa-lg"></i>${overFlowText(item.Add, 25, $(".detailInfo").eq(1))}</div>
        <div class="detailInfo"><i class="fa fa-calendar fa-lg"></i>  <span>${overFlowText(item.Opentime + isFree(item.Ticketinfo), 28, $(".detailInfo").eq(2))}</span></div>
      </div>
    </article>`;
    return temp;
}
$(document).on('click', 'button[name="plus"]', function (event) {
    $(this).attr("name", "minus");
    $(this).parent().next().hide();
    $(this).parent().parent().css("padding-bottom", 0);
    $(this).find('i').removeClass('fa-plus').addClass('fa-minus');
});
$(document).on('click', 'button[name="minus"]', function (event) {
    $(this).attr("name", "plus");
    $(this).parent().next().show();
    $(this).parent().parent().css("padding-bottom", 20);
    $(this).find('i').removeClass('fa-minus').addClass('fa-plus');
});
$(document).on('click', 'button[name="pageBtn"]', function (event) {
    var page = $(this).val();
    getPageData(page);
});
$(document).on('click', '#pageStart', function (event) {
    var page = $('.pageChange').val();
    getPageData(Number(page) - 1);
});
$(document).on('click', '#pageEnd', function (event) {
    var page = $('.pageChange').val();
    getPageData(Number(page) + 1);
});
function getPageData(pageNum) {//取得第幾頁的資料
    if (pageNum > 0 && pageNum < $('button[name="pageBtn"]').length + 1) {
        $('button[name="pageBtn"]').removeClass("pageChange");
        $('button[name="pageBtn"]').eq(pageNum - 1).addClass("pageChange");
        $("#results").html("");
        for (var step = pageNum * num - num; step < pageNum * num; step++) {
            $("#results").append(loadArticleTemp(dataArray[step]));
        }
    }
}
function creatPage(array) {//產生分頁
    $('.pageArea div').html("");
    var totalPages = Math.ceil(array.length / num);//共幾頁
    for (var step = 1; step < totalPages + 1; step++) {
        var button = `<button name="pageBtn" class="pageBtn subtitle" value=${step}>${step}</button>`;
        $('.pageArea div').append(button);
    }
    $('.pageArea div').append('<button id="pageEnd" class="pageBtn subtitle"> <i class="fa fa-angle-double-right" style="padding-left:8px;"></i></button>');
    getPageData(1);//初始狀態為第一頁
}
function getApiResponse(text) {
    var limit = num; //10
    var q = text;
    var url = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97'
        //  +"&limit="+limit
        + "&q=" + q;
    // var url='https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&q=大樹區'
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            $("#section2").html("");
            console.log('Total results found: ' + data.result.records.length);
            if (data.result.records.length == 0) {
                var result = `<div class="title">Showing <p class="headColor">0</p> results</div>`;
                //導回首頁(查全部資料)
                $('#homeBtn').click();
                alert("No results !");
            } else {
                dataArray = data.result.records;
                var result = `<div class="title">Showing <p class="headColor">${data.result.records.length}</p> results</div>
<div id="results"></div>`;
                $("#section2").append(result);
                creatPage(data.result.records);//產生分頁
                // $.each(data.result.records, function(i,item){
                //   $("#results").append(loadArticleTemp(item));
                // });
            }
        }
    });
}
function getFilterVal() {
    var text = "";
    search = $(".search input").val();
    $.each(categoryArray, function (i, item) {
        text += item + ",";
    });
    if (place != "") {
        text += place + ",";
    }
    if (search != "") {
        text += search + ",";
    }
    text = text.substring(0, text.length - 1);
    console.log(text);
    return text;
}
$('#fastSearchBtn').click(function (event) {
    text = getFilterVal();
    getApiResponse(text);
});
$('#searchBtn').click(function (event) {
    text = getFilterVal();
    getApiResponse(text);
});
function clearData() {
    $('.fstToggleBtn').text("Choose option");
    $('.fstResultItem').removeClass("fstSelected");
    $('.fstChoiceRemove').click();
    $('.multipleSelect').fastselect();
    $('.search input').val("");
    $('#fromDate input').val("");
    $('#toDate input').val("");
    categoryArray.length = 0;
    place = "";
    search = "";
    dataArray.length = 0;
}
$('#homeBtn').click(function (event) {//查全部資料
    clearData();
    getApiResponse("");
});
//按enter後查詢
$(".search input").bind("keypress", {}, keypressInBox);
function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode 
        e.preventDefault();
        $('#fastSearchBtn').click();
    }
}
$(function () {
    loadJsonTOption("https://codepen.io/peian/pen/qKmBGm.js", $(".multipleSelect"), "multiple");
    loadJsonTOption("https://codepen.io/peian/pen/LryYaL.js", $(".singleSelect"), "single");
    getApiResponse("");//查全部資料
});