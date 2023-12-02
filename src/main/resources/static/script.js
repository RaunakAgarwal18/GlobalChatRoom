var stompClient = null
function connect(){
    let socket = new SockJS("/server1")
    stompClient = Stomp.over(socket);
    stompClient.connect({},function (frame){
        console.log("connected : "+frame)
        $("#name-form").addClass('d-none')
        $("#chat-room").removeClass('d-none')
        stompClient.subscribe("/topic/return-to",function (response){
            showMessage(JSON.parse(response.body))
        })
    })
}
function showMessage(message){
    $("#message-container").prepend(`<tr><td><b>${message.name} : </b>${message.content}</td></tr>`)
}
function sendMessage(){
    let jsonOb = {
        name : localStorage.getItem('name'),
        content:$("#message-value").val()
    }
    stompClient.send("/app/message",{},JSON.stringify(jsonOb))
}
$(document).ready(function () {
    $("#login").click(() => {
        let name = $("#name-value").val()
        if(name.length == 0){
            $("#empty-name").removeClass('d-none')
        }else {
            localStorage.setItem("name", name)
            $("#name-title").text(name+"'s ChatRoom")
            $("#empty-name").addClass('d-none')
            connect()
        }
    })
    $("#send").click(() => {
        sendMessage()
    })
    $("#logout").click(() => {
        localStorage.removeItem("name")
        if(stompClient!==null){
            stompClient.disconnect()
            $("#name-form").removeClass('d-none')
            $("#chat-room").addClass('d-none')
        }
    })
})