package com.jobtracker.job_service.service;



import com.jobtracker.job_service.model.Job;
import com.jobtracker.job_service.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;
import java.util.Map;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String NOTIFICATION_URL = "http://localhost:3001/api/activities";

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    private void notify(Long jobId, String company, String action) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, Object> body = Map.of("jobId", jobId, "company", company, "action", action);
        restTemplate.postForObject(NOTIFICATION_URL, new HttpEntity<>(body, headers), String.class);
    }

    public List<Job> getAllJobs() { return jobRepository.findAll(); }
    public Job getJobById(Long id) { return jobRepository.findById(id).orElseThrow(); }

    public Job createJob(Job job) {
        Job saved = jobRepository.save(job);
        notify(saved.getId(), saved.getCompany(), "CREATED");
        return saved;
    }

    public Job updateJob(Long id, Job updated) {
        Job job = getJobById(id);
        job.setCompany(updated.getCompany());
        job.setRole(updated.getRole());
        job.setStatus(updated.getStatus());
        job.setAppliedDate(updated.getAppliedDate());
        job.setNotes(updated.getNotes());
        Job saved = jobRepository.save(job);
        notify(saved.getId(), saved.getCompany(), "UPDATED");
        return saved;
    }

    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.deleteById(id);
        notify(id, job.getCompany(), "DELETED");
    }
}