$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var html = `<div class="message">
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
                  </div>
                </div>`
    return html;
  }
  function scroll() {
    var height = $('.messages')[0].scrollHeight;
    $('.messages').animate({scrollTop: height});
  }
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
      $('.messages').append(html)
      $('.form__message').val('')
      console.log('.message');
      scroll()
    })
    .fail(function() {
      alert('メッセージを入力してください')
    })
    .always(function() {
      $('.form__submit').removeAttr('disabled');
    })
  });
});
