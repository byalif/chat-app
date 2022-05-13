package com.byalif.sms.messagingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.byalif.sms.messagingapp.model.Message;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class MessageController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@CrossOrigin
	@MessageMapping("/message") // /App/message
	@SendTo("/chatroom/public")
	private Message recievePublicMessage(@RequestBody Message message) {
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		return message;
	}

//	@CrossOrigin
//	@MessageMapping("/private-message")
//	public Message recievePrivateMessage(@Payload Message message) {
//		simpMessagingTemplate.convertAndSendToUser(message.getRecieverName(), "/private", message); // /user/${user}/private
//		return message;
//	}
}
