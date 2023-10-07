$(function(){
    $("#add").on("click",writeHandler);
    $("#update").on("click",updateHandler);
    $("#delete").on("click",deleteHandler);
});

function readHandler(){
    let url = "http://localhost:3000/to-do/1";
    $.getJSON(url)

}

function writeHandler(){
    var aaa 
    aaa=document.getElementById("tobuy").value;
    console.log(aaa)
    // console.log($("#tobuy")[0].value);
}
function updateHandler(){
    let url = "http://localhost:3000/to-do/1";
    $.ajax({
        url:url,
        type:'PUT',
        data:'task=',
        success:function(data){
            console.log(data);
        }
    });
}

function deleteHandler(){
    let url = "http://localhost:3000/to-do/2";
    $.ajax({
        url:url,
        type:'DELECT',
        success:function(data){
            console.log(data);
        }
    });
}