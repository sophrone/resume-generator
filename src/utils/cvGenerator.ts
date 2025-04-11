interface Profile {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
}

interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string; // Format: YYYY-MM
  endDate: string; // Format: YYYY-MM or "Present"
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}

interface JobListing {
  jobTitle: string;
  requiredSkills: string[];
  responsibilities: string[];
}

export const generateCV = (
  profile: Profile,
  jobListing: JobListing
): string => {
  // Start building the CV
  let cv = `# ${profile.name}\n`;
  cv += `Email: ${profile.email}\n`;
  cv += `Phone: ${profile.phone}\n\n`;

  cv += `## Summary\n${profile.summary}\n\n`;

  cv += `## Skills\n`;
  const matchedSkills = profile.skills.filter((skill) =>
    jobListing.requiredSkills.includes(skill)
  );
  cv +=
    matchedSkills.length > 0
      ? matchedSkills.join(", ")
      : "No matching skills found.\n\n";

  cv += `## Work Experience\n`;
  profile.workExperience.forEach((exp) => {
    cv += `### ${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
    cv += `- Responsibilities: ${exp.responsibilities.join(", ")}\n\n`;
  });

  cv += `## Education\n`;
  profile.education.forEach((edu) => {
    cv += `- ${edu.degree} from ${edu.institution} (Graduated: ${edu.graduationYear})\n`;
  });

  return cv;
};
