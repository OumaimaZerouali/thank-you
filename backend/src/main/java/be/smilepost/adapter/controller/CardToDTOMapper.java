package be.smilepost.adapter.controller;

import be.smilepost.domain.Card;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.net.URI;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CardToDTOMapper {

  public static CardDTO map(Card card) {
    return new CardDTO()
      .cardType(CardTypeDTO.valueOf(card.getCardType()))
      .recipientName(card.getRecipientName())
      .recipientEmail(card.getRecipientEmail())
      .senderName(card.getSenderName())
      .message(card.getMessage())
      .backgroundColor(card.getBackgroundColor())
      .textColor(card.getTextColor())
      .borderColor(card.getBorderColor())
      .fontFamily(FontFamilyDTO.valueOf(card.getFontFamily()))
      .fontSize(FontSizeDTO.valueOf(card.getFontSize()))
      .pattern(PatternTypeDTO.valueOf(card.getPattern()))
      .imageUrl(URI.create(card.getImageUrl()))
      .isSent(card.getIsSent());
  }

  public static CardsDTO map(List<Card> cards) {
    var cardDTOs = cards.stream()
      .map(CardToDTOMapper::map)
      .toList();

    return CardsDTO.builder()
      .success(true)
      .data(cardDTOs)
      .total(cardDTOs.size())
      .build();
  }
}
