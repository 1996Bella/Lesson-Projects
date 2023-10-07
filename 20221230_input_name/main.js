$(function(){
    $("button").on("click",go);
});

const maleKeywords = ["雄","強","賢","志","威"];
const femaleKeywords = ["芬","芸","佩","美","甄"];

let go = () => {
    // 測試
    // alert("hi");
    // .val()：Ajax語法，拿第一個成立的值
    var inputText = $("#userInput").val();
    // debugger;
    // Array METHOD : some(對陣列檢查是否有包含"條件"，並回傳true或是fault)
    // String method : includes
    // => inputText.includes(thisElement)：單一條件，所以可以省略掉return、{}
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
    // debugger;
    if(isMale && isFemale){
        $("h1").text("早安你好!");
        $("h2").text("(´▽`ʃ♡ƪ)");
    }else if(isMale){
        $("h1").text("早安你好! 你這個大雞雞!");
        $("h2").text("o(*￣▽￣*)ブ🐔🐔");
    }else if(isFemale){
        $("h1").text("早安你好! 女神來了!");
        $("h2").text("(✿◕‿◕✿)😍😍");
    }else{
        $("h1").text("早安你好!請問你是誰?");
        $("h2").text("(╬▔皿▔)╯");
    }
};