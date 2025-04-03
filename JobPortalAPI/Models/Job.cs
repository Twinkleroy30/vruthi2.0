using System.ComponentModel.DataAnnotations;

namespace JobPortalAPI.Models
{
    public class Job
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Company { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public List<string> Requirements { get; set; } = new List<string>();

        [Required]
        public string Salary { get; set; } = string.Empty;

        public DateTime PostedDate { get; set; } = DateTime.UtcNow;
        public DateTime Deadline { get; set; }

        // Foreign key for recruiter
        public int RecruiterId { get; set; }
        
        // Navigation properties
        public User Recruiter { get; set; } = null!;
        public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
    }
} 