package com.example.library.controller;

import com.example.library.entity.Loan;
import com.example.library.repository.UserRepository;
import com.example.library.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/borrow")
    public Loan borrowBook(@RequestBody Map<String, Long> request, Authentication authentication) {
        Long bookId = request.get("bookId");
        String email = authentication.getName();
        return loanService.borrowBook(getUserIdFromEmail(email), bookId);
    }

    @PostMapping("/return/{loanId}")
    public Loan returnBook(@PathVariable Long loanId) {
        return loanService.returnBook(loanId);
    }

    @GetMapping("/my")
    public List<Loan> getMyLoans(Authentication authentication) {
        return loanService.getLoansByEmail(authentication.getName());
    }

    private Long getUserIdFromEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow().getId();
    }
}
