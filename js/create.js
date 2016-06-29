$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    }
  );
    $("#removeButton").click(
    function() {
      removeText();
      showText();
    }
  );
}
// save function
function saveText() {
  var text = $("#formText");
  var time = new Date();

  //escapeText
  var val = escapeText(text.val());
  

  //check
  if(checkText(val)) {

    localStorage.setItem(time, text.val());
  }
  text.val("");
}


//escapeText function
function escapeText(text) {
    return $("<div>").text(text).html();
  
}

//check function
function checkText(text) {

 var str = text.replace(/(&lt;)/g, '<')
	            .replace(/(&gt;)/g, '>')
	            .replace(/(&quot;)/g, '"')
	            .replace(/(&#39;)/g, "'")
	            .replace(/(&amp;)/g, '&');
 console.log(str);
  var strs = str.split('');
  var tagFlag = 0;
  for(var i = 0; i < strs.length;i++){
  	console.log(strs[i]);
    
    if(strs[i] == "<"){
		tagFlag = 1;
    }
    if(tagFlag == 1 && strs[i] == ">"){
		alert("htmlタグが入力されました");
		tagFlag = 0;
		return false;
    }
  }



  // 0 < length <= 21
  if (0 === text.length || 21 <= text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }
   var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // Equivalence
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }
  return true;
}


// show todo
function showText() {
  var list = $("#list")
  list.children().remove();
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push("<p>" + value + "</p>");
    html.push("<input type=\"button\" onclick=\"removeText(" + i + ");\" value=\"↑このTodoを削除\" />");
  }
  list.append(html.join(''));
}

// remove todo
function removeText(lastItem){
  var key;
  if(lastItem == undefined){
    lastItem = localStorage.length - 1;
    key = localStorage.key(lastItem);
    localStorage.removeItem(key);
  }else{
    key = localStorage.key(lastItem);
    localStorage.removeItem(key);
    showText();
  }
}