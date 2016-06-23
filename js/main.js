
var jsonData = {
	"status":"preView",
	"formData":[]
};

function changeJsonStatus() {
	var oldSatus = jsonData.status;
	jsonData.status = oldSatus === "preView" ? "edit" :"preView";
}

function addJsonFormItem(formItem) {
	jsonData.formData.push(formItem);
}

function removeJsonFormItem(id) {
	// console.log("formdata11:",JSON.stringify(jsonData.formData));
	for(var i in jsonData.formData){
		if(jsonData.formData[i]["id"] == id){
			jsonData.formData.splice(i,1);
			break;
		}
	}
	// console.log("formdata22:",JSON.stringify(jsonData.formData));
}

function render(json) {
	var status = json.status,
		mainContentHtml;

	var preViewButtonHtml = '<button  class="btn btn-warning status-btn" onclick="changePageStatus()">预览</button>';
	var editButtonHtml = '<button class="btn btn-info status-btn" onclick="changePageStatus()">编辑</button>';
	var addButtonHtml = '<a class="add-form-item-btn" onclick="createPopUpBox()"><span class="glyphicon glyphicon-plus"></span></a>';
	var formHtml= createFormHtml(json);
	var submitButtonHtml = '<button class="btn btn-default submit-btn">提交</button>';

	if(status ==="preView"){
		mainContentHtml = preViewButtonHtml + addButtonHtml + formHtml;
	}
	if(status ==="edit"){
		mainContentHtml = editButtonHtml +  formHtml + submitButtonHtml;
	}
	$("#main_box").html(mainContentHtml);
}

function createFormHtml(json) {
	var status = json.status,
		formData = json.formData,
		formHtml = '<form action="#" class="content-form">',
		deleteButtonStatus = status === "preView" ? "" : "none";

	if (formData.length ==0) {return formHtml+"啥都没有，唉！</form>"};

	for (var i in formData){
		var formItem = "",
			itemLableName = formData[i]["type"] == "text" ? "文本":"日期",
			itemId = formData[i]["id"],
			itemText = formData[i]["text"];

		formItem =  "\
<div class=\"content-div\">\
    <label class=\"content-label\">"+itemLableName+"</label>\
    <span class=\"content-text\">"+itemText+"</span>\
    <a class=\"content-remove\" id=\""+itemId+"\" href=\"#\" onclick='removeFormItem(this.id)' style=\"display:"+ deleteButtonStatus +"\">\
    	<span class=\"glyphicon glyphicon-minus\"></span>\
    </a>\
</div>";

		formHtml += formItem;
	}
	formHtml +=  "</form>";
	return formHtml;
}

function changePageStatus() {
	changeJsonStatus();
	render(jsonData);
}

function addFormItem() {
	var addItemType = $('input[name="input-type"]:checked').val();
	var addItemId = parseInt((new Date()).getTime());
	var addItemText = addItemType == "text" ? "我是文本"+addItemId :"我是日期"+addItemId;
	var addItem = {"type":addItemType,"id":addItemId,"text":addItemText};
	addJsonFormItem(addItem);
	closePopUp();
	render(jsonData);
	// $("#pop_up_box").html("");
}
function removeFormItem(itemId) {
	// alert(itemId);
	removeJsonFormItem(itemId);
	render(jsonData)
}

function createPopUpBox(){
	var popUpBoxHtml = '\
	<h3>选择添加类型\
	<small>\
	  <a href="javascript:;" onclick="closePopUp()">\
	    <span class="glyphicon glyphicon-remove"></span>\
	  </a>\
	  <a href="javascript:;" onclick="addFormItem()">\
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
	</div>';

	// return popUpBoxHtml;
	$("#pop_up_box").html(popUpBoxHtml);
	$("#pop_up_box").show();
}

function closePopUp() {
	$("#pop_up_box").html("");
	$("#pop_up_box").hide();
}

$(document).ready(function(){
	render(jsonData);
});

