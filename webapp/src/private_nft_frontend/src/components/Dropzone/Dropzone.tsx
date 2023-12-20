import React from "react";
import './dropzone.css';
import { Button } from "react-bootstrap";

const Dropzone = (props: {
    setFile: (f: File) => void,
}) => {
    const {setFile} = props;

    return <div
        className={'img-placeholder rounded d-flex flex-column dropzone align-items-center justify-content-center'}
    >
        <input
            type="file"
            accept="image/*"
            id="imageInput"
            className={"hidden"}
            multiple={false}
            onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                    const file = event.target.files[0];
                    setFile(file);
                }
            }}
        />
        <p>Select or drop an image</p>
        <Button onClick={() => {
            document.getElementById('imageInput')?.click();
        }}>Select</Button>
    </div>
}

export default Dropzone;
