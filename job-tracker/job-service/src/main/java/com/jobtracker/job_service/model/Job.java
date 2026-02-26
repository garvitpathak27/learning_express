package com.jobtracker.job_service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String status; // APPLIED, INTERVIEW, OFFER, REJECTED
    private LocalDate appliedDate;
    private String notes;
}