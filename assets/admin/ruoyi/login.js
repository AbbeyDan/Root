
$(function() {
    validateRule();
	$('.imgcode').click(function() {
		var num="";
		for(var i=0;i<4;i++){
			num+=Math.floor(Math.random()*10)
		}
		code=num;//页面的code
		var url = ctx + "captcha/4?code=" + num + "&s=" + Math.random();
		$(".imgcode").attr("src", url);
	});
});

$.validator.setDefaults({
    submitHandler: function() {
		login();
    }
});

function login() {
	$.modal.loading($("#btnSubmit").data("loading"));
	var username = $.common.trim($("input[name='username']").val());
    var password = $.common.trim($("input[name='password']").val());
    var validateCode = $("input[name='validateCode']").val();
    if(validateCode!=code){
    	$.modal.closeLoading();
    	$('.imgcode').click();
    	$(".code").val("");
    	$.modal.msg("验证码错误");
    }else{
    	$.ajax({
            type: "post",
            url: ctx + "api/admin/user/login",
            data: {
                "username": username,
                "password": password
            },
            success: function(r) {
                if (r.code == 200) {
                    location.href = ctx + 'admin/';
                } else {
                	$.modal.closeLoading();
                	$('.imgcode').click();
                	$(".code").val("");
                	$.modal.msg(r.msg);
                }
            }
        });
    }
}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: icon + "请输入您的用户名",
            },
            password: {
                required: icon + "请输入您的密码",
            }
        }
    })
}
