import React, { useState } from 'react';
import Temp1 from '../../images/Template1.png';
import Temp2 from '../../images/Template2.png';
import Temp3 from '../../images/Template3.png';
import arrow from '../../images/arrow.png';
import Carousel from 'react-spring-3d-carousel';
import './carousel.css';
import { Link } from 'react-router-dom';

const Selector = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(null);

  const slides = [
    {
      key: 1,
      content: (
        <img
          className={ currentSlide+1 === selectedTemplateKey ? 'selected' : ''}
          src={Temp1}
          alt="Template 1"
          onClick={() => handleTemplateClick(1)}
        />
      ),
    },
    {
      key: 2,
      content: (
        <img
          className={ currentSlide+1 === selectedTemplateKey ? 'selected' : ''}
          src={Temp2}
          alt="Template 2"
          onClick={() => handleTemplateClick(2)}
        />
      ),
    },
    {
      key: 3,
      content: (
        <img
          className={currentSlide+1  === selectedTemplateKey ? 'selected' : ''}
          src={Temp3}
          alt="Template 3"
          onClick={() => handleTemplateClick(3)}
        />
      ),
    },
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleTemplateClick = (templateKey) => {
    if (currentSlide === templateKey - 1) {
      setSelectedTemplateKey(templateKey);
      // Perform any other actions or logic here when a template image is clicked
      // For example, you can make an API call or update other state variables
      // based on the selected template
    }
  };

  return (
    <div>
      <p className='selectorText'>Select CV Template from below:</p>
      <div style={{ display: 'flex', justifyContent: 'center',paddingTop:"5vh",paddingBottom:"5vh" }}>
        <div style={{ height: '60vh', width: '70vw' }}>
          <Carousel slides={slides} goToSlide={currentSlide} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="prevbutton" onClick={goToPreviousSlide}><span>Previous</span></button>
        <button className="nextbutton" onClick={goToNextSlide}><span>Next</span></button>
      </div>
      {selectedTemplateKey?
       <div style={{ textAlign: 'right',position:"relative",right:"16vw" }}>
        <Link to="/create-cv" state={selectedTemplateKey} style={{textAlign:"center"}}><button className="proceedbutton" style={{textDecoration:"none",verticalAlign: 'middle',color:"white",fontSize:"medium"}}>PROCEED..<img style={{height:"4vh",verticalAlign:"middle"}}src={arrow} /></button></Link>
      </div>
      :
      <></>
      }
    </div>
  );
};

export default Selector;


