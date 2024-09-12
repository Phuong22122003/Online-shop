// package com.webbanhang.webbanhang.Config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.messaging.simp.config.ChannelRegistration;
// import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// @Configuration
// @EnableWebSocketMessageBroker
// public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
//      @Override
//     public void configureMessageBroker(@SuppressWarnings("null") MessageBrokerRegistry registry){
//         registry.enableSimpleBroker("/queue");
//         registry.setApplicationDestinationPrefixes("/app");
//         registry.setUserDestinationPrefix("/user");
//     }
//     @Override 
//     public void registerStompEndpoints(@SuppressWarnings("null") StompEndpointRegistry registry){
//         registry
//         .addEndpoint("/notifications")
//         .setHandshakeHandler(new UserHandShake())   
//         .withSockJS();
//     }
// }
