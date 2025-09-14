package be.smilepost.domain.factory;

import be.smilepost.common.Creation;
import be.smilepost.domain.Card;
import be.smilepost.domain.request.CreateCardRequest;

public class CardFactory {
  public Creation<Card> create(CreateCardRequest request) {
    var card = new Card(request);
    return Creation.of(card, card.validate());
  }
}

