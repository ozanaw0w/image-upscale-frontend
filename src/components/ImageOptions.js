import React, { useEffect, useState } from 'react';
import { upscale } from '../services/api';
import image5 from '../assets/spin.png';

const ImageOptions = ({ imageUrl, fileType }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [upscaledImageUrl, setUpscaledImageUrl] = useState('');

    const [hide, setHide] = useState(true);

    const [imgLoad, setImgLoad] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setImgLoad(false);
        setImgError(false);
        setUpscaledImageUrl("")
    }, [imageUrl])


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

    if (loading) {
        return (
            <div id="loading">
                <img src={image5} alt="spin" width="32" height="32" />
            </div>
        )
    }

    return (
        <div>
            <span id="urlValidation" className={error ? 'error-message' : ''}>
                {error}
            </span>

            {!imgError && <div className="button-container">
                <button className="btnUpscale" type="button" onClick={handleUpscaleClick}>
                    Upscale Image
                </button>
                <button className="btnDownload" type="button" onClick={handleDownloadClick}>
                    Download Image
                </button>
            </div>}
            {!imgError && <div className="file-type-container">
                <label htmlFor="fileType">File Type:</label>
                <select id="fileType">
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="gif">GIF</option>
                </select>
            </div>}

            <div className="image-preview-container">
                {imageUrl && !upscaledImageUrl && (
                    <div>
                        {!imgError && <h2>Image Preview</h2>}
                        <img id="imagePreview" src={imageUrl} alt="Image Preview" onLoad={() => setImgLoad(true)} onError={() => setImgError(true)} hidden={imgError} />
                        {imgError && <span id="urlValidation" className={error ? 'error-message' : ''}>
                            Error loading image
                        </span>}
                    </div>
                )}
                {upscaledImageUrl && (
                    <div>
                        {!imgError && <h2>Upscaled Image</h2>}
                        <img id="imagePreview" src={upscaledImageUrl} alt="Upscaled" onLoad={() => setImgLoad(true)} onError={() => setImgError(true)} hidden={imgError} />
                        {imgError && <span id="urlValidation" className={error ? 'error-message' : ''}>
                            Error loading image
                        </span>}
                    </div>
                )}
                <div id="example" style={{ display: 'none' }}>
                    <img src="./images/exmaple.png" alt="example" height="auto" width="auto" />
                </div>
            </div>
        </div>
    );
};

export default ImageOptions;
