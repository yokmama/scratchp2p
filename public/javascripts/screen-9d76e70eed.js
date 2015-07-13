$(function(){
  $("#serverType").val(selectType);
  updateView();
  })

function onSelectMode(){
  selectType = $('select').val();
  updateView();
}

function updateView(){
  if(selectType == "server"){
    $('#clientcontents').hide();
    $('#servercontents').show();
    if(serverRunning){
      $("#status").text("Runnning server");
    }else{
      $("#status").text("Stopped");
    }
  }else if(selectType == "client"){
    $('#clientcontents').show();
    $('#servercontents').hide();
    if(serverAddress.length>0){
      $("#status").text("Connecting "+serverAddress);
    }else{
      $("#status").text("Disconnected");
    }
  }else{
    $('#clientcontents').hide();
    $("#status").text("not set");
  }
}
