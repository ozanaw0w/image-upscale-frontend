import image1 from '../assets/123.png';
import image2 from '../assets/132.png';
import image4 from '../assets/icons-delete.png';
import React from 'react';

const InputURL = ({ imageUrl, handleClearIconClick, handleCopyURL, handleImageChange }) => {
    return (
        <div className="input-container">
            <img
                className={imageUrl ? "clearIcon" : 'left-icon'}
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
    );
};

export default InputURL;
