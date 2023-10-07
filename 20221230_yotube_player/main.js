let Player;
//YouTubePlayer
let currentPlay = 0;
//記錄目前撥到第幾首歌

//YouTube API Ready
// onYouTubeIframeAPIReady:大小寫注意不要拼錯
function onYouTubeIframeAPIReady(){
    // alert("hi");
    player = new YT.Player("player",{
        height:"450",
        width:"750",
        videoId:playList[currentPlay],
        playerVars:{
            // autoplay:0(為defult，所以可不寫)
            autoplay:0,
            controls:0,
            start:playTime[currentPlay][0],
            end:playTime[currentPlay][1],
            // iv_load_policy：置入性行銷
            iv_load_policy:3
        },
        events:{
            // when the video player is ready => onReady
            onReady:onPlayerReady,
            // when the player's state changes => onStateChange
            onStateChange:onPlayerStateChange
        }
    });
}
//YouTube Player Ready
function onPlayerReady(event){
    $("#playButton").on("click", function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
// Player State Change
function onPlayerStateChange(event){
    console.log(event.data);
    // event.data
    // -1 - unstarted
    // 0 - Ended
    // 1 - Playing
    // 2 - Paused
    // 3 - buffering
    // 5 - video cued
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        if(currentPlay<playList.length-1){
            currentPlay++;
            player.loadVideoById({videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else{
            currentPlay=0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        } 
    }
    if(event.data==1){
        $("h2").text(player.getVideoData().title);
    }
}

