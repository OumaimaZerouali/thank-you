package be.smilepost.usecase;

import be.smilepost.common.Notification;
import be.smilepost.domain.factory.CardFactory;
import be.smilepost.domain.request.CreateCardRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
public class CreateCardUseCase {

  private final CardFactory cardFactory;
  private final CardRepository cardRepository;

  public Notification execute(CreateCardRequest request) {
    var creation = cardFactory.create(request);

    if (creation.getNotification().hasErrors()) {
      return Notification.of(creation.getNotification().errorMessage());
    }

    cardRepository.save(creation.getValue());

    return Notification.empty();
  }
}



