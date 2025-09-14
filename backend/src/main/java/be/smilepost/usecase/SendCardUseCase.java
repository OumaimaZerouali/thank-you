package be.smilepost.usecase;

import be.smilepost.common.Notification;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class SendCardUseCase {

  public Notification execute(String id) {
    var uuid = UUID.fromString(id);

    return Notification.empty();
  }
}
