$(function(){
  function buildHTML(message){
    var html;

    var img_html;
    if(message.image.url == null){
      img_html = "";
    }
    else{
      img_html = `<img class="messages__message__whole__image" src="${message.image.url}"></img>`
    }

    html = `<div class="messages__message">
          <div class="messages__message__post">
            <div class="messages__message__post__user">
              ${message.name}
            </div>
            <div class="messages__message__post__time">
              ${message.date}
            </div>
          </div>
          <div class="messages__message__whole">
            <div class="messages__message__whole__text">
              ${message.content}
            </div>
            ${img_html}
          </div>
        </div>`

    return html;
  }
  
  $('.new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("form")[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました。");
    })
    .always(function(){
      $('input[name="commit"]').removeAttr("disabled");
    })
  })
})
