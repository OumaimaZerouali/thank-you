package be.smilepost.domain.request;

import lombok.Builder;

@Builder
public record UpdateCardRequest(
  String cardId,
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
  String backgroundColor
) {}
