package be.smilepost.adapter.repository;

import be.smilepost.domain.Card;
import be.smilepost.usecase.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class CardRepositoryAdapter implements CardRepository {
  private final CardJpaRepository cardJpaRepository;

  @Override
  public void save(Card card) {
    cardJpaRepository.saveAndFlush(new CardEntity(card));
  }

  @Override
  public void delete(UUID id) {
    cardJpaRepository.deleteById(id);
  }

  @Override
  public Optional<Card> findById(UUID id) {
    return cardJpaRepository.findById(id).map(CardEntity::toDomain);
  }

  @Override
  public List<Card> findByUser(UUID userId, Boolean sent, Integer limit, Integer offset) {
    Pageable pageable = PageRequest.of(offset / limit, limit);
    Page<CardEntity> entities;

    if (sent != null) {
      entities = cardJpaRepository.findByUserIdAndIsSent(userId, sent, pageable);
    } else {
      entities = cardJpaRepository.findByUserId(userId, pageable);
    }

    return entities.stream()
      .map(CardEntity::toDomain)
      .toList();
  }

}
