var express = require('express');
var url = require("url");
var router = express.Router();
var updateCounter = 0;
var values = new Object();
var selectType = "";
var serverAddress = "";
var serverRunning = false;
var client = require('socket.io-client');
var socket;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { selectType: selectType,
        serverAddress: serverAddress,
        serverRunning:serverRunning}
      );
});

router.post('/config', function(req, res, next) {
  console.log("in config");
  serverType = req.body.serverType;
  serverAddress = req.body.serverAddress;
  serverRunning = true;
  console.log(serverType);
  console.log(serverAddress);
  console.log(serverRunning);

  if(serverType == "server"){
    socket = client.connect('http://localhost:12345');

  }else if(serverType == "client"){
    socket = client.connect('http://'+serverAddress+":12345");
  }else{
    if(socket!=null){
      socket.close();
      socket = null;
    }
  }
  if(socket!=null) {
    socket.on("message", function (data) {
      console.log("in:" + data);
      updateCounter++;
      var json = JSON.parse(data);
      if (json.type == "value") {
        values[json.key] = json.value;
      } else if (json.type == "flag") {
        if (values[json.flag] != null) {
          var flag = values[json.flag];
          values[json.flag] = !flag;
        } else {
          values[json.flag] = true;
        }
        console.log("flag message:" + json.flag + "," + values[json.flag]);
      }
    });
  }

  res.redirect("/");
});

router.get('/poll', function(req, res, next) {
  poll(res);
});

router.get('/favicon.ico', function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.send('');
});

router.get('/reset_all', function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.send('');

  updateCounter = 0;
  //todo 自分のステータスを初期化するように相手サーバーに通知するべきかも

});

router.get('/*', function(req, res, next) {
  var pathname = url.parse(req.url).pathname;
  var cmd = pathname.replace("/", "");
  sendEmpty(res);

  console.log("cmd=" + cmd);
  sendMessage(cmd);
});



function poll(res){
  var str = "";
  for (var key in values) {
    str += key + " " + values[key] + "\n";
    if(typeof values[key] == "boolean"){
      values[key] = false;
    }
  }
  str += "counter "+updateCounter+"\r\n";

  //console.log("poll:"+str);

  res.setHeader("Content-Type", "text/html; charset=ISO-8859-1");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(str);
}

function sendEmpty(res){
  //console.log("sendEmpty:");

  res.setHeader("Content-Type", "text/html; charset=ISO-8859-1");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send('');
}


function sendMessage(path){
  console.log("out:"+path);
  if(socket!=null) {
    try {
      var cmds = path.split("/");
      //本当はこんな面倒なことしたくないけど、Scratchの拡張定義ファイルが出力と入力で同じ名前だと誤動作するので
      //設定系だけsetをつけることにした、そして１文字目を大文字にする場合があるので、それを小文字に変更する処理
      var key = cmds[0].replace("set", "");
      var p1 = key.charAt(0);
      key = p1.toLowerCase() + key.substring(1);

      if (cmds.length > 1) {
        //設定コマンド
        socket.send(JSON.stringify({
          type: "value",
          key: key,
          value: cmds[1]
        }));
      } else {
        //設定データがない場合は、トリガー型のイベントと判断する。
        socket.send(JSON.stringify({
          type: "flag",
          flag: key
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = router;
