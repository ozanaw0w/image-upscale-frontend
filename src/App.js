
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainComponent from './components/MainComponent';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState('');
  const [error, setError] = useState({});


  const api = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const clearError = () => {
    setError((prevError) => ({ ...prevError, generalError: '' }));
  };

  useEffect(() => {
    if (error.generalError) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error.generalError]);

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
    setUpscaledImageUrl('');
    setError((prevError) => ({ ...prevError, imageUrl: '' }));
  };

  const handleCopyURL = () => {
    const inputElement = document.getElementById('inp');
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('URL copied to clipboard');
  };

  const handleClearIconClick = () => {
    setImageUrl('');
    setError((prevError) => ({ ...prevError, imageUrl: '' }));
  };

  const handleUpscaleClick = async () => {
    if (!imageUrl.trim()) {
      setError({ ...error, imageUrl: 'Please enter a valid image URL.' });
      return;
    }

    try {
      setIsLoading(true);
      setError({});

      const response = await api.post('/upscale', {
        url: imageUrl,
      });

      setIsLoading(false);
      setUpscaledImageUrl(response.data.upscaledImageUrl);
    } catch (error) {
      setIsLoading(false);
      setError({ ...error, generalError: 'Failed to upscale the image.' });
    }
  };

  const handleDownloadClick = async () => {
    try {
      let imageUrlToDownload = imageUrl;

      if (upscaledImageUrl) {
        imageUrlToDownload = upscaledImageUrl;
      } else if (!imageUrl) {
        alert('Please enter a valid URL.');
        return;
      }

      const response = await fetch(imageUrlToDownload);
      const blob = await response.blob();

      const fileType = document.getElementById('fileType').value;
      const extension = '.' + fileType;

      const imageURL = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = imageURL;

      const fileName = new Date().getTime() + extension;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error during image download:', error);
      setError({ ...error, generalError: 'Failed to download the image. Please try again.' });
    }
  };

  return (
    <div>
      <MainComponent
        imageUrl={imageUrl}
        isLoading={isLoading}
        upscaledImageUrl={upscaledImageUrl}
        error={error}
        onImageChange={handleImageChange}
        onClearIconClick={handleClearIconClick}
        onCopyURL={handleCopyURL}
        onUpscaleClick={handleUpscaleClick}
        onDownloadClick={handleDownloadClick}
      />
    </div>
  );
};

export default App;
