var musicArr = [
    {
        msurl: "./msAndig/张碧晨 - 明天会更好 (Live).mp3",
        muimg: "./msAndig/明天会更好.jpg",
        muname: "明天会更好",
        singer: "张碧晨"
    },
    {
        msurl: "./msAndig/姜慕源 - 时间煮雨.mp3",
        muimg: "./msAndig/时间煮雨.jpg",
        muname: "时间煮雨",
        singer: "姜慕源"
    },
    {
        msurl: "./msAndig/张雨生 - 我的未来不是梦.mp3",
        muimg: "./msAndig/我的未来不是梦.jpg",
        muname: "我的未来不是梦",
        singer: "张雨生"
    }
]
var mutu = document.querySelector(".mutu")
mutu.style.animationPlayState = "paused"
var pre = document.querySelector(".pre")
var next = document.querySelector(".next")
var index = 0
var timelis
$(".stop").click(function () {
    clearTimeout(timelis)
    if ($(this).find(".zt").css("display") == "none") {
        $(this).find(".zt").css("display", "inline-block")
        $(this).find(".ks").css("display", "none")
        mutu.style.animation = "cir 10s linear infinite";
        mutu.style.animationPlayState = "running"
        $(".mus").get(0).play()
    } else {

        $(this).find(".zt").css("display", "none")
        $(this).find(".ks").css("display", "inline-block")
        mutu.style.animationPlayState = "paused"
        $(".mus").get(0).pause()
    }
})

var jd = document.querySelector(".jd");
var mus = document.querySelector(".mus")
function init() {
    mus.oncanplay = function () {
        jd.max = mus.duration
        document.querySelector(".teed").innerHTML = Math.floor(parseInt(mus.duration) / 60).toString().padStart(2, "0") + ":" + (parseInt(mus.duration) % 60).toString().padStart(2, "0")
    }
    mus.ontimeupdate = function () {
        jd.value = mus.currentTime
        document.querySelector(".txst").innerHTML = Math.floor(parseInt(mus.currentTime) / 60).toString().padStart(2, "0") + ":" + (parseInt(mus.currentTime) % 60).toString().padStart(2, "0")
    }
    jd.oninput = function () {
        mus.currentTime = jd.value
    }
    mus.onended = function () {
        $(".nelis").fadeToggle(1000, function () {
            $(".nelis").fadeToggle(1000)
        })
        timelis = setTimeout(function () {
            if (index < musicArr.length - 1) {
                index++
            } else {
                index = 0
            }

            document.querySelector(".mutu").src = musicArr[index].muimg
            document.querySelector(".mus").src = musicArr[index].msurl
            document.querySelector(".muna").innerHTML = musicArr[index].muname
            document.querySelector(".singer").innerHTML = musicArr[index].singer
            mus.play()
        }, 3000)

    }
}
window.onload = function () {
    document.querySelector(".teed").innerHTML = Math.floor(parseInt(mus.duration) / 60).toString().padStart(2, "0") + ":" + (parseInt(mus.duration) % 60).toString().padStart(2, "0")
}
init()

pre.onclick = function () {
    clearTimeout(timelis)
    if (index == 0) {
        index = musicArr.length - 1
    } else {
        index--
    }
    $(".zt").css("display", "none")
    $(".ks").css("display", "inline-block")
    $(".mus").get(0).pause()
    mutu.style.animation = "none";
    document.querySelector(".mutu").src = musicArr[index].muimg
    document.querySelector(".mus").src = musicArr[index].msurl
    document.querySelector(".muna").innerHTML = musicArr[index].muname
    document.querySelector(".singer").innerHTML = musicArr[index].singer
}
next.onclick = function () {
    clearTimeout(timelis)
    if (index == musicArr.length - 1) {
        index = 0
    } else {
        index++
    }
    $(".zt").css("display", "none")
    $(".ks").css("display", "inline-block")
    $(".mus").get(0).pause()
    mutu.style.animation = "none";
    document.querySelector(".mutu").src = musicArr[index].muimg
    document.querySelector(".mus").src = musicArr[index].msurl
    document.querySelector(".muna").innerHTML = musicArr[index].muname
    document.querySelector(".singer").innerHTML = musicArr[index].singer
}
$(".lis").click(function () {
    clearTimeout(timelis)
    $(".card").css({ "transform": "rotateY(180deg) scale(1.2)" })
    $(".fro").css("display", "none")
})
$(".fhui").click(function () {
    $(".card").css("transform", "rotateY(0deg) scale(1.2)")
    $(".fro").css("display", "block")
})
$("li").click(function () {
    index = $(this).index()
    document.querySelector(".mutu").src = musicArr[index].muimg
    document.querySelector(".mus").src = musicArr[index].msurl
    document.querySelector(".muna").innerHTML = musicArr[index].muname
    document.querySelector(".singer").innerHTML = musicArr[index].singer
    $(".card").css("transform", "rotateY(0deg) scale(1.2)")
    $(".fro").css("display", "block")
    $(".zt").css("display", "inline-block")
    $(".ks").css("display", "none")
    mutu.style.animationPlayState = "running"
    $(".mus").get(0).play()
})