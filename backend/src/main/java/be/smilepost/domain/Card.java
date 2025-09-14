package be.smilepost.domain;

import be.smilepost.common.*;
import be.smilepost.domain.request.CreateCardRequest;
import be.smilepost.domain.request.UpdateCardRequest;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class Card {
  private UUID id;
  private User user;
  private String message;
  private String pattern;
  private Boolean isSent;
  private String fontSize;
  private String cardType;
  private String imageUrl;
  private String textColor;
  private String fontFamily;
  private String senderName;
  private String borderColor;
  private String recipientName;
  private String recipientEmail;
  private String backgroundColor;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public Card(CreateCardRequest createCardRequest) {
    this.user = createCardRequest.user();
    this.isSent = createCardRequest.sent();
    this.message = createCardRequest.message();
    this.pattern = createCardRequest.pattern();
    this.fontSize = createCardRequest.fontSize();
    this.cardType = createCardRequest.cardType();
    this.imageUrl = createCardRequest.imageUrl();
    this.createdAt = createCardRequest.createdAt();
    this.updatedAt = createCardRequest.updatedAt();
    this.textColor = createCardRequest.textColor();
    this.fontFamily = createCardRequest.fontFamily();
    this.senderName = createCardRequest.senderName();
    this.borderColor = createCardRequest.borderColor();
    this.recipientName = createCardRequest.recipientName();
    this.recipientEmail = createCardRequest.recipientEmail();
    this.backgroundColor = createCardRequest.backgroundColor();
  }

  public Notification update(UpdateCardRequest request) {
    this.cardType = request.cardType();
    this.recipientName = request.recipientName();
    this.recipientEmail = request.recipientEmail();
    this.senderName = request.senderName();
    this.message = request.message();
    this.backgroundColor = request.backgroundColor();
    this.textColor = request.textColor();
    this.borderColor = request.borderColor();
    this.fontFamily = request.fontFamily();
    this.fontSize = request.fontSize();
    this.pattern = request.pattern();
    this.imageUrl = request.imageUrl();
    this.updatedAt = LocalDateTime.now();

    return validate();
  }

  public Notification validate() {
    var notification = Notification.empty();

    ObjectValidator.notNull("user", user, notification);

    StringValidator.notBlank("pattern", pattern, notification);
    StringValidator.notBlank("message", message, notification);
    StringValidator.notBlank("cardType", cardType, notification);
    StringValidator.notBlank("fontSize", fontSize, notification);
    StringValidator.notBlank("senderName", senderName, notification);
    StringValidator.notBlank("fontFamily", fontFamily, notification);
    StringValidator.notBlank("recipientEmail", recipientEmail, notification);

    EmailValidator.isValidEmail("recipientEmail", recipientEmail, notification);

    HexColorValidator.isValidColor("textColor", textColor, notification);
    HexColorValidator.isValidColor("borderColor", borderColor, notification);
    HexColorValidator.isValidColor("backgroundColor", backgroundColor, notification);

    return notification;
  }
}
