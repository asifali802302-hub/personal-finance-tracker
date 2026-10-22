package com.tracker.repository;

import com.tracker.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUserIdOrderByDateDesc(String userId);
    Optional<Transaction> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
    List<Transaction> findByUserIdAndCategory(String userId, String category);
}
