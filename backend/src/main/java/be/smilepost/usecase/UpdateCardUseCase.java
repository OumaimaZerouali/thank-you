package be.smilepost.usecase;

import be.smilepost.common.Notification;
import be.smilepost.domain.request.UpdateCardRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Transactional
@RequiredArgsConstructor
public class UpdateCardUseCase {

  private final CardRepository cardRepository;

  public Notification execute(UpdateCardRequest request) {
    var notification = new Notification();
    var cardId = UUID.fromString(request.cardId());

    var optionalCard = cardRepository.findById(cardId);
    if (optionalCard.isEmpty()) {
      notification.addError("Card with id " + cardId + " not found");
      return notification;
    }

    var card = optionalCard.get();
    notification = card.update(request);

    if (notification.hasErrors()) {
      return notification;
    }

    cardRepository.save(card);
    return Notification.empty();
  }
}

