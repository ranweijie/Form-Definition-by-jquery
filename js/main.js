var jsonData = {
	"hasViewButton":true,
	"hasAddButton":true,
	"hasEditButton":false,
	"hasSubmitButton":false,
	"hasPoppupBox":false,
	"inputBoxData":[]
}

function createMainContent(json){
	var	topButtonType = json.hasViewButton ? "view" :"edit",
		topButtonName = json.hasViewButton ? "预览" :"编辑",
		topButtonClassName = json.hasViewButton ? "btn-warning" :"btn-info",
		topButtonHtml = createButtonHtml(topButtonType,topButtonClassName,topButtonName),

		addButtonHtml = json.hasAddButton ? createButtonHtml("add","btn-success","添加") :"",
		formHtml = createFormHtml(topButtonType,json.inputBoxData),
		submitButtonHtml = json.hasSubmitButton ? createButtonHtml("submit","btn-default","提交") :"";

	var mainBoxInnerHtml = topButtonHtml + addButtonHtml + formHtml + submitButtonHtml;
	$("#main_box").html(mainBoxInnerHtml)
	

	var poppupBox = json.hasPoppupBox ? createPoppupBox() :"";
	$(poppupBox).appendTo('#main_box')
}


function createButtonHtml(btnType,btnClassName,btnName){
	var buttonHtml = '\
	<div class = "'+btnType+'-button-div">\
		<button id="'+btnType+'_button" class="btn '+btnClassName+'">'+btnName+'</button>\
	</div>';
	return buttonHtml
}

function createFormHtml(topButtonType,data){
	var formHtml = '<form action="#" class="content-form">';
	if (data.length ==0) {return formHtml+"啥都没有，唉！</form>"};
	
	var topBtnType = topButtonType,
		inputGroupHtml = "";
	for (var i in data){
		inputGroupHtml += createInputGroupHtml(topBtnType,data[i])
	}

	formHtml = formHtml + inputGroupHtml + "</form>";
	return formHtml;
}

function createInputGroupHtml(topButtonType,data){
	var inputGroupHtml = "",
		lableName = data["type"] == "text" ? "文本":"日期",
		inputId = data["id"],
		inputText = data["text"],
		removeButtonStatus = topButtonType == "view" ? "" : "none";

	inputGroupHtml =  "\
<div class=\"content-div\">\
    <label class=\"content-label\">"+lableName+"</label>\
    <span class=\"content-text\">"+inputText+"</span>\
    <a class=\"content-remove\" id=\""+inputId+"\" href=\"javascript:;\" style=\"display:"+ removeButtonStatus +"\">\
    	<span class=\"glyphicon glyphicon-minus\"></span>\
    </a>\
</div>"
	return inputGroupHtml;
}


function createPoppupBox(){
	var poppupBoxHtml = '\
<div id="popup_box">\
	<h3>选择添加类型\
	<small>\
	  <a href="javascript:;" id="close_popup">\
	    <span class="glyphicon glyphicon-remove"></span>\
	  </a>\
	  <a href="javascript:;" id="add_input_item">\
	    <span class="glyphicon glyphicon-ok"></span>\
	  </a>\
	</small>\
	</h3>\
	<div class="form-group">\
	<label class="radio-inline" for="text">\
	  <input id="text" name="input-type" type="radio" value="text">文本\
	</label><br>\
	<label class="radio-inline" for="date">\
	  <input id="date" name="input-type" type="radio" value="date" checked>日期\
	</label>\
	</div>\
</div>'
	return poppupBoxHtml;
}


$(document).ready(function(){
	createMainContent(jsonData)
    $("#add_button").on('click', function() {
    	console.log(jsonData.hasPoppupBox)
    	jsonData.hasPoppupBox = true;
    	console.log(jsonData.hasPoppupBox)
    	createMainContent(jsonData);
    });

    $(document).on("click", "#add_button", function(){
    	jsonData.hasPoppupBox = true;
    	createMainContent(jsonData);
    })


    $(document).on("click", "#close_popup", function(){
    	jsonData.hasPoppupBox = false;
		createMainContent(jsonData);
    })

    $(document).on("click", "#add_input_item", function(){
    	var inputType = $('input[name="input-type"]:checked').val();
    	var inputId = parseInt((new Date()).getTime());
    	var inputText = inputType == "text" ? "我是文本"+inputId :"我是日期"+inputId;
    	// alert(inputText)
    	var inputItemData = {"type":inputType,"id":inputId,"text":inputText}
    	// alert(JSON.stringify(jsonData))
    	jsonData.inputBoxData.push(inputItemData)
    	jsonData.hasPoppupBox = false;
		createMainContent(jsonData);
    })

    $("#view_button").on('click', function() {
    	jsonData.hasViewButton = false;
    	jsonData.hasAddButton = false;
    	jsonData.hasEditButton = true;
    	jsonData.hasSubmitButton = true;
    	createMainContent(jsonData);
    })

    $(document).on("click", "#view_button", function(){
    	jsonData.hasViewButton = false;
    	jsonData.hasAddButton = false;
    	jsonData.hasEditButton = true;
    	jsonData.hasSubmitButton = true;
    	createMainContent(jsonData);
    })

    $(document).on("click", "#edit_button", function(){
    	jsonData.hasViewButton = true;
    	jsonData.hasAddButton = true;
    	jsonData.hasEditButton = false;
    	jsonData.hasSubmitButton = false;
    	createMainContent(jsonData);
    })

    $(document).on("click", ".content-remove", function(){
    	var removeId = $(this).attr("id");
    	console.log("将要删除的id：",removeId)
    	// alert(removeId)
    	// alert(JSON.stringify(jsonData.inputBoxData))
    	console.log("删除前的jsonData为：",removeId)
    	for(var i in jsonData.inputBoxData){
    		if(jsonData.inputBoxData[i]["id"] == removeId){
    			jsonData.inputBoxData.splice(i,1);
    			break;
    		}
    	}
    	// alert(JSON.stringify(jsonData.inputBoxData))
    	console.log("删除后的jsonData为：",removeId)
    	createMainContent(jsonData);
    })

    $(document).on("click", "#submit_button", function(){
    	window.alert("Sorry,目前无法提交！")
    })
});

