namespace JobPortalAPI.Models.DTOs
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Requirements { get; set; } = new List<string>();
        public string Salary { get; set; } = string.Empty;
        public DateTime PostedDate { get; set; }
        public DateTime Deadline { get; set; }
        public int RecruiterId { get; set; }
        
        // Additional properties for frontend
        public string? ApplicationStatus { get; set; }
        public DateTime? AppliedDate { get; set; }
        public int ApplicationsCount { get; set; }
    }
} 