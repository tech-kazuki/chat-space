$(document).on('turbolinks:load', function() {

var search_list = $('#user-search-result');

function appendUser(data) {
  var html = `<div id="chat-group-user-new" class="chat-group-user clearfix">
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

var add_member = $('#chat-group-users');

function addGroupUserHTML(data) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                            <input name='group[user_ids][]' type='hidden' value='${ data.userId }'>
                              <p class='chat-group-user__name'>${ data.userName }</p>
                              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                        </div>`;
    add_member.append(html)
}

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
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
  });

  $(document).on('click', '.user-search-add', function() {
    userData = $(this).data();
    addGroupUserHTML(userData);
    $('#chat-group-user-new').remove();
  });

  $(document).on('click', '.js-chat-member', function() {
    $(this).remove();
  });
});
