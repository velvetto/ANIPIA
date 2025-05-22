package com.anipia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String jmeno;
    private String prijmeni;
}
