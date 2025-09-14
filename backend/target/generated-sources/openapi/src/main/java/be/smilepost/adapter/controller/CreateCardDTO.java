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
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * CreateCardDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("createCard")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class CreateCardDTO implements Serializable {

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

  private Boolean isSent;

  public CreateCardDTO cardType(CardTypeDTO cardType) {
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

  public CreateCardDTO recipientName(String recipientName) {
    this.recipientName = recipientName;
    return this;
  }

  /**
   * Get recipientName
   * @return recipientName
  */
  @NotNull 
  @Schema(name = "recipientName", example = "John Doe", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("recipientName")
  public String getRecipientName() {
    return recipientName;
  }

  public void setRecipientName(String recipientName) {
    this.recipientName = recipientName;
  }

  public CreateCardDTO recipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
    return this;
  }

  /**
   * Get recipientEmail
   * @return recipientEmail
  */
  @NotNull @jakarta.validation.constraints.Email 
  @Schema(name = "recipientEmail", example = "john.doe@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("recipientEmail")
  public String getRecipientEmail() {
    return recipientEmail;
  }

  public void setRecipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  public CreateCardDTO senderName(String senderName) {
    this.senderName = senderName;
    return this;
  }

  /**
   * Get senderName
   * @return senderName
  */
  @NotNull 
  @Schema(name = "senderName", example = "Jane Smith", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("senderName")
  public String getSenderName() {
    return senderName;
  }

  public void setSenderName(String senderName) {
    this.senderName = senderName;
  }

  public CreateCardDTO message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
  */
  @NotNull 
  @Schema(name = "message", example = "Thank you for your help with the project!", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("message")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public CreateCardDTO backgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
  }

  /**
   * Get backgroundColor
   * @return backgroundColor
  */
  @NotNull 
  @Schema(name = "backgroundColor", example = "#ffffff", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("backgroundColor")
  public String getBackgroundColor() {
    return backgroundColor;
  }

  public void setBackgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  public CreateCardDTO textColor(String textColor) {
    this.textColor = textColor;
    return this;
  }

  /**
   * Get textColor
   * @return textColor
  */
  @NotNull 
  @Schema(name = "textColor", example = "#333333", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("textColor")
  public String getTextColor() {
    return textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

  public CreateCardDTO borderColor(String borderColor) {
    this.borderColor = borderColor;
    return this;
  }

  /**
   * Get borderColor
   * @return borderColor
  */
  @NotNull 
  @Schema(name = "borderColor", example = "#e91e63", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("borderColor")
  public String getBorderColor() {
    return borderColor;
  }

  public void setBorderColor(String borderColor) {
    this.borderColor = borderColor;
  }

  public CreateCardDTO fontFamily(FontFamilyDTO fontFamily) {
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

  public CreateCardDTO fontSize(FontSizeDTO fontSize) {
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

  public CreateCardDTO pattern(PatternTypeDTO pattern) {
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

  public CreateCardDTO imageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
  */
  @Valid 
  @Schema(name = "imageUrl", example = "https://example.com/images/card-image.jpg", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("imageUrl")
  public URI getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
  }

  public CreateCardDTO isSent(Boolean isSent) {
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
    CreateCardDTO createCard = (CreateCardDTO) o;
    return Objects.equals(this.cardType, createCard.cardType) &&
        Objects.equals(this.recipientName, createCard.recipientName) &&
        Objects.equals(this.recipientEmail, createCard.recipientEmail) &&
        Objects.equals(this.senderName, createCard.senderName) &&
        Objects.equals(this.message, createCard.message) &&
        Objects.equals(this.backgroundColor, createCard.backgroundColor) &&
        Objects.equals(this.textColor, createCard.textColor) &&
        Objects.equals(this.borderColor, createCard.borderColor) &&
        Objects.equals(this.fontFamily, createCard.fontFamily) &&
        Objects.equals(this.fontSize, createCard.fontSize) &&
        Objects.equals(this.pattern, createCard.pattern) &&
        Objects.equals(this.imageUrl, createCard.imageUrl) &&
        Objects.equals(this.isSent, createCard.isSent);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cardType, recipientName, recipientEmail, senderName, message, backgroundColor, textColor, borderColor, fontFamily, fontSize, pattern, imageUrl, isSent);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateCardDTO {\n");
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

