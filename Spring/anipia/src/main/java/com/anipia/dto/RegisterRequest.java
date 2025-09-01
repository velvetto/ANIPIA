package com.anipia.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String jmeno;
    private String prijmeni;
    private String telefon;
    private String email;
    private String heslo;
}
