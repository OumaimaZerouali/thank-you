package be.smilepost.usecase;

import be.smilepost.domain.Card;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class GetCardsOfLoggedInUserUseCase {
  private final CardRepository cardRepository;
  private final AuthRepository authRepository;

  public List<Card> execute(Boolean sent, Integer limit, Integer offset) {
    var userId = authRepository.getCurrentUserId();

    return cardRepository.findByUser(userId, sent, limit, offset);
  }
}

