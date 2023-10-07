// 設立區域變數(cityData)的陣列數據
// name:城市名稱，lat:緯度，lon:經度
let cityData = [
    { name: "", lat: "", lon: "" },
    { name: "台北", lat: 25.0856513, lon: 121.421409 },
    { name: "台中", lat: 24.1852333, lon: 120.4946381 },
    { name: "高雄", lat: 22.7000444, lon: 120.0508691 },
];

// 設立區域變數(weatherAPI_URL):openweathermap網站
let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
// 設立區域變數(weatherMapAPIKey):openweathermap網站上申請到的APIKey值
let weatherMapAPIKey = "7a0c02d777e4815f2f511977daa18a5c";

// 設立區域變數(params)
let params = {
    // app id ：weatherMapAPIKey值
    appid: weatherMapAPIKey,
    // 單位：公制
    // = 溫度(攝氏)
    units: 'metric',
    // 語言：繁體中文
    lang: 'zh_tw'
};

// $(function() {....}) = $(document).ready(function() {....}):靜態網頁(DOM)加載完後再執行
$(function () {
    // (設立 x = 0, )
    for (let x = 0; x < cityData.length; x++) {
        // console.log(cityData[x]);
        // 加上所選的cityData陣列中的城市名稱在id=citySelect的下拉式選單中
        $("#citySelect").append(`<option value='${x}'>${cityData[x].name}</option>`);
    }
    // 在id=citySelect的下拉式選單中更換選項時，執行function loadServerData()
    $("#citySelect").on("change", loadServerData);
    // 在id=CurrentLocationBtn的button按下時，執行function loadServerData()
    $("#CurrentLocationBtn").on("click",loadServerData);
});

function loadServerData(){
    // console.log(this.id);
    // debugger;
    // 將 id="result"的div中的內容全部清除
    $("#result").empty();
    // if ()
    if (this.id == "CurrentLocationBtn"){
        $("#citySelect").val(0);
        if (navigator.geolocation == undefined) {
            alert("Fail to get location");
            return;
        }
        let settings = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(result, error, settings);

    }else{
        if (this.value == 0) return;
        console.log("choose city");
        params.lat = cityData[this.value].lat;
        params.lon = cityData[this.value].lon;
        getLocation(weatherAPI_URL, params);
        
    }
}

function result(position) {
    let thisCoords = position.coords;
    params.lat = thisCoords.latitude;
    params.lon = thisCoords.longitude;
    // console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
    getLocation(weatherAPI_URL, params);
}

function error(err) {
    alert(err);
}

function getLocation(weatherAPI_URL, params){
    $.getJSON(weatherAPI_URL, params)
        .done(function (data) {
            $("#result")
                .append(`<p>氣溫 : ${data.main.temp_min} ~ ${data.main.temp_max}</p>`);
            let imgAndDesc = '<p>';
            imgAndDesc += `${data.name}<br>`;
            imgAndDesc += `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`;
            imgAndDesc += `${data.weather[0].description}`;
            imgAndDesc += '</p>';
            $("#result")
                .append(imgAndDesc);
        })
        .fail(function () { console.log("Error"); })
        .always(function () { console.log("Always"); });
}