$(function(){ 
  function buildHTML(message){
  image = ( message.image ) ? '<img class= "lower-message__image" src=${message.image} >' : "";
  let html =
    `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
              ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
              ${message.content}
          </p>
        </div>
        <img src=${message.image} >
    </div>`
  return html;
} 
$('#new_message').on('submit', function(e){
  e.preventDefault();
  let formData = new FormData(this);
  let url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
     .done(function(data){
      var html = buildHTML(data);
      $('.chat_body').append(html);
      $('.chat_body').animate({scrollTop: $('.chat_body')[0].scrollHeight}, 'fast');       
      $('form')[0].reset();       
     })
     .fail(function(){
        alert('error');
      });
      return false;
    });
});