$(function () {
    // 監聽 送出訂單 按鈕點擊
    // 下面這段主要在組合資料，還有擋使用者不填資料不能送出
    $('#sendOrder').click(function (e) {
        var status = true;

        var date = $('#date').val();
        var time = $('#time').val();
        var primary = $('#primary').val();
        var secondary = $('#secondary').val();
        var currency = $('#currency').val();
        var exchangeRate = $('#exchangeRate').val();
        var amount = $('#amount').val();
        var description = $('#description').val();
        var tag = $('#tag').val();

        // 擋住不填資料邏輯
        if (date == '') {
            $('#date').css('border', '1px solid #ff0000');
            status = false;
        }
        if (time == '') {
            $('#time').css('border', '1px solid #ff0000');
            status = false;
        }
        if (primary == '') {
            $('#primary').css('border', '1px solid #ff0000');
            status = false;
        }
        if (secondary == '') {
            $('#secondary').css('border', '1px solid #ff0000');
            status = false;
        }
        if (amount == '') {
            $('#amount').css('border', '1px solid #ff0000');
            status = false;
        }
        if (description == '') {
            $('#description').css('border', '1px solid #ff0000');
            status = false;
        }
        if (tag == '') {
            $('#tag').css('border', '1px solid #ff0000');
            status = false;
        }

        // 如果 必填欄位都過了 才會到這邊
        if (status) {
            // 增加日期資料
            var currentDate = moment().format("YYYY/MM/DD HH:mm");
            // 打包 要的資料
            var data = {
                'write': currentDate,
                'date': date,
                'time': time,
                'primary': primary,
                'secondary': secondary,
                'currency': currency,
                'exchangeRate': exchangeRate,
                'amount': amount,
                'description': description,
                'tag': tag,
            }
            // 呼叫 send ajax function
            send(data);
        }
    });
});
function send(data) {
    $.ajax({
        // 這邊用get type
        type: "get",
        // api url - google appscript 產出的 url
        url: "https://script.google.com/macros/s/AKfycbx4GZtjxp-TeiI8Vm2M_4DWPMaku825CntN5VYQQKvGJy_dM_3f/exec",
        // 剛剛整理好的資料帶入
        data: data,
        // 資料格式是JSON 
        dataType: "JSON",
        // 成功送出 會回頭觸發下面這塊感謝
        success: function (response) {
            $("#date").val('');
            $("#time").val('');
            $("#primary").val('');
            $("#secondary").val('');
            $("#amount").val('');
            $("#description").val('');
            $("#tag").val('');

            $("#newArea").slideUp();
            $("#new").show();
            $("#close").hide();

            console.log("新增日報成功傳送!");
            console.log(response);
            alert('查看是否已寫入成功啦');
        },
    });
    $('html, body').animate({ scrollTop: 0 }, 100);
}




// 洋哥大作！取得【,】前、與【,】中間【,】，的所有標籤文字！
// 我想改成取得某一欄位的標籤即可
var a = '加油,加油,加油,加油,加油,羅,晚餐,朱,朱機車,刷卡,加油,羅,晚餐,朱,朱機車,刷卡,加油,羅,晚餐,朱,朱機車,刷卡,加油,';
var flag_last = 0;
var b = [];
for (i = 0; i <= a.length; i++) {
    if (a[i] == ',' || i == a.length) {
        if (flag_last == 0) {
            console.log(a.substr(flag_last, i - flag_last));
            b[a.substr(flag_last, i - flag_last)] = 1;
            flag_last = i;
        } else {
            console.log(a.substr(flag_last + 1, i - flag_last - 1));
            b[a.substr(flag_last + 1, i - flag_last - 1)] = 1;
            flag_last = i;
        }
    }
}

console.log(b);


$(document).ready(function () {
    ////////////// 先read當月收支記錄 //////////////
    // $.ajax({
    //     type: 'get',
    //     url: 'read.php',
    //     data: {
    //         "getdate": day,
    //         "getyear": choiceThis,
    //     },
    //     success: function (history) {
    //         var history_workEXP = history.work_exp;
    //         var history_recent = history.recent;
    //         var history_today = history.today;
    //         var history_workEXP_container = document.querySelector("#history_workEXPtext")
    //         history_workEXP_container.innerHTML = `${nl2br(history_workEXP)}`

    //         // // ********重點！get裡的textarea裡不用放n12br()*****//
    //         for (e = 0; e < history_recent.length; e++) {
    //             var history_recent_item = history_recent[e].recent_item;
    //             var history_recent_project = history_recent[e].recent_project;
    //             var history_recent_description = history_recent[e].recent_description;

    //             var history_recent_container = document.querySelector("#history_recent_tbody")
    //             history_recent_container.innerHTML += `
    //                      <tr>
    //                          <td>
    //                             <div class="history_recent_item form-control">${nl2br(history_recent_item)}</div>
    //                          </td>
    //                          <td>
    //                             <textarea class="history_recent_project form-control">${history_recent_project}</textarea>
    //                          </td>
    //                          <td>
    //                             <textarea class="history_recent_description form-control">${history_recent_description}</textarea>
    //                          </td>
    //                       </tr>
    //                     `
    //         }

    //         for (x = 0; x < history_today.length; x++) {
    //             var history_startTime = history_today[x].start_time;
    //             var history_endTime = history_today[x].end_time;
    //             var history_location = history_today[x].location;
    //             var history_brand = history_today[x].brand;
    //             var history_today_item = history_today[x].today_item;
    //             var history_today_project = history_today[x].today_project;
    //             var history_today_description = history_today[x].today_description;

    //             var history_today_container = document.querySelector("#history_today_tbody")
    //             history_today_container.innerHTML += `
    //                     <tr>
    //                         <td>
    //                             <div class="history_startTime form-control">${nl2br(history_startTime)}</div>
    //                         </td>
    //                         <td>
    //                             <div class="history_endTime form-control">${nl2br(history_endTime)}</div>
    //                         </td>
    //                         <td>
    //                             <div class="history_location form-control">${nl2br(history_location)}</div>
    //                         </td>
    //                         <td>
    //                             <div class="history_brand form-control">${nl2br(history_brand)}</div>
    //                         </td>
    //                         <td>
    //                             <div class="history_today_item form-control">${nl2br(history_today_item)}</div>
    //                         </td>
    //                         <td>
    //                             <textarea class="history_today_project form-control">${history_today_project}</textarea>
    //                         </td>
    //                         <td>
    //                             <textarea class="history_today_description form-control">${history_today_description}</textarea>
    //                         </td>
    //                     </tr>
    //                 `
    //         }

    //     },
    //     dataType: "json",
    // });
    //////// 這裡第一行，直接做ajax執行給後端today的日期，取回當日已填寫的歷史訊息！////////

    // var line_select1 = [];
    // var line_select2 = [];
    // var line_select3 = [];
    // var line_select4 = [];
    // ////////////// 新增日報一次性點擊取回當天日報資料 ////////////// 
    // $("#NEW_getTodayData").click(function () {
    //     $('#date').val(today);
    //     $("#NEW_getTodayData").hide();

    //     $("#Journal").show();
    //     $("#dateName").show();
    //     $("#date").show();
    //     $("#history_Journal").hide();
    //     $("#exceptionHandlingzone").hide();
    //     $("#calendar").hide();
    //     $("#others_calendar").hide();
    //     $("#CLOSE").show();
    //     $("#exceptionHandling").show();
    //     $("#CLOSEexceptionHandling").hide();
    //     $("#level2_exceptionHandling").show();

    //     if (screen.width >= 575) {
    //         $("#selectStaff").hide();
    //         $("#NOselectStaff").show();
    //         $("#selectDepartment").hide();
    //         $("#NOselectDepartment").show();
    //     } else {
    //         $("#selectStaff").hide();
    //         $("#selectDepartment").hide();
    //         document.getElementById("NewPostButtonArea").style.top = "114px";
    //         document.getElementById("Journal").style.margin = "0 0 0 0";
    //         document.getElementById("level2_exceptionHandling").style.margin = "16px 0 0 0";
    //     }

    //     ////////////// date設定min及max功能 //////////////
    //     $(function () {
    //         var workday = moment();
    //         var day = workday.day();
    //         // console.log(day);
    //         var diff = 1;  // returns yesterday
    //         if (day == 0 || day == 1) {  // is Sunday or Monday
    //             diff = day + 2;  // returns Friday
    //             var minDate1 = workday.subtract(diff, 'days').format('YYYY' + "-" + 'MM' + "-" + 'DD');
    //             $('#date').attr('min', minDate1);
    //             // console.log("Sunday or Monday" + minDate1);
    //         }
    //         else {
    //             var minDate2 = workday.subtract(1, 'days').format('YYYY' + "-" + 'MM' + "-" + 'DD');
    //             $('#date').attr('min', minDate2);
    //             // console.log("星期二到六" + minDate2);
    //         }
    //         $('#date').attr('max', today);
    //     });

    //     $.ajax({
    //         type: 'get',
    //         url: 'read.php',
    //         data: {
    //             "getdate": day,
    //             "getyear": choiceThis,
    //         },
    //         success: function (todayDate) {
    //             // console.log('當天日報已寫入get日期' + day + choiceThis);
    //             // console.log(todayDate);
    //             var todayDate_workEXP = todayDate.work_exp;
    //             var todayDate_recent = todayDate.recent;
    //             var todayDate_today = todayDate.today;

    //             var todayDate_workEXP_container = document.querySelector("#workEXP")
    //             todayDate_workEXP_container.innerHTML = `
    //             <h5>工作心得分享</h5>
    //             <textarea id="workEXPtext" class="form-control">${todayDate_workEXP}</textarea>`

    //             for (e = 0; e < todayDate_recent.length; e++) {
    //                 var todayDate_recent_item = todayDate_recent[e].recent_item;
    //                 var todayDate_recent_project = todayDate_recent[e].recent_project;
    //                 var todayDate_recent_description = todayDate_recent[e].recent_description;

    //                 var todayDate_recent_container = document.querySelector("#recent_tbody")
    //                 todayDate_recent_container.innerHTML += `
    //                          <tr id="line_recent${e + 1}">
    //                             <td>
    //                                 <input type="text" disabled class="recent_item form-control" id="recent_item${e + 1}"
    //                                 value="${todayDate_recent_item}">
    //                             </td>
    //                             <td>
    //                                 <textarea
    //                                     class="recent_project form-control">${todayDate_recent_project}</textarea>
    //                             </td>
    //                             <td>
    //                                 <textarea
    //                                     class="recent_description form-control">${todayDate_recent_description}</textarea>
    //                             </td>
    //                             <td>
    //                                 <button type="button"
    //                                     class="btn btn-userDefined recent_delete" id="recent_delete${e + 1}" onclick="recentDestory(${e + 1});">刪除</button>
    //                             </td>
    //                           </tr>
    //                         `
    //             }
    //             line_recent = todayDate_recent.length + 1;

    //             var Time = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    //             var Location = ['台灣', '廈門', '海外'];
    //             var Brand = ['方圓國際', '喫茶小舖', '吃茶三千'];
    //             for (x = 0; x < todayDate_today.length; x++) {
    //                 var todayDate_startTime = todayDate_today[x].start_time;
    //                 todayDate_startTime = todayDate_startTime.replace(/\s*/g, "");
    //                 var todayDate_endTime = todayDate_today[x].end_time;
    //                 todayDate_endTime = todayDate_endTime.replace(/\s*/g, "");
    //                 var todayDate_location = todayDate_today[x].location;
    //                 todayDate_location = todayDate_location.replace(/\s*/g, "");
    //                 var todayDate_brand = todayDate_today[x].brand;
    //                 todayDate_brand = todayDate_brand.replace(/\s*/g, "");
    //                 var todayDate_today_item = todayDate_today[x].today_item;
    //                 var todayDate_today_project = todayDate_today[x].today_project;
    //                 var todayDate_today_description = todayDate_today[x].today_description;

    //                 var todayDate_today_container = document.querySelector("#today_tbody")
    //                 todayDate_today_container.innerHTML += `
    //                         <tr id="line${x + 1}">
    //                             <td>
    //                                 <select class="startTime form-control" id="startTime${x + 1}"></select>
    //                             </td>
    //                             <td>
    //                                 <select class="endTime form-control" id="endTime${x + 1}"></select>
    //                             </td>
    //                             <td>
    //                                 <select class="location form-control" id="location${x + 1}"></select>
    //                             </td>
    //                             <td>
    //                                 <select class="brand form-control" id="brand${x + 1}"></select>
    //                             </td>
    //                             <td>
    //                                 <input type="text" disabled class="today_item form-control" id="today_item${x + 1}"
    //                                 value="${todayDate_today_item}">
    //                             </td>
    //                             <td>
    //                                 <textarea class="today_project form-control">${todayDate_today_project}</textarea>
    //                             </td>
    //                             <td>
    //                                 <textarea
    //                                     class="today_description form-control">${todayDate_today_description}</textarea>
    //                             </td>
    //                             <td>
    //                                 <button type="button"
    //                                     class="btn btn-userDefined today_delete" id="today_delete${x + 1}" onclick="destory(${x + 1});">刪除</button>
    //                             </td>
    //                         </tr>`
    //                 var todayDate_today_startTime_container = document.querySelector("#startTime" + (x + 1))
    //                 for (j = 0; j < 15; j++) {
    //                     var option = document.createElement("option");
    //                     option.text = Time[j];
    //                     // console.log(todayDate_startTime.length);
    //                     // console.log(Time[j].length);
    //                     // if (todayDate_startTime === Time[j]) { console.log("歷史記錄時間" + todayDate_startTime + "比對得到時間" + Time[j]); };
    //                     if (todayDate_startTime == Time[j]) line_select1[x] = j;
    //                     todayDate_today_startTime_container.appendChild(option);
    //                 }
    //                 var todayDate_today_endTime_container = document.querySelector("#endTime" + (x + 1))
    //                 for (j = 0; j < 15; j++) {
    //                     var option = document.createElement("option");
    //                     option.text = Time[j];
    //                     if (todayDate_endTime == Time[j]) line_select2[x] = j;
    //                     todayDate_today_endTime_container.appendChild(option);
    //                 }
    //                 var todayDate_today_location_container = document.querySelector("#location" + (x + 1))
    //                 for (j = 0; j < 3; j++) {
    //                     var option = document.createElement("option");
    //                     option.text = Location[j];
    //                     if (todayDate_location == Location[j]) line_select3[x] = j;
    //                     todayDate_today_location_container.appendChild(option);
    //                 }
    //                 var todayDate_today_brand_container = document.querySelector("#brand" + (x + 1))
    //                 for (j = 0; j < 3; j++) {
    //                     var option = document.createElement("option");
    //                     option.text = Brand[j];
    //                     if (todayDate_brand == Brand[j]) line_select4[x] = j;
    //                     todayDate_today_brand_container.appendChild(option);
    //                 }
    //             }
    //             for (s = 0; s < line_select1.length; s++) {
    //                 $('#startTime' + (s + 1)).children().each(function () {
    //                     if ($(this).text() == Time[line_select1[s]]) {
    //                         //jQuery給法
    //                         // $(this).attr("selected", true); //或是給"selected"也可

    //                         //javascript給法
    //                         this.selected = true;
    //                     }
    //                 });
    //                 $('#endTime' + (s + 1)).children().each(function () {
    //                     if ($(this).text() == Time[line_select2[s]]) {
    //                         this.selected = true;
    //                     }
    //                 });
    //                 $('#location' + (s + 1)).children().each(function () {
    //                     if ($(this).text() == Location[line_select3[s]]) {
    //                         this.selected = true;
    //                     }
    //                 });
    //                 $('#brand' + (s + 1)).children().each(function () {
    //                     if ($(this).text() == Brand[line_select4[s]]) {
    //                         this.selected = true;
    //                     }
    //                 });
    //             }
    //             // console.log(line_select1);
    //             line = todayDate_today.length + 1;
    //         },
    //         dataType: "json",
    //     });
    //     $('html, body').animate({ scrollTop: 0 }, 100);
    // });


    ////////////// 開啟新增 //////////////
    $("#new").click(function () {
        $("#newArea").show();
        document.getElementById("BTNS").style.margin = "0 0 0 0";
        $("#new").hide();
        $("#close").show();
    });
    ////////////// 關閉新增 //////////////
    $("#close").click(function () {
        $("#newArea").hide();
        document.getElementById("BTNS").style.margin = "640px 0 0 0";
        $("#new").show();
        $("#close").hide();
    });

    // ////////////// 部門用!off!關閉!!異常查詢按鈕 //////////////
    // $("#CLOSEexceptionHandling").click(function () {
    //     if ($("#NEW_getTodayData").is(":hidden")) {
    //         //如果元素為隱藏,則將它...
    //         $("#exceptionHandlingzone").hide();
    //         $("#history_Journal").show();
    //         $("#Journal").hide();
    //         $("#calendar").hide();
    //         $("#others_calendar").hide();
    //         $("#CLOSE").hide();
    //         $("#dateName").hide();
    //         $("#date").hide();
    //         $("#NEW").show();
    //         $("#CLOSEexceptionHandling").hide();
    //         $("#level2_exceptionHandling").show();

    //         if (screen.width >= 575) {
    //             if ($("#selectStaff").is(":hidden")) {
    //                 $("#selectStaff").show();
    //                 $("#NOselectStaff").hide();
    //             }
    //         } else {
    //             if ($("#selectStaff").is(":hidden")) {
    //                 $("#selectStaff").show();
    //                 document.getElementById("NewPostButtonArea").style.top = "174px";
    //                 document.getElementById("level2_exceptionHandling").style.margin = "0 0 0 0";
    //             }
    //         }
    //     } else {
    //         //如果元素為顯現,則將其...
    //         $("#exceptionHandlingzone").hide();
    //         $("#history_Journal").show();
    //         $("#calendar").hide();
    //         $("#others_calendar").hide();
    //         $("#CLOSEexceptionHandling").hide();
    //         $("#level2_exceptionHandling").show();

    //         if (screen.width >= 575) {
    //             $("#selectStaff").show();
    //             $("#NOselectStaff").hide();
    //         } else {
    //             $("#selectStaff").show();
    //             document.getElementById("NewPostButtonArea").style.top = "174px";
    //         }
    //     }
    //     $('html, body').animate({ scrollTop: 0 }, 100);
    // });

    // ////////////// ***提交POST按鈕送出新增日報*** //////////////
    // $("#NEWPOST").click(function () {
    //     if (check() == true) {
    //         var recentArray = new Array();
    //         $('#recent_tbody tr').each(function (i) {
    //             var temp = {
    //                 "recent_item": $("td .recent_item", this).val(),
    //                 "recent_project": $("td .recent_project", this).val(),
    //                 "recent_description": $("td .recent_description", this).val(),
    //             }
    //             recentArray.push(temp);
    //         });

    //         var todayArray = new Array();
    //         $('#today_tbody tr').each(function (i) {
    //             var temp = {
    //                 "start_time": $("td .startTime", this).val(),
    //                 "end_time": $("td .endTime", this).val(),
    //                 "location": $("td .location", this).val(),
    //                 "brand": $("td .brand", this).val(),
    //                 "today_item": $("td .today_item", this).val(),
    //                 "today_project": $("td .today_project", this).val(),
    //                 "today_description": $("td .today_description", this).val(),
    //             }
    //             todayArray.push(temp);
    //         });

    //         var journal = {
    //             "date": $("#date").val(),
    //             "work_exp": $("#workEXPtext").val(),
    //             "recent": recentArray,
    //             "today": todayArray,
    //         };

    //         var journalStr = JSON.stringify(journal);

    //         $.ajax({
    //             type: 'post',
    //             url: 'insert.php',
    //             data: {
    //                 "journal": journalStr,
    //             },
    //             success: function () {
    //                 $("#recent_tbody tr").remove();
    //                 $("#today_tbody tr").remove();
    //                 $('#workEXPtext').remove();
    //                 $("#Journal").slideUp();
    //                 $("#dateName").hide();
    //                 $("#date").hide();
    //                 $("#CLOSE").hide();
    //                 $("#NEW").hide();
    //                 $("#NEW_getTodayData").show();
    //                 $("#getThisDate").hide();
    //                 $("#getLastDate").show();
    //                 $("#history_Journal").show();

    //                 if (screen.width >= 575) {
    //                     $("#selectStaff").show();
    //                     $("#NOselectStaff").hide();
    //                     $("#selectDepartment").show();
    //                     $("#NOselectDepartment").hide();
    //                 } else {
    //                     $("#selectStaff").show();
    //                     $("#selectDepartment").show();
    //                     document.getElementById("NewPostButtonArea").style.top = "174px";
    //                     document.getElementById("Journal").style.margin = "54px 0 0 0";
    //                     document.getElementById("level2_exceptionHandling").style.margin = "0 0 0 0";
    //                 }

    //                 line = 1;
    //                 line_recent = 1;
    //                 console.log("新增日報成功傳送!");
    //             },
    //         });
    //     }
    //     $('html, body').animate({ scrollTop: 0 }, 100);
    // });

});