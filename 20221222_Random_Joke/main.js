// 另外新加上的3顆按鈕打上各自的日期(id)
let thisButton = document.getElementsByTagName("button")[0];
let this20221201 = document.getElementsById("2022/12/01");
let this20230101 = document.getElementsById("2023/01/01");
let this20230122 = document.getElementsById("2023/01/22");
let showData = document.getElementById("showData");

thisButton.addEventListener("click", loadServerData);
Button20221201.addEventListener("click", loadServerData);
Button20230101.addEventListener("click", loadServerData);
Button20230122.addEventListener("click", loadServerData);

// 寫loadServerData的function
function loadServerData(){
    // debugger;
    console.log("Load Server Data!");
    // 設定xmlHttpRequest是否可以執行
    let xmlHttpRequest;
    if(window.XMLHttpRequest){
        xmlHttpRequest = new XMLHttpRequest();
    }else{
        alert("No XMLHttpRequest!!");
        return;
    }
    
    // 設定顯示日期的笑話
    let thisMoment;
    if (this.id == ""){
        // 如果id ==""(今天)的話，顯示今天日期的笑話
        thisMoment = new Date();
    }else{
        // 否則不是id ==""(某一天)的話，顯示那一天日期的笑話
        thisMoment = new Date(this.id);
    }
    let thisYear = thisMoment.getFullYear();
    let thisMonth = thisMoment.getMonth() + 1 < 10 ? "0" + (thisMoment.getMonth() + 1) : thisMoment.getMonth() + 1;
    let thisDay = thisMoment.getDate() < 10 ? "0" + thisMoment.getDate() : thisMoment.getDate();
    // debugger;
    // 年、月、日要轉成string；如果都是數字，則會得到總和
    let thisDate = thisYear.toString() + thisMonth.toString() + thisDay.toString();

    //settings for XMLHttpRequest object
    xmlHttpRequest.open("GET",thisDate+".txt", true);
    xmlHttpRequest.send();

    xmlHttpRequest.onreadystatechange = function(){
        console.log("readyState : ", xmlHttpRequest.readyState);
        console.log("status : ", xmlHttpRequest.status);
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            showData.innerHTML = "";
            showData.innerHTML = 
            "<pre>"+xmlHttpRequest.responseText+"</pre>";
            // thisButton.style.visibility = "hidden";
        }
    };

}

$(function(){
    $("#randomBtn").on("click",loadRandomJoke);
});

function loadRandomJoke(){
    $.getJSON("https://api.chucknorris.io/jokes/random")
    .done(function(data){
        // data=https://api.chucknorris.io/jokes/random
        console.log("Success");
        console.log(data.value);
        $("#showData").empty();
        // $("#showData").html(`<pre>${data.value}</pre>`);
        $("#showData").text(data.value);
    })
    .fail(function(err){
        // debugger;
        console.log("Status Code : ",err.status);
    })
    .always(function(){
        console.log("Complete!");
    })
}
console.log(hello);