
import React, { useState, useEffect, useRef } from 'react';
import { upscale } from './services/api';
import InputURL from './components/InputURL';
import ImageOptions from './components/ImageOptions';
import image3 from './assets/bg-color.png';
import axios from 'axios';

const App = () => {

  const inputUrlRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="container">
      <div className="gradient"></div>
      <div className="navbar">
        <div className="text-nav">
          <p className="text-nav-unlimited">Unlimited</p>
        </div>
      </div>
      <div className="image-container">
        <img src={image3} alt="image_main" />
        <h2 className="text__blue__gradient">Download Image</h2>
        <p className="text__desc">Enter the URL of the image you want to download:</p>
        <InputURL ref={inputUrlRef} onChangeValue={setImageUrl} />
        {imageUrl && <ImageOptions imageUrl={imageUrl} />}
      </div>
    </div>
  );
};

export default App;
