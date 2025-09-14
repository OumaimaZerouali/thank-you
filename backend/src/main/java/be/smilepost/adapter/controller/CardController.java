package be.smilepost.adapter.controller;

import be.smilepost.domain.request.CreateCardRequest;
import be.smilepost.domain.request.UpdateCardRequest;
import be.smilepost.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CardController implements CardsApi {
  private final SendCardUseCase sendCardUseCase;
  private final UpdateCardUseCase updateCardUseCase;
  private final DeleteCardUseCase deleteCardUseCase;
  private final CreateCardUseCase createCardUseCase;
  private final GetCardByIdUseCase getCardByIdUseCase;
  private final GetCardsOfLoggedInUserUseCase getCardsOfLoggedInUserUseCase;

  @Override
  public ResponseEntity<NotificationDTO> createCard(CreateCardDTO createCardDTO) {
    var request = CreateCardRequest.builder()
      .cardType(createCardDTO.getCardType().getValue())
      .recipientName(createCardDTO.getRecipientName())
      .recipientEmail(createCardDTO.getRecipientEmail())
      .senderName(createCardDTO.getSenderName())
      .message(createCardDTO.getMessage())
      .backgroundColor(createCardDTO.getBackgroundColor())
      .textColor(createCardDTO.getTextColor())
      .borderColor(createCardDTO.getBorderColor())
      .fontFamily(createCardDTO.getFontFamily().getValue())
      .fontSize(createCardDTO.getFontSize().getValue())
      .pattern(createCardDTO.getPattern().getValue())
      .imageUrl(createCardDTO.getImageUrl().toString())
      .sent(createCardDTO.getIsSent())
      .build();

    var notification = createCardUseCase.execute(request);

    if (notification.hasErrors()) {
      return ResponseEntity.badRequest().body(NotificationDTO.builder().errors(notification.getErrors()).build());
    }

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<NotificationDTO> updateCard(String cardId, CardUpdateDTO cardUpdateDTO) {
    var request = UpdateCardRequest.builder()
      .cardId(cardId)
      .cardType(cardUpdateDTO.getCardType().getValue())
      .recipientName(cardUpdateDTO.getRecipientName())
      .recipientEmail(cardUpdateDTO.getRecipientEmail())
      .senderName(cardUpdateDTO.getSenderName())
      .message(cardUpdateDTO.getMessage())
      .backgroundColor(cardUpdateDTO.getBackgroundColor())
      .textColor(cardUpdateDTO.getTextColor())
      .borderColor(cardUpdateDTO.getBorderColor())
      .fontFamily(cardUpdateDTO.getFontFamily().getValue())
      .fontSize(cardUpdateDTO.getFontSize().getValue())
      .pattern(cardUpdateDTO.getPattern().getValue())
      .imageUrl(cardUpdateDTO.getImageUrl().toString())
      .build();

    var notification = updateCardUseCase.execute(request);

    if (notification.hasErrors()) {
      return ResponseEntity.badRequest().body(NotificationDTO.builder().errors(notification.getErrors()).build());
    }

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteCard(String cardId) {
    deleteCardUseCase.execute(cardId);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<CardDTO> getCard(String cardId) {
    var card = getCardByIdUseCase.execute(cardId);
    return ResponseEntity.ok(CardToDTOMapper.map(card));
  }

  @Override
  public ResponseEntity<CardsDTO> getCards(Boolean sent, Integer limit, Integer offset) {
    var cards = getCardsOfLoggedInUserUseCase.execute(sent, limit, offset);
    return ResponseEntity.ok(CardToDTOMapper.map(cards));
  }

  @Override
  public ResponseEntity<NotificationDTO> sendCard(String cardId) {
    var notification = sendCardUseCase.execute(cardId);

    if (notification.hasErrors()) {
      return ResponseEntity.badRequest().body(NotificationDTO.builder().errors(notification.getErrors()).build());
    }

    return ResponseEntity.noContent().build();
  }
}
