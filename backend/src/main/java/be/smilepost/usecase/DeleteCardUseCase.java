package be.smilepost.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

@RequiredArgsConstructor
public class DeleteCardUseCase {
  private final CardRepository cardRepository;

  public void execute(String cardId) {
    cardRepository.delete(UUID.fromString(cardId));
  }
}
