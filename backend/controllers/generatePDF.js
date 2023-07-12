import pkg from '@adobe/pdfservices-node-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const { Credentials, ExecutionContext, FileRef, Error, DocumentMerge } = pkg;

async function generatePDFDocument(template, jsonData, outputFilepath) {
  const OUTPUT = outputFilepath;

  // If our output already exists, remove it so we can run the application again.
  if (fs.existsSync(OUTPUT)) {
    fs.unlinkSync(OUTPUT);
  }

  const INPUT = template; // template file path
  const JSON_INPUT = jsonData;

  // Set up our credentials object.
  const credentials = Credentials.servicePrincipalCredentialsBuilder()
    .withClientId(clientId)
    .withClientSecret(clientSecret)
    .build();

  // Create an ExecutionContext using credentials
  const executionContext = ExecutionContext.create(credentials);

  // This creates an instance of the DocumentMerge operation we're using, as well as specifying output type (PDF)
  const documentMerge = DocumentMerge;
  const documentMergeOptions = documentMerge.options;
  const options = new documentMergeOptions.DocumentMergeOptions(
    JSON_INPUT,
    documentMergeOptions.OutputFormat.PDF
  );

  // Create a new operation instance using the options instance.
  const documentMergeOperation = documentMerge.Operation.createNew(options);

  // Set operation input document template from a source file.
  const input = FileRef.createFromLocalFile(INPUT);
  documentMergeOperation.setInput(input);

  try {
    // Execute the operation and Save the result to the specified location.
    const result = await documentMergeOperation.execute(executionContext);
    await result.saveAsFile(OUTPUT);
    console.log('PDF document generated successfully.');
  } catch (err) {
    if (err instanceof Error.ServiceApiError || err instanceof Error.ServiceUsageError) {
      throw err;
    } else {
      console.log('Exception encountered while executing operation', err);
    }
  }
}

export default generatePDFDocument;

// Call the function to generate the PDF document


