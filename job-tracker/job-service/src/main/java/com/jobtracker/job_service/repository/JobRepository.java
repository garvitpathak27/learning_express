package com.jobtracker.job_service.repository;

import com.jobtracker.job_service.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}