import React, { useRef } from 'react';

import './ImageUpload.scss';
import Button from './Button';

const ImageUpload = ({ id, center }) => {
  const filePickerRef = useRef();

  const pickedHandler = event => {
    console.log(event.target.value);
  };

  const pickImageHandler = params => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={id}
        style={{ display: 'none' }}
        accept=".jpg, .png, .jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
