//팝업쿡키
createPop({
    name: "#popup",
    data_url: "data/pop.html"
});

var isCookie = document.cookie.indexOf("popup=done");

//처음 로딩시 쿠키가 있는지 판단해서 쿠키가 없을때만 팝업 보이기
if(isCookie === -1){
    $("#popup").show();
    console.log("쿠키없음");
}else{
    $("#popup").hide();
    console.log("쿠키있음");
}
//쿠키 팝업 닫기 버튼 클릭 시
$("#popup .close").on("click",function(e){
    e.preventDefault();
    removePop(this);
});

//팝업 생성 함수 정의
function createPop(opt){
    //동적으로 팝업생성
    var idName = opt.name.split("#")[1];
    $("body")
        .append(
            $("<aside>")
                .attr("id",idName)
                .css({
                    position:"absolute", top:"50%",left:"50%",
                    transform:"translate(-50%,-50%)",zIndex:5,
                    display:"none"
                })
                .append(
                    $("<div class='content'>"),
                    $("<div class='wrap'>")
                        .append(
                            $("<input type='checkbox' id='ck'>"),
                            $("<label for='ck'>").text("다시 보지 않기")
                        ),
                        $("<a href='#'>").addClass("close")
                ).fadeIn()
        );
    //팝업에 인수로 전달받은 외부 데이터 추가하기
    $.ajax({
        url:opt.data_url,
        success :function(data){
            $(opt.name).find(".content").html(data);
        },
        error : function(err){
            console.error(err);
        }
    })
}
//팝업 제거 함수 정의
function removePop(el){
    // el == this
    //체크유무와, 해당 팝업의 클래스 이름 변수에 할당
    var isChecked = $(el).prev().find("input[type=checkbox]").is(":checked");
    var id_name = $(el).parent().attr("id");    

    //체크시 하루동안 클래스 이름으로 쿠키생성
    if(isChecked) setCookie(id_name, "done", 1);

    //해당 팝업은 fadeOut 이후 제거
    $(el).parent().fadeOut(500, function(){
        $(this).remove();
    });
}
//쿠키 생성 함수 정의
function setCookie(name, val, time){     
    var today = new Date();
    var date = today.getDate();
    today.setDate(date+time);     
    var duedate = today.toGMTString();
    document.cookie = name+"="+val+"; path=/; expires="+duedate;
}