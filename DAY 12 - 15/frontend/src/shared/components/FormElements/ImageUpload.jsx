import React, { useEffect, useRef, useState } from 'react';
import './ImageUpload.css';
import './Input.css';
import Button from './Button';

function ImageUpload(props) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const filePickRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickImageHandler = () => {
        filePickRef.current.click();
    };

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = false;
        
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validTypes.includes(pickedFile.type)) {
                setFile(pickedFile);
                setIsValid(true);
                fileIsValid = true;
            } else {
                setIsValid(false);
                fileIsValid = false;
                setFile(null);
            }
        } else {
            setIsValid(false);
            setFile(null);
        }

        props.onInput(props.id, pickedFile || null, fileIsValid);
    };

    return (
        <div className="form-control">
            <input
                type="file"
                id={props.id}
                ref={filePickRef}
                style={{ display: 'none' }}
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl ? <img src={previewUrl} alt="Preview" /> : <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p className="error-text">{props.errorText || "Invalid file. Please select a valid image."}</p>}
        </div>
    );
}

export default ImageUpload;
