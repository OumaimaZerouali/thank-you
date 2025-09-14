package be.smilepost.adapter.controller;

import java.net.URI;
import java.util.Objects;
import be.smilepost.adapter.controller.CardDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * EmailRequestDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("emailRequest")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class EmailRequestDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private String to;

  private String subject;

  private String html;

  private CardDTO cardData;

  public EmailRequestDTO to(String to) {
    this.to = to;
    return this;
  }

  /**
   * Recipient email address
   * @return to
  */
  @NotNull @jakarta.validation.constraints.Email 
  @Schema(name = "to", example = "recipient@example.com", description = "Recipient email address", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("to")
  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    this.to = to;
  }

  public EmailRequestDTO subject(String subject) {
    this.subject = subject;
    return this;
  }

  /**
   * Email subject
   * @return subject
  */
  @NotNull 
  @Schema(name = "subject", example = "Thank You from Jane Smith", description = "Email subject", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("subject")
  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public EmailRequestDTO html(String html) {
    this.html = html;
    return this;
  }

  /**
   * HTML content of the email
   * @return html
  */
  @NotNull 
  @Schema(name = "html", description = "HTML content of the email", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("html")
  public String getHtml() {
    return html;
  }

  public void setHtml(String html) {
    this.html = html;
  }

  public EmailRequestDTO cardData(CardDTO cardData) {
    this.cardData = cardData;
    return this;
  }

  /**
   * Get cardData
   * @return cardData
  */
  @NotNull @Valid 
  @Schema(name = "cardData", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cardData")
  public CardDTO getCardData() {
    return cardData;
  }

  public void setCardData(CardDTO cardData) {
    this.cardData = cardData;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    EmailRequestDTO emailRequest = (EmailRequestDTO) o;
    return Objects.equals(this.to, emailRequest.to) &&
        Objects.equals(this.subject, emailRequest.subject) &&
        Objects.equals(this.html, emailRequest.html) &&
        Objects.equals(this.cardData, emailRequest.cardData);
  }

  @Override
  public int hashCode() {
    return Objects.hash(to, subject, html, cardData);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class EmailRequestDTO {\n");
    sb.append("    to: ").append(toIndentedString(to)).append("\n");
    sb.append("    subject: ").append(toIndentedString(subject)).append("\n");
    sb.append("    html: ").append(toIndentedString(html)).append("\n");
    sb.append("    cardData: ").append(toIndentedString(cardData)).append("\n");
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

