// package com.webbanhang.webbanhang.JWT;

// import java.util.Date;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.MalformedJwtException;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.UnsupportedJwtException;

// @Component
// public class JwtTokenProvider {
//     //Sẽ lấy trong properties
//     private final String key = "phuong";
//     private final long experation = 604800000L;

//     public String generateToken(UserDetails userDetails){
//         Date now = new Date();
//         Date experationDate = new Date(now.getTime() + experation);
//         return Jwts.builder()
//                 .setSubject(userDetails.getUsername())
//                 .setIssuedAt(now)
//                 .setExpiration(experationDate)
//                 .signWith(SignatureAlgorithm.HS512, key)
//                 .compact();
//     }
//     public String getUserNameFromJwt(String token){
//         Claims claims = Jwts.parser()
//                             .setSigningKey(key)
//                             .parseClaimsJws(token)
//                             .getBody();
//         return claims.getSubject();
//     }

//     public Boolean validateToken(String token){
//         try{
//             Jwts.parser().setSigningKey(key).parseClaimsJws(token);
//             return true;
//         }
//         catch (MalformedJwtException ex) {
//            System.out.println("Invalid JWT token");
//         } catch (ExpiredJwtException ex) {
//           System.out.println("Expired JWT token");
//         } catch (UnsupportedJwtException ex) {
//             System.out.println("Unsupported JWT token");
//         } catch (IllegalArgumentException ex) {
//             System.out.println("JWT claims string is empty.");
//         }
//         return false;
//     }
// }
