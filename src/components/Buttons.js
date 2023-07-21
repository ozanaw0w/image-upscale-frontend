// Buttons.js

import React from 'react';

const Buttons = ({ imageUrl, isLoading, upscaledImageUrl, handleUpscaleClick, handleDownloadClick }) => {
    return (
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
    );
};

export default Buttons;
