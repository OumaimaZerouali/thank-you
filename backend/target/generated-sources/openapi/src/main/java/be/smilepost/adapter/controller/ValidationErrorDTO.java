package be.smilepost.adapter.controller;

import java.net.URI;
import java.util.Objects;
import be.smilepost.adapter.controller.ValidationErrorValidationErrorsInnerDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * ValidationErrorDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("validationError")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class ValidationErrorDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private Boolean success;

  private String error;

  @Valid
  private List<@Valid ValidationErrorValidationErrorsInnerDTO> validationErrors = new ArrayList<>();

  public ValidationErrorDTO success(Boolean success) {
    this.success = success;
    return this;
  }

  /**
   * Get success
   * @return success
  */
  @NotNull 
  @Schema(name = "success", example = "false", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("success")
  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public ValidationErrorDTO error(String error) {
    this.error = error;
    return this;
  }

  /**
   * Get error
   * @return error
  */
  @NotNull 
  @Schema(name = "error", example = "Validation failed", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("error")
  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public ValidationErrorDTO validationErrors(List<@Valid ValidationErrorValidationErrorsInnerDTO> validationErrors) {
    this.validationErrors = validationErrors;
    return this;
  }

  public ValidationErrorDTO addValidationErrorsItem(ValidationErrorValidationErrorsInnerDTO validationErrorsItem) {
    if (this.validationErrors == null) {
      this.validationErrors = new ArrayList<>();
    }
    this.validationErrors.add(validationErrorsItem);
    return this;
  }

  /**
   * Get validationErrors
   * @return validationErrors
  */
  @NotNull @Valid 
  @Schema(name = "validationErrors", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("validationErrors")
  public List<@Valid ValidationErrorValidationErrorsInnerDTO> getValidationErrors() {
    return validationErrors;
  }

  public void setValidationErrors(List<@Valid ValidationErrorValidationErrorsInnerDTO> validationErrors) {
    this.validationErrors = validationErrors;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ValidationErrorDTO validationError = (ValidationErrorDTO) o;
    return Objects.equals(this.success, validationError.success) &&
        Objects.equals(this.error, validationError.error) &&
        Objects.equals(this.validationErrors, validationError.validationErrors);
  }

  @Override
  public int hashCode() {
    return Objects.hash(success, error, validationErrors);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ValidationErrorDTO {\n");
    sb.append("    success: ").append(toIndentedString(success)).append("\n");
    sb.append("    error: ").append(toIndentedString(error)).append("\n");
    sb.append("    validationErrors: ").append(toIndentedString(validationErrors)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

