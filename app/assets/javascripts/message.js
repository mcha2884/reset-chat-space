$(function(){
  //メッセージ送信の非同期はこの下の記述
  function buildHTML(message){
    let content = message.content ? `${ message.content }` : "";
    let img  = message.image ? `<img class="lower-message__image" src="${ message.image }">` : "";
      let html =
       `<div class = "message" data-message-id = ${ message.id }>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-message__date">
              ${ message.created_at }
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${ content }
            </p>
          </div>
          ${ img }
        </div>`
      return html;
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);   
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
  //自動更新機能はこの下の記述
  var reloadMessages = function() {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message:last').data('message-id');
      
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});