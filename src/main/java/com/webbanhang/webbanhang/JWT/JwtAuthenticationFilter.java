// package com.webbanhang.webbanhang.JWT;

// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContext;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.webbanhang.webbanhang.Config.ClientDetail;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter{
//     @Autowired private JwtTokenProvider jwtTokenProvider;
//     @Autowired private ClientDetail clientDetail;
//     /*
//      * Kiểm tra xem jwt có hợp lệ hay không nếu có thì sẽ cho request đó đến được controller và lấy được dữ liệu
//      * Không lưu session nên lần sau vẫn phải dùng jwt để gửi tới nữa
//      */
//     @Override 
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException,IOException{
//         if(!checkAuthenticationRequest(request))
//         try{
//             String jwt = getJwtFromRequest(request);
//             if(jwtTokenProvider.validateToken(jwt)){
//                 String username = jwtTokenProvider.getUserNameFromJwt(jwt);
//                 UserDetails userDetail = clientDetail.loadUserByUsername(username);
//                 if(userDetail != null){
//                     UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null,userDetail.getAuthorities());
//                     authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                     SecurityContextHolder.getContext().setAuthentication(authentication);
//                 }
//             }
//         }
//         catch(Exception ex){

//         }
//         filterChain.doFilter(request, response);
//     }
//     private boolean checkAuthenticationRequest(HttpServletRequest request){
//         SecurityContext context = SecurityContextHolder.getContext();
//         if(context.getAuthentication()!= null)
//             return context.getAuthentication().isAuthenticated();
//         return false;
//     }
//     private String getJwtFromRequest(HttpServletRequest request){
//         String token = request.getHeader("Authorization");
//         if(token !=null && token.startsWith("Bearer ")){
//             return token.substring(7);
//         }
//         return null;
//     }
// }
