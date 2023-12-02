package com.chat.chatroom.controllers;

import com.chat.chatroom.Models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageControl {
    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(@RequestBody Message message){
        try {
            //adding a delay
            Thread.sleep(500);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
        return message;
    }
}
