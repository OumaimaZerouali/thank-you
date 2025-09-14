package be.smilepost.domain.request;

import be.smilepost.domain.User;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CreateCardRequest(
  User user,
  Boolean sent,
  String message,
  String pattern,
  String fontSize,
  String cardType,
  String imageUrl,
  String textColor,
  String fontFamily,
  String senderName,
  String borderColor,
  String recipientName,
  String recipientEmail,
  String backgroundColor,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
  ) {
}
