/*
saveurl:"http://wikify.antimatter15.com/server/save",
loadurl:"http://wikify.antimatter15.com/server/load",
*/

function wk_send_data(url, params, callback){
  var id = "wk_xfnx"+Math.floor(Math.random()*12345)

  var form = $("<form>")
    .addClass(id)
    .attr({
      action: url,
      target: id,
      method: "POST"
    })
    .appendTo("body")
    .append($("<iframe>")
      .attr('name',id)
      .load(function(){
        callback()
        setTimeout(function(){
          form.remove()
        },5000)
      }))
    
  $.each(params,function(key,value){
    $("<input>")
      .attr({
        type: "hidden",
        name: key
      })
      .val(value)
      .appendTo(form)
  })
  form.submit();
}


function wk_get_data(url, params, callback){
  $.get(url, params, callback, "jsonp"); //thx jQuery!
}