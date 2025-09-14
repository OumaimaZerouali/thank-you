package be.smilepost.adapter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

public interface CardJpaRepository extends JpaRepository<CardEntity, UUID> {
  Page<CardEntity> findByUserId(UUID userId, Pageable pageable);
  Page<CardEntity> findByUserIdAndIsSent(UUID userId, Boolean sent, Pageable pageable);
}
