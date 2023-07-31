
import React, { useState, useRef } from 'react';
import InputURL from './components/InputURL';
import ImageOptions from './components/ImageOptions';
import mainLogo from './assets/bg-color.png';


const App = () => {

  const inputUrlRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");



  return (
    <div className="container">
      <div className="gradient"></div>
      <div className="navbar">
        <div className="text-nav">
          <p className="text-nav-unlimited">Unlimited</p>
        </div>
      </div>
      <div className="image-container">
        <img src={mainLogo} alt="image_main" />
        <h2 className="text__gradient">Download Image</h2>
        <p className="text__desc">Enter the URL of the image you want to download:</p>
        <InputURL ref={inputUrlRef} onChangeValue={setImageUrl} />
        {imageUrl && <ImageOptions imageUrl={imageUrl} fileType="png" />}
      </div>
    </div>
  );
};

export default App;
