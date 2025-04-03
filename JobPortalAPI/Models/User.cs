using System.ComponentModel.DataAnnotations;

namespace JobPortalAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "seeker"; // seeker, company, admin

        public string? ProfileImage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
        public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
    }
} 