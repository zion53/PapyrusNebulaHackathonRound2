# Resume Builder API

The Resume Builder API allows you to generate professional resumes in PDF format based on various templates. This API provides an endpoint for submitting resume data and receiving the generated PDF resume as a response.

## Endpoint

### `POST /resume`

Submit the resume data and receive the generated PDF resume as a response.

#### Request Headers

- `Content-Type: application/json`
- `Accept: application/pdf`


**Parameters**

| Parameter              | Type     | Required | Description                     |
|------------------------|----------|----------|---------------------------------|
| template_id            | string   | Yes      | ID of the document template.    |
| personal_information   | object   | Yes      | User's personal information.    |
| job_title              | string   | Yes      | Job title of the user.          |
| career_objective       | string   | Yes      | Career objective of the user.   |
| skills                 | string[] | Yes      | Array of user's skills.         |
| education              | object[] | Yes      | Array of user's education.      |
| experience             | object[] | Yes      | Array of user's experience.     |
| achievements           | object[] | Yes      | Array of user's achievements.   |

**Personal Information Object**

| Property        | Type   | Required | Description           |
|-----------------|--------|----------|-----------------------|
| name            | string | Yes      | User's name.          |
| last_name       | string | Yes      | User's last name.     |
| email_address   | string | Yes      | User's email address. |
| phone_number    | string | Yes      | User's phone number.  |
| linkedin_url    | string | Yes      | User's LinkedIn URL.  |

**Education Object**

| Property        | Type   | Required | Description            |
|-----------------|--------|----------|------------------------|
| school_name     | string | Yes      | School name.           |
| passing_year    | string | Yes      | Year of passing.       |
| description     | string | Yes      | Description of education. |

**Experience Object**

| Property        | Type   | Required | Description             |
|-----------------|--------|----------|-------------------------|
| company_name    | string | Yes      | Company name.           |
| passing_year    | string | Yes      | Year of passing.        |
| responsibilities | string | Yes      | Job responsibilities.   |

**Achievement Object**

| Property        | Type   | Required | Description          |
|-----------------|--------|----------|----------------------|
| field           | string | Yes      | Achievement field.   |
| awards          | string | Yes      | Achievement awards.  |

**Request Example:**

```json
POST /api/resume

{
  "template_id": "template_id_value",
  "personal_information": {
    "name": "John",
    "last_name": "Doe",
    "email_address": "john.doe@example.com",
    "phone_number": "1234567890",
    "linkedin_url": "https://linkedin.com/johndoe"
  },
  "job_title": "Software Developer",
  "career_objective": "Experienced software developer with a passion for creating innovative applications.",
  "skills": ["JavaScript", "React", "Node.js"],
  "education": [
    {
      "school_name": "ABC University",
      "passing_year": "2020",
      "description": "Bachelor's Degree in Computer Science"
    }
  ],
  "experience": [
    {
      "company_name": "XYZ Inc.",
      "passing_year": "2021",
      "responsibilities": "Developing and maintaining web applications"
    }
  ],  
  "achievements": [
    {
      "field": "Hackathon",
      "awards": "1st Place"
    }
 ]
}
```

**Note:**
Template IDs are numbered from 1 to 3.

## Response Headers

| Header          | Description         |
|-----------------|---------------------|
| Content-Type    | application/pdf     |


**Sample Response:**
[Download PDF](https://drive.google.com/file/d/1306u9NOiyjEwwAg6_WNFCDu9PQ6L2fM-/view?usp=sharing)

## Error Codes

| Code | Description                |
|------|----------------------------|
| 400  | Bad Request                |
| 401  | Unauthorized               |
| 404  | Template not found         |
| 500  | Internal Server Error      |


**NOTE:** 

 1. Since I was creating user interface and Api Specifications don't allow for passing api key or Client Id and Secret, I have stored them in env and Authentication response works on them.

 2. Incase you want to test that, change any of them and reload the server .
 Close the running server and then restart to see the changes. 
 It will not work unless you restart it completely

Authentication error will be more usable if 
applied on users of the frontend by generating api keys for each session after validating the user.