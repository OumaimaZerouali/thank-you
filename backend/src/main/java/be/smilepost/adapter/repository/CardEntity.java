package be.smilepost.adapter.repository;

import be.smilepost.domain.Card;
import be.smilepost.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Entity
@Table(name = "cards")
@NoArgsConstructor
public class CardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(columnDefinition = "UUID")
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @Column(name = "card_type", nullable = false)
  private String cardType;

  @Column(name = "recipient_name", nullable = false)
  private String recipientName;

  @Column(name = "recipient_email", nullable = false)
  private String recipientEmail;

  @Column(name = "sender_name", nullable = false)
  private String senderName;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String message;

  @Column(name = "background_color", nullable = false)
  private String backgroundColor;

  @Column(name = "text_color", nullable = false)
  private String textColor;

  @Column(name = "border_color", nullable = false)
  private String borderColor;

  @Column(name = "font_family", nullable = false)
  private String fontFamily;

  @Column(name = "font_size", nullable = false)
  private String fontSize;

  @Column(nullable = false)
  private String pattern;

  @Column(name = "image_url")
  private String imageUrl;

  @Column(name = "is_sent", nullable = false)
  private Boolean isSent = false;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  public CardEntity(Card card) {
    this.id = card.getId();
    this.user = new UserEntity(card.getUser());
    this.message = card.getMessage();
    this.pattern = card.getPattern();
    this.isSent = card.getIsSent();
    this.fontSize = card.getFontSize();
    this.cardType = card.getCardType();
    this.imageUrl = card.getImageUrl();
    this.createdAt = card.getCreatedAt();
    this.updatedAt = card.getUpdatedAt();
    this.textColor = card.getTextColor();
    this.fontFamily = card.getFontFamily();
    this.senderName = card.getSenderName();
    this.borderColor = card.getBorderColor();
    this.recipientName = card.getRecipientName();
    this.recipientEmail = card.getRecipientEmail();
    this.backgroundColor = card.getBackgroundColor();
  }

  public Card toDomain() {
    return Card.builder()
      .id(this.id)
      .user(User.builder()
        .fullName(this.user.getFullName())
        .email(this.user.getEmail())
        .id(this.user.getId())
        .build())
      .message(this.message)
      .pattern(this.pattern)
      .isSent(this.isSent)
      .fontSize(this.fontSize)
      .cardType(this.cardType)
      .imageUrl(this.imageUrl)
      .createdAt(this.createdAt)
      .updatedAt(this.updatedAt)
      .textColor(this.textColor)
      .fontFamily(this.fontFamily)
      .senderName(this.senderName)
      .borderColor(this.borderColor)
      .recipientName(this.recipientName)
      .recipientEmail(this.recipientEmail)
      .backgroundColor(this.backgroundColor)
      .build();
  }
}
