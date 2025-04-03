namespace JobPortalAPI.Models
{
    public class JobApplication
    {
        public int JobId { get; set; }
        public int UserId { get; set; }
        
        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending"; // Pending, Reviewed, Accepted, Rejected

        // Navigation properties
        public Job Job { get; set; } = null!;
        public User User { get; set; } = null!;
    }
} 