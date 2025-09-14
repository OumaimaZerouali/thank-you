package be.smilepost.usecase;

import be.smilepost.domain.Card;

public interface MailRepository {
  void send(Card card);
}
