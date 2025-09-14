package be.smilepost.usecase;

import java.util.UUID;

public interface AuthRepository {
  UUID getCurrentUserId();
}
