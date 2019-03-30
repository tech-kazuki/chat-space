$(document).on('turbolinks:load', function() {

var search_list = $('#user-search-result');

function appendUser(data) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ data.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ data.id }" data-user-name="${ data.name }">追加</a>
              </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }


  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    var
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(data) {
      $('#user-search-result').empty();
      if (data.length !== 0) {
        data.forEach(function(data) {
          appendUser(data);
        });
      }
      else {
        appendErrMsgToHTML('一致するユーザーはいません');
      }
    })
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    })
  })
});
