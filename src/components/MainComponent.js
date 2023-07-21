import React, { useState } from 'react';
import axios from 'axios';
import image1 from '../assets/123.png';
import image2 from '../assets/132.png';
import image3 from '../assets/bg-color.png';
import image4 from '../assets/icons-delete.png';
import image5 from '../assets/spin.png';

const MainComponent = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [upscaledImageUrl, setUpscaledImageUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const api = axios.create({
        baseURL: 'http://localhost:3001',
    });

    const handleCopyURL = () => {
        const inputElement = document.getElementById('inp');
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        document.execCommand('copy');
        alert('URL copied to clipboard');
    };

    const handleImageChange = (event) => {
        setImageUrl(event.target.value);
        setUpscaledImageUrl('');
        setError('');
    };

    const handleUpscaleClick = async () => {
        try {
            setError('');
            setIsLoading(true);

            const response = await api.post('/upscale', { imageUrl });
            setUpscaledImageUrl(response.data.upscaledImageUrl);

            setIsLoading(false);
        } catch (error) {
            console.error('Error during image upscaling:', error);
            setError('An error occurred during image upscaling.');
            setIsLoading(false);
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
            alert('Failed to download the image. Please try again.');
        }
    };

    const handleClearIconClick = () => {
        setImageUrl('');
        setUpscaledImageUrl('');
        setError('');
    };

    const showImagePreview = imageUrl && !isLoading && !upscaledImageUrl;

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
                <div className="input-container">
                    <img
                        className={imageUrl ? 'clearIcon' : 'left-icon'}
                        src={imageUrl ? image4 : image1}
                        alt={imageUrl ? 'delete' : ''}
                        onClick={imageUrl ? handleClearIconClick : null}
                    />
                    <img className="right-icon" src={image2} alt="" onClick={handleCopyURL} />
                    <input
                        className={imageUrl ? 'input-has-value' : ''}
                        id="inp"
                        type="text"
                        value={imageUrl}
                        onChange={handleImageChange}
                        placeholder="Copy URL here..."
                    />
                </div>
                <div className="button-container">
                    {imageUrl && (
                        <button className="btnUpscale" type="button" onClick={handleUpscaleClick}>
                            Upscale Image
                        </button>
                    )}
                    {imageUrl && (
                        <button className="btnDownload" type="button" onClick={handleDownloadClick}>
                            Download Image
                        </button>
                    )}
                </div>
                <span id="urlValidation" className={error ? 'error-message' : ''}>
                    {error}
                </span>
                {showImagePreview && (
                    <div className="file-type-container">
                        <label htmlFor="fileType">File Type:</label>
                        <select id="fileType">
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                            <option value="gif">GIF</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="image-preview-container">
                {isLoading && (
                    <div id="loading">
                        <img src={image5} alt="spin" width="32" height="32" />
                    </div>
                )}
                {showImagePreview && (
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
            <p className="by">Made By: Dor Ozana</p>
        </div>
    );
};

export default MainComponent;
