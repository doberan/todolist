$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });
}
// save function
function saveText() {
  var text = $("#formText");
  var time = new Date();
  console.log(text.val);

  //escapeText
  var val = escapeText(text.val());
  console.log(val);

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
  // 文字数が0または20以上は不可
  if (0 === text.length || 21 <= text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }
   var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }
  return true;
}



function showText() {
  var list = $("#list")
  list.children().remove();
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push("<p>" + value + "</p>");
  }
  list.append(html.join(''));
}