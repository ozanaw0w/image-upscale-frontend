// ImageContainer.js
import image5 from '../assets/spin.png';
import React from 'react';

const ImageContainer = ({ imageUrl, isLoading, upscaledImageUrl }) => {
    return (
        <div className="image-container">
            <img src={imageUrl} alt="image_main" />
            {isLoading && (
                <div id="loading">
                    <img src={image5} alt="spin" width="32" height="32" />
                </div>
            )}
            {imageUrl && !isLoading && !upscaledImageUrl && (
                <div>
                    <h2>Image Preview</h2>
                    <img id="imagePreview" src={imageUrl} alt="Image Preview" />
                </div>
            )}
            {upscaledImageUrl && (
                <div>
                    <h2>Upscaled Image</h2>
                    <img id="imagePreview" src={upscaledImageUrl} alt="Upscaled" />
                </div>
            )}
            <div id="example" style={{ display: 'none' }}>
                <img src="./images/exmaple.png" alt="example" height="auto" width="auto" />
            </div>
        </div>
    );
};

export default ImageContainer;
