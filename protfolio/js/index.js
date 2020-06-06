/////////// 這是nav scroll顯示效果///////////
var lastScrollTop = 200;

window.addEventListener("scroll", function () {
    var nowScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (nowScrollTop > lastScrollTop) {
        $('nav').addClass('blue-grey  lighten-3 shadow')
    } else {
        $('nav').removeClass('blue-grey  lighten-3 shadow')
    }
    lastScrollTop = nowScrollTop <= 0 ? 0 : nowScrollTop;
    // For Mobile or negative scrolling
}, false);


/////////// 這是ajax///////////
$.ajax({
    url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D",

    success: function (weather) {
        var locations = weather.records.location;

        console.log(locations)

        const element = locations[11];

        var city = element.locationName;
        var Wx = element.weatherElement[0].time[0].parameter.parameterName;
        var PoP = element.weatherElement[1].time[0].parameter.parameterName;
        var MinT = element.weatherElement[2].time[0].parameter.parameterName;
        var MaxT = element.weatherElement[4].time[0].parameter.parameterName;

        console.log(city)


        var content = document.querySelector(".ajaxcontainer")

        var img_src = " "
        var advice = " "
        var color = " "
        if (PoP >= 0 && PoP < 30) {
            img_src = "./img/icons/sun.png";
            advice = "快樂出門"
        } else if (PoP >= 30 && PoP < 60) {
            img_src = "./img/icons/cloud.png";
            advice = "帶個雨傘"
        } else {
            img_src = "./img/icons/rain.png";
            advice = "攜帶雨具"
        }

        content.innerHTML += `
            <div class="ajaxcard">
                <img src="${img_src}" alt="">
                <h4>${city}</h4>
                <h5>今明36小時天氣預報：</h5>
                <h5>${Wx}</h5>
                <h5>氣溫${MinT}~${MaxT}℃</h5>
                <h5>您需要帶傘的機率 <span id="size">${PoP}%</span></h5>
                <div class="test"><h5>建議您：</h5>
                    <div>
                        <span id="go">${advice}</span>
                    </div>
                </div>
            </div>
        `
    }
})