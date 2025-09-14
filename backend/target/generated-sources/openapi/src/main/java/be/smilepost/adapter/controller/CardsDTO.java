package be.smilepost.adapter.controller;

import java.net.URI;
import java.util.Objects;
import be.smilepost.adapter.controller.CardDTO;
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
 * CardsDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("cards")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class CardsDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private Boolean success;

  @Valid
  private List<@Valid CardDTO> data;

  private Integer total;

  public CardsDTO success(Boolean success) {
    this.success = success;
    return this;
  }

  /**
   * Get success
   * @return success
  */
  
  @Schema(name = "success", example = "true", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("success")
  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public CardsDTO data(List<@Valid CardDTO> data) {
    this.data = data;
    return this;
  }

  public CardsDTO addDataItem(CardDTO dataItem) {
    if (this.data == null) {
      this.data = new ArrayList<>();
    }
    this.data.add(dataItem);
    return this;
  }

  /**
   * Get data
   * @return data
  */
  @Valid 
  @Schema(name = "data", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("data")
  public List<@Valid CardDTO> getData() {
    return data;
  }

  public void setData(List<@Valid CardDTO> data) {
    this.data = data;
  }

  public CardsDTO total(Integer total) {
    this.total = total;
    return this;
  }

  /**
   * Total number of cards
   * @return total
  */
  
  @Schema(name = "total", description = "Total number of cards", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("total")
  public Integer getTotal() {
    return total;
  }

  public void setTotal(Integer total) {
    this.total = total;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CardsDTO cards = (CardsDTO) o;
    return Objects.equals(this.success, cards.success) &&
        Objects.equals(this.data, cards.data) &&
        Objects.equals(this.total, cards.total);
  }

  @Override
  public int hashCode() {
    return Objects.hash(success, data, total);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CardsDTO {\n");
    sb.append("    success: ").append(toIndentedString(success)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
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

