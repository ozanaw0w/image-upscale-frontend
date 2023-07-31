import urlIcon from '../assets/123.png';
import copyIcon from '../assets/132.png';
import iconDelete from '../assets/icons-delete.png';
import React, { useImperativeHandle, useRef, useState } from 'react';

const InputURL = React.forwardRef(({ onChangeValue }, ref) => {

    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    const clearInput = () => {
        inputRef.current.value = "";
        onChangeValue("");
        setValue("")
    }

    const copyValue = () => {
        if (value !== '') {
            inputRef.current.select();
            inputRef.current.setSelectionRange(0, 99999);
            document.execCommand('copy');
            inputRef.current.setSelectionRange(value.length, value.length);
            alert('URL copied to clipboard');
        }
    }

    const handleImageURLChanged = (e) => {
        setValue(e.target.value);
        onChangeValue(e.target.value);
    }

    useImperativeHandle(ref, () => ({
        clear: () => {
            clearInput();
        },
        value: inputRef.current.value
    }), [inputRef.current])

    return (
        <div className="input-container">
            <img
                className={value ? "clearIcon" : 'left-icon'}
                src={value ? iconDelete : urlIcon}
                alt={value ? 'delete' : ''}
                onClick={value ? clearInput : undefined}
            />
            <img className="right-icon" src={copyIcon} alt="" onClick={copyValue} />
            <input
                ref={inputRef}
                className={value ? 'input-has-value' : ''}
                id="inp"
                type="text"
                onChange={handleImageURLChanged}
                placeholder="Copy URL here..."
            />
        </div>
    );
});

export default InputURL;
