package com.tracker.controller;

import com.tracker.dto.TransactionRequest;
import com.tracker.model.Transaction;
import com.tracker.security.UserDetailsImpl;
import com.tracker.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    private String getUserId(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userDetails.getId();
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(Authentication auth) {
        String userId = getUserId(auth);
        return ResponseEntity.ok(transactionService.getTransactionsForUser(userId));
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(Authentication auth,
                                                         @Valid @RequestBody TransactionRequest request) {
        String userId = getUserId(auth);
        Transaction saved = transactionService.addTransaction(userId, request);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(Authentication auth, @PathVariable String id) {
        String userId = getUserId(auth);
        boolean deleted = transactionService.deleteTransaction(userId, id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Transaction deleted successfully"));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Transaction not found"));
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary(Authentication auth) {
        String userId = getUserId(auth);
        return ResponseEntity.ok(transactionService.getFinancialSummary(userId));
    }
}
