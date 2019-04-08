$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = (message.image) ? `<img class="message__lower__image" src="${ message.image }">`: "";

    var html = `<div class="message", data-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                    ${message.time}
                    </div>
                  </div>
                  <div class="message__lower">
                    <p class="message__lower__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  function scroll() {
    var height = $('.messages')[0].scrollHeight;
    $('.messages').animate({scrollTop: height}, 'fast');
  }

  $('#new_message').off('submit');
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scroll()
    })
    .fail(function() {
      alert('メッセージを入力してください')
    })
    .always(function() {
      $('.form__submit').removeAttr('disabled');
    })
  });

  $(function() {
    setInterval(reloadMessages, 5000);
  });

  function reloadMessages() {
      var message_id = $('.message:last').data('id') || 0;
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { message: { id: message_id } },
      dataType: 'json'
    })
    .always(function(data){
      data.forEach(function(data){
        var insertHtml = buildHTML(data);
        $('.messages').append(insertHtml);
        scroll()
      });
    });
  }
});
