import React, { useEffect, useState } from 'react';
const CVPreview = (props) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // Make a request to your backend API to generate the CV
    // Update the URL to match your backend route
    setPreviewUrl(props.url);
  });

  const handleDownload = () => {
    // Make a request to your backend API to trigger the CV download
    // Update the URL to match your backend route

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = previewUrl;
        link.setAttribute('download', 'cv.pdf');

        // Simulate a click on the link to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary link and URL object
        // link.remove();
        // window.URL.revokeObjectURL(previewUrl);
      
  };

  return (
    <div>
      {previewUrl ? (
        <div style={{height:"60vw",maxHeight:"1000px", minHeight:"500px",width:"70vw",display:"flex",justifyContent:"center",alignItems:"center",paddingBottom:"50px",}}>
          <iframe src={`${previewUrl}#view=fitH`}  width="100%" height="100%" style={{
              border: '1px solid #ccc', // Example border style
              borderRadius: '5px', // Example border radius
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Example box shadow
              paddingBottom:"2vh",
            }}/>
       
          <button onClick={handleDownload}>Download CV</button>
        </div>
      ) : (
        <></>

      )}
    </div>
  );
};

export default CVPreview;
