$(function () {
  if (document.URL.match(/groups/)) {
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });

    function buildHTML(message) {
      var html;

      var img_html;
      img_html = ((message.image.url == null) 
                 ? "" 
                 : `<img class="messages__message__whole__image" src="${message.image.url}"></img>`
                 );

      html = `<div class="messages__message", data-id=${message.id}>
          <div class="messages__message__post">
            <div class="messages__message__post__user">
              ${message.user_name}
            </div>
            <div class="messages__message__post__time">
              ${message.created_at}
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
    };

    function eachMessageHTML(insertHTML, messages) {
      
      $.each(messages, function (index, message) {
        insertHTML = insertHTML + buildHTML(message);
      });
      return insertHTML;
    };

    $('.new_message').on('submit', function (e) {
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
        .done(function (message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
          $("form")[0].reset();
        })
        .fail(function () {
          alert("メッセージ送信に失敗しました。");
        })
        .always(function () {
          $('input[name="commit"]').removeAttr("disabled");
        });
    });

    var reloadMessages = function () {
      last_message_id = $(".messages__message:last").data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = '';
          insertHTML = eachMessageHTML(insertHTML, messages);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        })
        .fail(function () {
          alert("メッセージ受信に失敗しました。");
        });
    };
    setInterval(reloadMessages, 5000);
  };
});
