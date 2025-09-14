package be.smilepost.usecase;

import be.smilepost.domain.Card;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CardRepository {
  void save(Card card);
  void delete(UUID id);

  Optional<Card> findById(UUID id);
  List<Card> findByUser(UUID userId, Boolean sent, Integer limit, Integer offset);
}
