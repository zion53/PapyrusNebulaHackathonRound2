import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "./form.css";
import CVPreview from "../preview/preview";
import close from "../../images/cross.png"

const MyForm = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedURL, setSelectedURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const initialValues = {
    template_id: `${props.templateId}`,
    personal_information: {
      name: "",
      last_name: "",
      email_address: "",
      phone_number: "",
      linkedin_url: "",
    },
    job_title: "",
    career_objective: "",
    skills: [""],
    education: [{ school_name: "", passing_year: "", description: "" }],
    experience: [{ company_name: "", passing_year: "", responsibilities: "" }],
    achievements: [{ field: "", awards: "" }],
  };

  const validationSchema = Yup.object().shape({
    template_id: Yup.string().required("T ID is required"),
    personal_information: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email_address: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      phone_number: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .required("Phone number is required"),
      linkedin_url: Yup.string()
        .url("Invalid LinkedIn URL")
        .required("LinkedIn URL is required"),
    }),
    job_title: Yup.string().required("Job Title is required"),
    career_objective: Yup.string().required("Objective is required"),
    skills: Yup.array()
      .of(Yup.string())
      .test("at-least-one-skill", "At least one skill is required", (value) => {
        return value && value.length > 0;
      })
      .required("At least one skill is required"),
    education: Yup.array()
      .of(
        Yup.object().shape({
          school_name: Yup.string().required("School is required"),
          passing_year: Yup.string().required("Passing Year is required"),
          description: Yup.string().required("Description is required"),
        })
      )
      .test(
        "at-least-one-education",
        "At least one education is required",
        (value) => {
          return value && value.length > 0;
        }
      )
      .required("At least one education is required"),
    experience: Yup.array()
      .of(
        Yup.object().shape({
          company_name: Yup.string().required("Company is required"),
          passing_year: Yup.string().required("Passing Year is required"),
          responsibilities: Yup.string().required("Responsibility is required"),
        })
      )
      .test(
        "at-least-one-experience",
        "At least one experience is required",
        (value) => {
          return value && value.length > 0;
        }
      )
      .required("At least one experience is required"),
    achievements: Yup.array()
      .of(
        Yup.object().shape({
          field: Yup.string().required("Field is required"),
          awards: Yup.string().required("Award is required"),
        })
      )
      .test(
        "at-least-one-achievement",
        "At least one achievement is required",
        (value) => {
          return value && value.length > 0;
        }
      )
      .required("At least one achievement is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      // Perform the POST request using fetch or your preferred HTTP library
      const response = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/pdf",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const blob = await response.blob();
        setSelectedURL(URL.createObjectURL(blob));
        setSuccess(true);
      } else {
        setError("Failed to generate resume");
      }
    } catch (error) {
      setError(error.message || "Failed to generate resume");
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="formContainer">

            <h className="formHeading">Job Info:</h>
            <div className="sectionContainer">
              <div>
                <label htmlFor="job_title">Job Title:</label>
                <br />
                <Field
                  type="text"
                  id="job_title"
                  name="job_title"
                  className="inputfield"
                />
                <ErrorMessage
                  className="errormessage"
                  name="job_title"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="career_objective">Carrer Objective:</label>
                <br />
                <Field
                  as="textarea"
                  id="career_objective"
                  className="inputfield-textarea"
                  name="career_objective"
                />
                <ErrorMessage
                  className="errormessage"
                  name="career_objective"
                  component="div"
                />
              </div>
            </div>

            <div className="templateEnd"></div>
            <h className="formHeading">Personal Information:</h>
            <div className="sectionContainer">
              <div>
                <label htmlFor="personal_information.name">Name:</label>
                <br />
                <Field
                  type="text"
                  className="inputfield"
                  id="personal_information.name"
                  name="personal_information.name"
                />
                <ErrorMessage
                  className="errormessage"
                  name="personal_information.name"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="personal_information.last_name">
                  Last Name:
                </label>
                <br />
                <Field
                  type="text"
                  className="inputfield"
                  id="personal_information.last_name"
                  name="personal_information.last_name"
                />
                <ErrorMessage
                  className="errormessage"
                  name="personal_information.last_name"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="personal_information.email_address">
                  Email:
                </label>
                <br />
                <Field
                  type="text"
                  className="inputfield"
                  id="personal_information.email_address"
                  name="personal_information.email_address"
                />
                <ErrorMessage
                  className="errormessage"
                  name="personal_information.email_address"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="personal_information.phone_number">
                  Phone Number:
                </label>
                <br />
                <Field
                  type="text"
                  className="inputfield"
                  id="personal_information.phone_number"
                  name="personal_information.phone_number"
                />
                <ErrorMessage
                  className="errormessage"
                  name="personal_information.phone_number"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="personal_information.linkedin_url">
                  LinkedIn:
                </label>
                <br />
                <Field
                  type="text"
                  className="inputfield"
                  id="personal_information.linkedin_url"
                  name="personal_information.linkedin_url"
                />
                <ErrorMessage
                  className="errormessage"
                  name="personal_information.linkedin_url"
                  component="div"
                />
              </div>
            </div>

            <div className="templateEnd"></div>
           
            <h2 className="formHeading" style={{marginBottom:"0%"}}>Skills:</h2>
            <div className="sectionContainer" style={{marginBottom:"0%"}}>
              <FieldArray name="skills">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.skills.map((skill, index) => (
                      <div key={index} className="dynamicFields" style={{marginTop:"0%"}}>
                        <Field
                          type="text"
                          name={`skills[${index}]`}
                          className="inputfield"
                        />
                        <ErrorMessage
                          className="errormessage"
                          name={`skills[${index}]`}
                          component="div"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="removeSkillbtn"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove Skill
                          </button>
                        )}
                        <div
                          className="innertemplateEnd"
                        ></div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addSkillbtn"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add Skill
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="templateEnd"></div>

            
            <div className="field-container-edu">
            <h2 className="formHeading">Education:</h2>
              <FieldArray name="education">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.education.map((edu, index) => (
                      <div key={index} className="dynamicFields">
                        <div>
                          <label htmlFor={`education[${index}].school_name`}>
                            School:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`education[${index}].school_name`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`education[${index}].school_name`}
                            component="div"
                          />
                        </div>
                        <div>
                          <label htmlFor={`education[${index}].passing_year`}>
                            Passing Year:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`education[${index}].passing_year`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`education[${index}].passing_year`}
                            component="div"
                          />
                        </div>
                        <div>
                          <label htmlFor={`education[${index}].description`}>
                            Description:
                          </label>
                          <br />
                          <Field
                            as="textarea"
                            className="inputfield"
                            name={`education[${index}].description`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`education[${index}].description`}
                            component="div"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="removeEdubtn"
                          >
                            Remove Education
                          </button>
                        )}
                        <div
                          className="innertemplateEnd"
                        ></div>
                      </div>
                    ))}
                    {arrayHelpers.form.values.education.length === 0 && (
                      <div>No education fields added. Add at least one.</div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          school_name: "",
                          passing_year: "",
                          description: "",
                        })
                      }
                      className="addEdubtn"
                    >
                      Add Education
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="templateEnd"></div>

            <div>
              <h2 className="formHeading"> Experience:</h2>
              <FieldArray name="experience">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.experience.map((exp, index) => (
                      <div key={index} className="dynamicFields">
                        <div>
                          <label htmlFor={`experience[${index}].company_name`}>
                            Company:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`experience[${index}].company_name`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`experience[${index}].company_name`}
                            component="div"
                          />
                        </div>
                        <div>
                          <label htmlFor={`experience[${index}].passing_year`}>
                            Passing Year:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`experience[${index}].passing_year`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`experience[${index}].passing_year`}
                            component="div"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`experience[${index}].responsibilities`}
                          >
                            Responsibilities:
                          </label>
                          <br />
                          <Field
                            as="textarea"
                            className="inputfield"
                            name={`experience[${index}].responsibilities`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`experience[${index}].responsibilities`}
                            component="div"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="removeExpbtn"
                          >
                            Remove Experience
                          </button>
                        )}
                        <div
                          className="innertemplateEnd"
                        ></div>
                      </div>
                    ))}
                    {arrayHelpers.form.values.experience.length === 0 && (
                      <div>No experience fields added. Add at least one.</div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          company_name: "",
                          passing_year: "",
                          responsibilities: "",
                        })
                      }
                      className="addExpbtn"
                    >
                      Add Experience
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="templateEnd"></div>

            <div>
              <h2 className="formHeading">Achievements:</h2>
              <FieldArray name="achievements">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.achievements.map((ach, index) => (
                      <div key={index} className="dynamicFields">
                        <div>
                          <label htmlFor={`achievements[${index}].field`}>
                            Field:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`achievements[${index}].field`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`achievements[${index}].field`}
                            component="div"
                          />
                        </div>
                        <div>
                          <label htmlFor={`achievements[${index}].awards`}>
                            Award:
                          </label>
                          <br />
                          <Field
                            type="text"
                            className="inputfield"
                            name={`achievements[${index}].awards`}
                          />
                          <ErrorMessage
                            className="errormessage"
                            name={`achievements[${index}].awards`}
                            component="div"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="removeAchbtn"
                          >
                            Remove Achievement
                          </button>
                        )}
                        <div
                          className="innertemplateEnd"
                        ></div>
                      </div>
                    ))}
                    {arrayHelpers.form.values.achievements.length === 0 && (
                      <div>No achievement fields added. Add at least one.</div>
                    )}
                    {arrayHelpers.form.values.achievements.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ field: "", awards: "" })
                        }
                        className="addAchbtn"
                      >
                        Add Achievement
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="templateEnd"></div>

            <button className="submitbtn" type="submit" disabled={isSubmitting}>
              {loading ? "Generating Resume..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      {isSubmitted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <CVPreview url={selectedURL} />
          )}
        </div>
      )}

      {loading && (
        <div className="popup">
          <div className="popupLoaderContainer">
            <div class="waveform">
              <div class="waveform__bar"></div>
              <div class="waveform__bar"></div>
              <div class="waveform__bar"></div>
              <div class="waveform__bar"></div>
            </div>

            <p>Generating Your Resume...</p>
          </div>
        </div>
      )}

      {success && (
        <div className="popup">
          <div className="popupContainer">
            <div className="closeIcon">
            <img src={close} className="popupCross" onClick={()=>setSuccess(false)}></img>
            </div>
            <p>Resume Created Successfully!</p>
            <button onClick={() => window.open(selectedURL, "_blank")}>
              Preview
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="popup">
          <div className="popupContainer">
            <div className="closeIcon">
            <img src={close} className="popupCross" onClick={()=>setError(false)}></img>
            </div>
            <p>PDF Generation Failed: {error}</p>
            <button onClick={() => setError(null)}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyForm;