import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { addImage } from "../../store/images";

const UploadForm = styled.form`
    width: 23.5rem;
    height: 14rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    #file-name {
        font-size: .85rem;
        color: rgb(200, 200, 200);

        span {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        margin-bottom: .5rem;
    }

    #upload-form {
        display: flex;
        flex-direction: column;
        align-items: start;

        div {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    #upload-text {
        display: flex;
        flex-direction: column;
    }

    label {
        cursor: pointer;
        border: 1px solid whitesmoke;
        padding: .5rem;
    }

    input {
        display: none;
    }
`

const UploadPicture = ({ closeScript, setStatus, setImg, setErrors, changed, setChanged }) => {

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image && changed) {
            const formData = new FormData();
            formData.append("image", image);

            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true);

            // const data = await dispatch(createImage(formData));
            // if (data.errors) {
            //     setErrors(data.errors);
            // }
            // else {
            //     setImg(data.id);
            //     setChanged(false);
            // }

            // setImageLoading(false)

            const res = await fetch('/api/images', {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                dispatch(addImage(data));
                setImg(data.id);
                setImageLoading(false);
                setChanged(false);
            }
            else {
                setImageLoading(false);
                console.log("error");
            }


        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setChanged(true)
        setImage(file);
    }

    return (
        <UploadForm onSubmit={handleSubmit}>
            <div id="upload-form">
                <div id="file-name">
                    <span>
                        {image ? image.name : 'No file chosen'}
                    </span>
                </div>
                <div>
                    <label>
                        Choose a File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                    </label>
                    {imageLoading ? <p>Loading...</p> :
                        <button type="submit">Submit</button>}
                </div>
            </div>
            <div id="upload-text">
                <p>.png, .jpg, .jpeg, and .gif files permitted.</p>
                <p>A square portrait of your character works best!</p>
            </div>
            <div className="modal-btns">
                {/* <button type="button"
                    onClick={() => {
                        setStatus('')
                    }}>Back to Create</button> */}
                <button type="button" onClick={closeScript}>Close</button>
            </div>
        </UploadForm >
    )
}

export default UploadPicture;
