import React, { useEffect, useState } from 'react';
import { upscale } from '../services/api';
import loadingIcon from '../assets/spin.png';
import './ImageOptions.css';

const ImageOptions = ({ imageUrl, fileType }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [upscaledImageUrl, setUpscaledImageUrl] = useState('');
    const [sliderPosition, setSliderPosition] = useState(50);
    const [selectedFileType, setSelectedFileType] = useState('png');


    const handleSliderChange = (event) => {
        const newPosition = event.target.value;
        setSliderPosition(newPosition);
    };


    useEffect(() => {
        setUpscaledImageUrl("")
        setSliderPosition(50);
    }, [imageUrl])


    const handleFileTypeChange = (event) => {
        setSelectedFileType(event.target.value);
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

            const fileType = selectedFileType;
            const extension = '.' + fileType;

            const response = await fetch(imageUrlToDownload);
            const blob = await response.blob();

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

    const handleUpscaleClick = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await upscale(imageUrl);
            setUpscaledImageUrl(response.data.upscaledImageUrl);

            setLoading(false);
        } catch (error) {
            console.error('Error during image upscaling:', error);
            setError('An error occurred during image upscaling.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div id="loading">
                <img src={loadingIcon} alt="spin" width="32" height="32" />
            </div>
        )
    }

    return (
        <div>
            {error && <span className="error-message">{error}</span>}
            <div className="image-options-container">

                {!upscaledImageUrl && (
                    <button className="btnUpscale" type="button" onClick={handleUpscaleClick}>
                        Upscale Image
                    </button>
                )}
                {imageUrl && !upscaledImageUrl && (
                    <div>
                        <h2>Image Preview</h2>
                        <img src={imageUrl} alt="Image Preview" />
                    </div>
                )}

                {upscaledImageUrl && (
                    <div className="image-comparison-container">
                        <div className="image-preview-container">
                            {imageUrl && !upscaledImageUrl && (
                                <div>
                                    <h2>Image Preview</h2>
                                    <img src={imageUrl} alt="Image Preview" />
                                </div>
                            )}
                            {upscaledImageUrl && (
                                <div>
                                    <h2 className='upscale-title'>Upscale</h2>
                                    <div className="image-comparison">
                                        <div
                                            className="image-comparison__image"
                                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                                        >
                                            <img src={upscaledImageUrl} alt="After Upscale" />
                                        </div>
                                        <div
                                            className="image-comparison__image"
                                            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                                        >
                                            <img src={imageUrl} alt="Before Upscale" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {loading && (
                                <div id="loading">
                                    <img src={loadingIcon} alt="spin" width="32" height="32" />
                                </div>
                            )}
                            {error && <span className="error-message">{error}</span>}
                        </div>
                        <div className="controls-container">
                            <div className="slider-container">
                                <p>Before</p>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={sliderPosition}
                                    onChange={handleSliderChange}
                                    className="slider"
                                />
                                <p>After</p>
                            </div>
                            <div className="file-type-container">
                                <label htmlFor="fileType">File Type:</label>
                                <select id="fileType" value={selectedFileType} onChange={handleFileTypeChange}>
                                    <option value="png">PNG</option>
                                    <option value="jpg">JPG</option>
                                </select>
                            </div>
                            <div className="download-container">
                                <button className="btnDownload" type="button" onClick={handleDownloadClick}>
                                    Download Image
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageOptions;
