package com.jobtracker.job_service.controller;

import com.jobtracker.job_service.model.Job;
import com.jobtracker.job_service.service.JobService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<Job> getAll() { return jobService.getAllJobs(); }

    @GetMapping("/{id}")
    public Job getOne(@PathVariable Long id) { return jobService.getJobById(id); }

    @PostMapping
    public Job create(@RequestBody Job job) { return jobService.createJob(job); }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job job) { return jobService.updateJob(id, job); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { jobService.deleteJob(id); }
}