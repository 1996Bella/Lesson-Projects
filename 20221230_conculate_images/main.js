function asyncProcess(imageID, imageURL) {
    // resolve：成功(回傳原始圖檔值)
    // reject：失敗
    return new Promise((resolve, reject) => {
        $(imageID).attr('src', imageURL);
        $(imageID).on('load', function () {
            // 拿到當下的圖丟回去
            resolve($(this)[0].naturalWidth);
        });
    });
}

$(function () {
    $("button").on("click", go);
});

function go() {
    //.all：三張圖開始執行[function(asyncProcess)] 
    Promise.all([
        asyncProcess("#image1", "https://punchline.asia/wp-content/uploads/2017/09/it-movie-poster-1.jpg"),
        asyncProcess("#image2", "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c618cd88432989.5dd5e72e505d1.jpg"),
        asyncProcess("#image3", "https://www.u-buy.com.tw/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFIQk9PN3RZNUwuX0FDX1NMMTUwMF8uanBn.jpg")
    ])
    // .then：結束執行後，三張圖個別進行function(response) 
        .then(
            response => {
                var totalWidth = 0;
                for (var x = 0; x < response.length; x++) {
                    $("span").append(response[x]);
                    totalWidth += response[x];
                    // 如果還不是最後一張圖，加上<span>+上去
                    if (x < response.length - 1) {
                        $("span").append(" + ");
                    // 如果是最後一張圖，計算圖的寬度
                    } else {
                        $("span").append(" = " + totalWidth);
                    }
                }
            }, error => {
                console.log(`Error:${error}`);
            }
        );
}