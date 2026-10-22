package com.tracker.service;

import com.tracker.dto.TransactionRequest;
import com.tracker.model.Transaction;
import com.tracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getTransactionsForUser(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }

    public Transaction addTransaction(String userId, TransactionRequest request) {
        Transaction transaction = new Transaction(
                userId,
                request.getTitle(),
                request.getAmount(),
                request.getType().toUpperCase(),
                request.getCategory(),
                request.getDate(),
                request.getNotes()
        );
        return transactionRepository.save(transaction);
    }

    public boolean deleteTransaction(String userId, String transactionId) {
        Optional<Transaction> tx = transactionRepository.findByIdAndUserId(transactionId, userId);
        if (tx.isPresent()) {
            transactionRepository.delete(tx.get());
            return true;
        }
        return false;
    }

    public Map<String, Object> getFinancialSummary(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserIdOrderByDateDesc(userId);

        double totalIncome = 0.0;
        double totalExpense = 0.0;

        Map<String, Double> categoryExpenseMap = new LinkedHashMap<>();
        Map<String, Map<String, Double>> monthlyTrendsMap = new TreeMap<>();

        for (Transaction tx : transactions) {
            double amount = tx.getAmount() != null ? tx.getAmount() : 0.0;
            String type = tx.getType();

            if ("INCOME".equalsIgnoreCase(type)) {
                totalIncome += amount;
            } else if ("EXPENSE".equalsIgnoreCase(type)) {
                totalExpense += amount;
                String cat = tx.getCategory() != null ? tx.getCategory() : "Other";
                categoryExpenseMap.put(cat, categoryExpenseMap.getOrDefault(cat, 0.0) + amount);
            }

            // Month trend grouping (YYYY-MM)
            if (tx.getDate() != null && tx.getDate().length() >= 7) {
                String monthKey = tx.getDate().substring(0, 7);
                monthlyTrendsMap.putIfAbsent(monthKey, new HashMap<>(Map.of("income", 0.0, "expense", 0.0)));
                Map<String, Double> monthData = monthlyTrendsMap.get(monthKey);
                if ("INCOME".equalsIgnoreCase(type)) {
                    monthData.put("income", monthData.get("income") + amount);
                } else if ("EXPENSE".equalsIgnoreCase(type)) {
                    monthData.put("expense", monthData.get("expense") + amount);
                }
            }
        }

        double balance = totalIncome - totalExpense;

        // Format category expenses for Recharts [{ name: "Food", value: 200 }]
        List<Map<String, Object>> categoryList = new ArrayList<>();
        categoryExpenseMap.forEach((cat, val) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("name", cat);
            item.put("value", val);
            categoryList.add(item);
        });

        // Format monthly trends for Recharts [{ month: "2026-10", income: 5000, expense: 2000 }]
        List<Map<String, Object>> monthlyList = new ArrayList<>();
        monthlyTrendsMap.forEach((month, data) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("month", month);
            item.put("income", data.get("income"));
            item.put("expense", data.get("expense"));
            monthlyList.add(item);
        });

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalIncome", totalIncome);
        summary.put("totalExpense", totalExpense);
        summary.put("balance", balance);
        summary.put("categoryExpenses", categoryList);
        summary.put("monthlyTrends", monthlyList);

        return summary;
    }
}
