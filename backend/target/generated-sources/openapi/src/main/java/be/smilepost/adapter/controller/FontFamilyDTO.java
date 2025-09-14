package be.smilepost.adapter.controller;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Gets or Sets fontFamily
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public enum FontFamilyDTO {
  
  ARIAL("Arial"),
  
  GEORGIA("Georgia"),
  
  TIMES_NEW_ROMAN("Times New Roman"),
  
  HELVETICA("Helvetica"),
  
  COMIC_SANS_MS("Comic Sans MS"),
  
  COURIER_NEW("Courier New"),
  
  VERDANA("Verdana");

  private String value;

  FontFamilyDTO(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static FontFamilyDTO fromValue(String value) {
    for (FontFamilyDTO b : FontFamilyDTO.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}

