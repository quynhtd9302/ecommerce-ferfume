package com.gmail.tdquynh09.ecommerce.dto.auth;

import com.gmail.tdquynh09.ecommerce.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
