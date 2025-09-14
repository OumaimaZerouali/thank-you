package be.smilepost.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class User {
    private UUID id;

    private String email;

    private String password;

    private String fullName;

    private LocalDateTime emailConfirmedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<Card> cards = new ArrayList<>();
}
