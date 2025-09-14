package be.smilepost.adapter.controller;

import java.net.URI;
import java.util.Objects;
import be.smilepost.adapter.controller.CardTypeDTO;
import be.smilepost.adapter.controller.FontFamilyDTO;
import be.smilepost.adapter.controller.FontSizeDTO;
import be.smilepost.adapter.controller.PatternTypeDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import java.net.URI;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * CardDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("card")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class CardDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private CardTypeDTO cardType;

  private String recipientName;

  private String recipientEmail;

  private String senderName;

  private String message;

  private String backgroundColor;

  private String textColor;

  private String borderColor;

  private FontFamilyDTO fontFamily;

  private FontSizeDTO fontSize;

  private PatternTypeDTO pattern;

  private URI imageUrl;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime createdAt;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private LocalDateTime updatedAt;

  private Boolean isSent;

  public CardDTO cardType(CardTypeDTO cardType) {
    this.cardType = cardType;
    return this;
  }

  /**
   * Get cardType
   * @return cardType
  */
  @NotNull @Valid 
  @Schema(name = "cardType", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cardType")
  public CardTypeDTO getCardType() {
    return cardType;
  }

  public void setCardType(CardTypeDTO cardType) {
    this.cardType = cardType;
  }

  public CardDTO recipientName(String recipientName) {
    this.recipientName = recipientName;
    return this;
  }

  /**
   * Name of the card recipient
   * @return recipientName
  */
  @NotNull 
  @Schema(name = "recipientName", example = "John Doe", description = "Name of the card recipient", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("recipientName")
  public String getRecipientName() {
    return recipientName;
  }

  public void setRecipientName(String recipientName) {
    this.recipientName = recipientName;
  }

  public CardDTO recipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
    return this;
  }

  /**
   * Email address of the recipient
   * @return recipientEmail
  */
  @NotNull @jakarta.validation.constraints.Email 
  @Schema(name = "recipientEmail", example = "john.doe@example.com", description = "Email address of the recipient", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("recipientEmail")
  public String getRecipientEmail() {
    return recipientEmail;
  }

  public void setRecipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  public CardDTO senderName(String senderName) {
    this.senderName = senderName;
    return this;
  }

  /**
   * Name of the card sender
   * @return senderName
  */
  @NotNull 
  @Schema(name = "senderName", example = "Jane Smith", description = "Name of the card sender", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("senderName")
  public String getSenderName() {
    return senderName;
  }

  public void setSenderName(String senderName) {
    this.senderName = senderName;
  }

  public CardDTO message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Message content of the card
   * @return message
  */
  @NotNull 
  @Schema(name = "message", example = "Thank you for your help with the project!", description = "Message content of the card", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("message")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public CardDTO backgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
  }

  /**
   * Background color of the card (hex color)
   * @return backgroundColor
  */
  @NotNull 
  @Schema(name = "backgroundColor", description = "Background color of the card (hex color)", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("backgroundColor")
  public String getBackgroundColor() {
    return backgroundColor;
  }

  public void setBackgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  public CardDTO textColor(String textColor) {
    this.textColor = textColor;
    return this;
  }

  /**
   * Text color of the card (hex color)
   * @return textColor
  */
  @NotNull 
  @Schema(name = "textColor", description = "Text color of the card (hex color)", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("textColor")
  public String getTextColor() {
    return textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

  public CardDTO borderColor(String borderColor) {
    this.borderColor = borderColor;
    return this;
  }

  /**
   * Border color of the card (hex color)
   * @return borderColor
  */
  @NotNull 
  @Schema(name = "borderColor", description = "Border color of the card (hex color)", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("borderColor")
  public String getBorderColor() {
    return borderColor;
  }

  public void setBorderColor(String borderColor) {
    this.borderColor = borderColor;
  }

  public CardDTO fontFamily(FontFamilyDTO fontFamily) {
    this.fontFamily = fontFamily;
    return this;
  }

  /**
   * Get fontFamily
   * @return fontFamily
  */
  @NotNull @Valid 
  @Schema(name = "fontFamily", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("fontFamily")
  public FontFamilyDTO getFontFamily() {
    return fontFamily;
  }

  public void setFontFamily(FontFamilyDTO fontFamily) {
    this.fontFamily = fontFamily;
  }

  public CardDTO fontSize(FontSizeDTO fontSize) {
    this.fontSize = fontSize;
    return this;
  }

  /**
   * Get fontSize
   * @return fontSize
  */
  @NotNull @Valid 
  @Schema(name = "fontSize", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("fontSize")
  public FontSizeDTO getFontSize() {
    return fontSize;
  }

  public void setFontSize(FontSizeDTO fontSize) {
    this.fontSize = fontSize;
  }

  public CardDTO pattern(PatternTypeDTO pattern) {
    this.pattern = pattern;
    return this;
  }

  /**
   * Get pattern
   * @return pattern
  */
  @NotNull @Valid 
  @Schema(name = "pattern", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("pattern")
  public PatternTypeDTO getPattern() {
    return pattern;
  }

  public void setPattern(PatternTypeDTO pattern) {
    this.pattern = pattern;
  }

  public CardDTO imageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * URL of an optional image for the card
   * @return imageUrl
  */
  @Valid 
  @Schema(name = "imageUrl", example = "https://example.com/images/card-image.jpg", description = "URL of an optional image for the card", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("imageUrl")
  public URI getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
  }

  public CardDTO createdAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Timestamp when the card was created
   * @return createdAt
  */
  @NotNull @Valid 
  @Schema(name = "createdAt", example = "2023-09-05T10:30Z", description = "Timestamp when the card was created", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("createdAt")
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public CardDTO updatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Timestamp when the card was last updated
   * @return updatedAt
  */
  @NotNull @Valid 
  @Schema(name = "updatedAt", example = "2023-09-05T10:30Z", description = "Timestamp when the card was last updated", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("updatedAt")
  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public CardDTO isSent(Boolean isSent) {
    this.isSent = isSent;
    return this;
  }

  /**
   * Whether the card has been sent via email
   * @return isSent
  */
  @NotNull 
  @Schema(name = "isSent", example = "false", description = "Whether the card has been sent via email", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("isSent")
  public Boolean getIsSent() {
    return isSent;
  }

  public void setIsSent(Boolean isSent) {
    this.isSent = isSent;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CardDTO card = (CardDTO) o;
    return Objects.equals(this.cardType, card.cardType) &&
        Objects.equals(this.recipientName, card.recipientName) &&
        Objects.equals(this.recipientEmail, card.recipientEmail) &&
        Objects.equals(this.senderName, card.senderName) &&
        Objects.equals(this.message, card.message) &&
        Objects.equals(this.backgroundColor, card.backgroundColor) &&
        Objects.equals(this.textColor, card.textColor) &&
        Objects.equals(this.borderColor, card.borderColor) &&
        Objects.equals(this.fontFamily, card.fontFamily) &&
        Objects.equals(this.fontSize, card.fontSize) &&
        Objects.equals(this.pattern, card.pattern) &&
        Objects.equals(this.imageUrl, card.imageUrl) &&
        Objects.equals(this.createdAt, card.createdAt) &&
        Objects.equals(this.updatedAt, card.updatedAt) &&
        Objects.equals(this.isSent, card.isSent);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cardType, recipientName, recipientEmail, senderName, message, backgroundColor, textColor, borderColor, fontFamily, fontSize, pattern, imageUrl, createdAt, updatedAt, isSent);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CardDTO {\n");
    sb.append("    cardType: ").append(toIndentedString(cardType)).append("\n");
    sb.append("    recipientName: ").append(toIndentedString(recipientName)).append("\n");
    sb.append("    recipientEmail: ").append(toIndentedString(recipientEmail)).append("\n");
    sb.append("    senderName: ").append(toIndentedString(senderName)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    backgroundColor: ").append(toIndentedString(backgroundColor)).append("\n");
    sb.append("    textColor: ").append(toIndentedString(textColor)).append("\n");
    sb.append("    borderColor: ").append(toIndentedString(borderColor)).append("\n");
    sb.append("    fontFamily: ").append(toIndentedString(fontFamily)).append("\n");
    sb.append("    fontSize: ").append(toIndentedString(fontSize)).append("\n");
    sb.append("    pattern: ").append(toIndentedString(pattern)).append("\n");
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
    sb.append("    createdAt: ").append(toIndentedString(createdAt)).append("\n");
    sb.append("    updatedAt: ").append(toIndentedString(updatedAt)).append("\n");
    sb.append("    isSent: ").append(toIndentedString(isSent)).append("\n");
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

