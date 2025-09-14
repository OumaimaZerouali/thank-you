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
 * CardUpdateDTO
 */
@lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor

@JsonTypeName("cardUpdate")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-09-11T14:14:54.364708+02:00[Europe/Brussels]")
public class CardUpdateDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private String id;

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

  public CardUpdateDTO id(String id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  @NotNull 
  @Schema(name = "id", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public CardUpdateDTO cardType(CardTypeDTO cardType) {
    this.cardType = cardType;
    return this;
  }

  /**
   * Get cardType
   * @return cardType
  */
  @Valid 
  @Schema(name = "cardType", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("cardType")
  public CardTypeDTO getCardType() {
    return cardType;
  }

  public void setCardType(CardTypeDTO cardType) {
    this.cardType = cardType;
  }

  public CardUpdateDTO recipientName(String recipientName) {
    this.recipientName = recipientName;
    return this;
  }

  /**
   * Get recipientName
   * @return recipientName
  */
  
  @Schema(name = "recipientName", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("recipientName")
  public String getRecipientName() {
    return recipientName;
  }

  public void setRecipientName(String recipientName) {
    this.recipientName = recipientName;
  }

  public CardUpdateDTO recipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
    return this;
  }

  /**
   * Get recipientEmail
   * @return recipientEmail
  */
  @jakarta.validation.constraints.Email 
  @Schema(name = "recipientEmail", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("recipientEmail")
  public String getRecipientEmail() {
    return recipientEmail;
  }

  public void setRecipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  public CardUpdateDTO senderName(String senderName) {
    this.senderName = senderName;
    return this;
  }

  /**
   * Get senderName
   * @return senderName
  */
  
  @Schema(name = "senderName", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("senderName")
  public String getSenderName() {
    return senderName;
  }

  public void setSenderName(String senderName) {
    this.senderName = senderName;
  }

  public CardUpdateDTO message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
  */
  
  @Schema(name = "message", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("message")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public CardUpdateDTO backgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
  }

  /**
   * Get backgroundColor
   * @return backgroundColor
  */
  
  @Schema(name = "backgroundColor", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("backgroundColor")
  public String getBackgroundColor() {
    return backgroundColor;
  }

  public void setBackgroundColor(String backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  public CardUpdateDTO textColor(String textColor) {
    this.textColor = textColor;
    return this;
  }

  /**
   * Get textColor
   * @return textColor
  */
  
  @Schema(name = "textColor", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("textColor")
  public String getTextColor() {
    return textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

  public CardUpdateDTO borderColor(String borderColor) {
    this.borderColor = borderColor;
    return this;
  }

  /**
   * Get borderColor
   * @return borderColor
  */
  
  @Schema(name = "borderColor", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("borderColor")
  public String getBorderColor() {
    return borderColor;
  }

  public void setBorderColor(String borderColor) {
    this.borderColor = borderColor;
  }

  public CardUpdateDTO fontFamily(FontFamilyDTO fontFamily) {
    this.fontFamily = fontFamily;
    return this;
  }

  /**
   * Get fontFamily
   * @return fontFamily
  */
  @Valid 
  @Schema(name = "fontFamily", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("fontFamily")
  public FontFamilyDTO getFontFamily() {
    return fontFamily;
  }

  public void setFontFamily(FontFamilyDTO fontFamily) {
    this.fontFamily = fontFamily;
  }

  public CardUpdateDTO fontSize(FontSizeDTO fontSize) {
    this.fontSize = fontSize;
    return this;
  }

  /**
   * Get fontSize
   * @return fontSize
  */
  @Valid 
  @Schema(name = "fontSize", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("fontSize")
  public FontSizeDTO getFontSize() {
    return fontSize;
  }

  public void setFontSize(FontSizeDTO fontSize) {
    this.fontSize = fontSize;
  }

  public CardUpdateDTO pattern(PatternTypeDTO pattern) {
    this.pattern = pattern;
    return this;
  }

  /**
   * Get pattern
   * @return pattern
  */
  @Valid 
  @Schema(name = "pattern", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("pattern")
  public PatternTypeDTO getPattern() {
    return pattern;
  }

  public void setPattern(PatternTypeDTO pattern) {
    this.pattern = pattern;
  }

  public CardUpdateDTO imageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
  */
  @Valid 
  @Schema(name = "imageUrl", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("imageUrl")
  public URI getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(URI imageUrl) {
    this.imageUrl = imageUrl;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CardUpdateDTO cardUpdate = (CardUpdateDTO) o;
    return Objects.equals(this.id, cardUpdate.id) &&
        Objects.equals(this.cardType, cardUpdate.cardType) &&
        Objects.equals(this.recipientName, cardUpdate.recipientName) &&
        Objects.equals(this.recipientEmail, cardUpdate.recipientEmail) &&
        Objects.equals(this.senderName, cardUpdate.senderName) &&
        Objects.equals(this.message, cardUpdate.message) &&
        Objects.equals(this.backgroundColor, cardUpdate.backgroundColor) &&
        Objects.equals(this.textColor, cardUpdate.textColor) &&
        Objects.equals(this.borderColor, cardUpdate.borderColor) &&
        Objects.equals(this.fontFamily, cardUpdate.fontFamily) &&
        Objects.equals(this.fontSize, cardUpdate.fontSize) &&
        Objects.equals(this.pattern, cardUpdate.pattern) &&
        Objects.equals(this.imageUrl, cardUpdate.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, cardType, recipientName, recipientEmail, senderName, message, backgroundColor, textColor, borderColor, fontFamily, fontSize, pattern, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CardUpdateDTO {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
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

