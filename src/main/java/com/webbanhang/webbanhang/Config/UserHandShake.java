// package com.webbanhang.webbanhang.Config;
// import jakarta.servlet.http.HttpSession;
// import java.security.Principal;
// import java.util.Map;
// import org.springframework.http.server.ServerHttpRequest;
// import org.springframework.http.server.ServletServerHttpRequest;
// import org.springframework.web.socket.WebSocketHandler;
// import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

// public class UserHandShake extends DefaultHandshakeHandler{
//     @Override
//     protected Principal determineUser(ServerHttpRequest request,WebSocketHandler wsHandler,Map<String, Object> attributes){
//         if (request instanceof ServletServerHttpRequest) {
//             ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
//             HttpSession session = servletRequest.getServletRequest().getSession();
//             if(session.getAttribute("clientId")!=null)
//                 return new User(session.getAttribute("clientId").toString());
//         }   
//         return null;
//     }
// }