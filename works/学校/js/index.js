$(".accordion .btnn").click(function () {
    $(this).parent().siblings().each(function () {
        if ($(this).find("p").css("display") == "block") {
            $(this).find(".act").get(0).innerText = "+"
            $(this).find("h2").get(0).style.color = "#000"
            $(this).find("p").slideUp()
        } else {
            $(this).find("p").slideUp()
        }
    })
    if ($(this).next().css("display") == "none") {
        $(this).find(".act").get(0).innerText = "-"
        $(this).find("h2").get(0).style.color = "#7a6ad8"
        $(this).next().slideToggle()
    } else {
        $(this).find(".act").get(0).innerText = "+"
        $(this).find("h2").get(0).style.color = "#000"
        $(this).next().slideToggle()
    }
})
$(".accordion .btnn").find("h2").get(0).style.color = "#7a6ad8"

$(".accordion .btnn").eq(0).find(".act").get(0).innerText = "-"
$(".accordion .btnn").next().get(0).style.display = "block"
// 轮播
let timelb = true
$(".leftbt").click(function () {
    if (timelb) {
        timelb = false
        if ($(".boxitem").css("marginLeft") === "-1028px") {
            $(".boxitem").css({ "marginLeft": "-4112px" })
            $(".boxitem").animate({
                "marginLeft": "+=1028" + "px"
            })
        } else {
            $(".boxitem").animate({
                "marginLeft": "+=1028" + "px"
            })
        }
        setTimeout(function () {
            timelb = true
        }, 500)
    }

})
$(".rightbt").click(function () {
    if (timelb) {
        timelb = false
        if ($(".boxitem").css("marginLeft") === "-3084px") {
            $(".boxitem").css({ "marginLeft": "0px" })
            $(".boxitem").animate({
                "marginLeft": "-=1028" + "px"
            })
        } else {
            $(".boxitem").animate({
                "marginLeft": "-=1028" + "px"
            })
        }
        setTimeout(function () {
            timelb = true
        }, 500)
    }
})
