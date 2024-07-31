// package com.webbanhang.webbanhang.Restcontroller;

// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.webbanhang.webbanhang.Config.ClientDetail;
// import com.webbanhang.webbanhang.JWT.JwtTokenProvider;
// import java.util.Map;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatusCode;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;


// @RestController
// @RequestMapping("/api")
// public class AuthenticationRestControlle {
//     @Autowired private AuthenticationManager authenticationManager;
//     @Autowired private JwtTokenProvider jwtTokenProvider;
//     @Autowired private ClientDetail clientDetail;
//     @PostMapping("/authenticate")
//     public ResponseEntity<?> authenticate(@RequestBody Map<String,Object> usernameAndPassword) {
//         try {
//             Authentication  authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(usernameAndPassword.get("username").toString(), usernameAndPassword.get("password").toString());
// 			this.authenticationManager.authenticate(authenticationRequest);
           
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Wrong password or username");
//         }
//         UserDetails userDetail = clientDetail.loadUserByUsername(usernameAndPassword.get("username").toString());
//         String token = jwtTokenProvider.generateToken(userDetail);
//         return ResponseEntity.ok(token);
//     }
    
// }
