package be.smilepost.usecase;

import be.smilepost.adapter.exception.CardNotFoundException;
import be.smilepost.domain.Card;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class GetCardByIdUseCase {
  private final CardRepository cardRepository;

  public Card execute(String id) {
    var cardId = UUID.fromString(id);
    return cardRepository.findById(cardId)
      .orElseThrow(() -> new CardNotFoundException("Card with id " + id + " not found"));
  }
}


