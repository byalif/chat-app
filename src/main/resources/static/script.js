var stompClient = null;

function connect() {
  let socket = new SockJS("/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    console.log("Connected :" + frame);
    $("#name-form").addClass("d-none");
    $("#chat-room").removeClass("d-none");
    stompClient.subscribe("/chatroom/public", (res) => {
      showMessage(JSON.parse(res.body));
    });
  });
}

function sendMessage() {
  let ob = {
    name: localStorage.getItem("name"),
    content: $("#message-value").val(),
  };

  stompClient.send("/app/message", {}, JSON.stringify(ob));
  setTimeout(() => {
    $("#message-value").val("");
  }, 1000);
}

function showMessage(message) {
  $("#message-container-table").prepend(
    `<tr><td><b>${message.name} :</b> ${message.content}<td><tr>`
  );
}

$(document).ready((e) => {
  $("#login").click(() => {
    let name = $(`#name-value`).val();
    localStorage.setItem("name", name);
    connect();
    $("#name").html(
      `<span style="font-weight: lighter;">Welcome , </span>  ${name}`
    );
  });

  $("#send-btn").click(() => {
    sendMessage();
  });

  $("#logout").click(() => {
    localStorage.removeItem("name");
    if (stompClient != null) {
      stompClient.disconnect();
      $("#name-form").removeClass("d-none");
      $("#chat-room").addClass("d-none");
      $("#name-value").val("");
    }
  });
});
