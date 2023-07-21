

import React from 'react';

const FileTypeSelector = () => {
    return (
        <div className="file-type-container">
            <label htmlFor="fileType">File Type:</label>
            <select id="fileType">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="gif">GIF</option>
            </select>
        </div>
    );
};

export default FileTypeSelector;
