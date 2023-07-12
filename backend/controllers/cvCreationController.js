import generatePDFDocument from "./generatePDF.js";
import fs from 'fs';
export const cvGenerator = async (req, res) => {
  const {
    template_id,
    personal_information,
    job_title,
    career_objective,
    skills,
    education,
    experience,
    achievements,
  } = req.body;

  const validTemplateIds = ["1", "2", "3"];
  if (!validTemplateIds.includes(template_id)) {
    return res.status(404).json({ error: `Invalid Template: ${template_id}` });
  }

  const personal_informationRequiredFields = [
    "name",
    "last_name",
    "email_address",
    "phone_number",
    "linkedin_url",
  ];
  const personal_informationMissingFields =
    personal_informationRequiredFields.filter(
      (field) => !personal_information.hasOwnProperty(field)
    );

  if (personal_informationMissingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields in personal_information: ${personal_informationMissingFields.join(
        ", "
      )}`,
    });
  }

  // Validate field types and presence for personal_information
  if (
    typeof personal_information.name !== "string" ||
    personal_information.name.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid name field" });
  }
  if (
    typeof personal_information.last_name !== "string" ||
    personal_information.last_name.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid last_name field" });
  }
  if (
    typeof personal_information.email_address !== "string" ||
    personal_information.email_address.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid email_address field" });
  }
  if (
    typeof personal_information.phone_number !== "string" ||
    personal_information.phone_number.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid phone_number field" });
  }
  if (
    typeof personal_information.linkedin_url !== "string" ||
    personal_information.linkedin_url.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid linkedin_url field" });
  }

  // Validate job_title field
  if (typeof job_title !== "string" || job_title.trim() === "") {
    return res.status(400).json({ error: "Invalid job_title field" });
  }

  // Validate career_objective field
  if (typeof career_objective !== "string" || career_objective.trim() === "") {
    return res.status(400).json({ error: "Invalid career_objective field" });
  }

  // Validate skills field
  if (!Array.isArray(skills) || skills.length === 0) {
    return res
      .status(400)
      .json({ error: "Skills field must be a non-empty array" });
  }
  for (const skill of skills) {
    if (typeof skill !== "string" || skill.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid skill value in the skills array" });
    }
  }

  // Validate education array
  if (!Array.isArray(education) || education.length === 0) {
    return res
      .status(400)
      .json({ error: "Education field must be a non-empty array" });
  }
  for (const edu of education) {
    const requiredFields = ["school_name", "passing_year", "description"];
    const missingFields = requiredFields.filter(
      (field) => !edu.hasOwnProperty(field)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields in education: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Validate field types and presence for each education object
    if (typeof edu.school_name !== "string" || edu.school_name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid school_name field in education" });
    }
    if (
      typeof edu.passing_year !== "string" ||
      edu.passing_year.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Invalid passing_year field in education" });
    }
    if (typeof edu.description !== "string" || edu.description.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid description field in education" });
    }
  }

  // Validate experience array
  if (!Array.isArray(experience) || experience.length === 0) {
    return res
      .status(400)
      .json({ error: "Experience field must be a non-empty array" });
  }
  for (const exp of experience) {
    const requiredFields = ["company_name", "passing_year", "responsibilities"];
    const missingFields = requiredFields.filter(
      (field) => !exp.hasOwnProperty(field)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields in experience: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Validate field types and presence for each experience object
    if (
      typeof exp.company_name !== "string" ||
      exp.company_name.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Invalid company_name field in experience" });
    }
    if (
      typeof exp.passing_year !== "string" ||
      exp.passing_year.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Invalid passing_year field in experience" });
    }
    if (
      typeof exp.passing_year !== "string" ||
      exp.responsibilities.length === 0
    ) {
      return res.status(400).json({
        error: "Responsibilities field in experience must be a non-empty array",
      });
    }
  }

  const { name, last_name, email_address, phone_number, linkedin_url } =
    personal_information;

  const generateJson = {
    Name: name,
    LastName: last_name,
    EmailAddress: email_address,
    PhoneNumber: phone_number,
    LinkedIn: `<a href="${linkedin_url}">LinkedIn</a>`,
    JobTitle: job_title,
    Summary: career_objective,
    Skills: skills,
    Education: education.map((edu) => ({
      SchoolName: edu.school_name,
      Year: edu.passing_year,
      Description: edu.description,
    })),
    Experience: experience.map((exp) => ({
      CompanyName: exp.company_name,
      Year: exp.passing_year,
      Description: exp.responsibilities,
    })),
    Achievements: achievements.map((ach) => ({
      Type: ach.field,
      Description: ach.awards,
    })),
  };

  let OUTPUT_FILE_path = `./output/generate${template_id}.pdf`;

  let templateFilePath;
  if (template_id === "1") {
    templateFilePath = "./Templates/Templates/BasicTemplate.docx";
  } else if (template_id === "2") {
    templateFilePath = "./Templates//Templates/LinkTemplate.docx";
  } else if (template_id === "3") {
    templateFilePath = "./Templates/Templates/ImageTemplate.docx";
  } else {
    return res.status(404).json({ error: `Invalid Template ID: ${template_id}` });
  }

  generatePDFDocument(templateFilePath, generateJson, OUTPUT_FILE_path)
  .then((outputFilePath) => {
    // Read the generated PDF file
    const pdfData = fs.readFileSync(OUTPUT_FILE_path);

    // Set the appropriate headers for the response
    res.setHeader('Content-Disposition', 'inline; filename=cv.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    // Send the PDF file as the response
    res.send(pdfData)
    console.log("PDF generated successfully");

    fs.unlinkSync(OUTPUT_FILE_path);
    // Send success response in JSON

    
  })
  .catch((error) => {
    if (error.errorCode === 'invalid_client') {
      console.error("PDF generation failed:", error);
      return res.status(401).json({ error: "Unauthorized access", details: error.message });
    }
    console.error("PDF generation failed:", error);
    return res.status(500).json({ error: "Failed to generate PDF", details: error.message });
  });

 
};
