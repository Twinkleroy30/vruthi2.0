using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobPortalAPI.Data;
using JobPortalAPI.Models;
using JobPortalAPI.Models.DTOs;

namespace JobPortalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetJobs()
        {
            var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var userRole = User.FindFirst("role")?.Value;

            var jobs = await _context.Jobs
                .Include(j => j.Applications)
                .Select(j => new JobDto
                {
                    Id = j.Id,
                    Title = j.Title,
                    Company = j.Company,
                    Location = j.Location,
                    Type = j.Type,
                    Description = j.Description,
                    Requirements = j.Requirements,
                    Salary = j.Salary,
                    PostedDate = j.PostedDate,
                    Deadline = j.Deadline,
                    RecruiterId = j.RecruiterId,
                    ApplicationsCount = j.Applications.Count,
                    ApplicationStatus = userRole == "seeker" 
                        ? j.Applications.FirstOrDefault(a => a.UserId == userId)?.Status 
                        : null,
                    AppliedDate = userRole == "seeker" 
                        ? j.Applications.FirstOrDefault(a => a.UserId == userId)?.AppliedDate 
                        : null
                })
                .ToListAsync();

            return jobs;
        }

        // GET: api/Jobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobDto>> GetJob(int id)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var userRole = User.FindFirst("role")?.Value;

            var job = await _context.Jobs
                .Include(j => j.Applications)
                .Select(j => new JobDto
                {
                    Id = j.Id,
                    Title = j.Title,
                    Company = j.Company,
                    Location = j.Location,
                    Type = j.Type,
                    Description = j.Description,
                    Requirements = j.Requirements,
                    Salary = j.Salary,
                    PostedDate = j.PostedDate,
                    Deadline = j.Deadline,
                    RecruiterId = j.RecruiterId,
                    ApplicationsCount = j.Applications.Count,
                    ApplicationStatus = userRole == "seeker" 
                        ? j.Applications.FirstOrDefault(a => a.UserId == userId)?.Status 
                        : null,
                    AppliedDate = userRole == "seeker" 
                        ? j.Applications.FirstOrDefault(a => a.UserId == userId)?.AppliedDate 
                        : null
                })
                .FirstOrDefaultAsync(j => j.Id == id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        // POST: api/Jobs
        [HttpPost]
        [Authorize(Roles = "company")]
        public async Task<ActionResult<Job>> PostJob(Job job)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            job.RecruiterId = userId;
            job.PostedDate = DateTime.UtcNow;

            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
        }

        // PUT: api/Jobs/5
        [HttpPut("{id}")]
        [Authorize(Roles = "company")]
        public async Task<IActionResult> PutJob(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }

            var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var existingJob = await _context.Jobs.FindAsync(id);

            if (existingJob == null)
            {
                return NotFound();
            }

            if (existingJob.RecruiterId != userId)
            {
                return Forbid();
            }

            _context.Entry(existingJob).State = EntityState.Detached;
            _context.Entry(job).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Jobs/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "company")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var job = await _context.Jobs.FindAsync(id);
            
            if (job == null)
            {
                return NotFound();
            }

            if (job.RecruiterId != userId)
            {
                return Forbid();
            }

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobExists(int id)
        {
            return _context.Jobs.Any(e => e.Id == id);
        }
    }
} 