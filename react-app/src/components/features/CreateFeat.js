import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { createFeat } from "../../store/features";

import { setErrors } from "../../store/help";

const CreateForm = styled.div`
    div {
        display: flex;
        flex-direction: column;
    }

    input, textarea {
        color: #ffc800;
    }

    textarea {
        resize: none;
    }

    label {
        margin-bottom: .5rem;
        margin-top: .5rem;
        margin-left: .15rem;
        font-size: .95rem;
    }

    .create-buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-top: .25rem;
        margin-bottom: .5rem;

        button {
            margin-left: .25rem;
        }
    }

    #feat-name {
        font-size: 1rem;
    }
`

const CreateFeat = ({ setAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const charId = useSelector((state) => state.characters.entities.character.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
        }
        const data = await dispatch(createFeat(formData));
        if (data) {
            dispatch(setErrors(data));
        } else {
            setName('');
            setDescription('');
        }
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    return (
        <CreateForm>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label htmlFor="feat-name">Feature or Trait Name</label>
                    <input type="text" id="feat-name" value={name} onChange={updateName} />
                </div>
                <div>
                    <label htmlFor="feat-description">Description (Optional)</label>
                    <textarea id="feat-description" value={description} onChange={updateDescription} rows="8" />
                </div>
                <div className="create-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                        setAdd(false);
                        setName('');
                        setDescription('');
                    }}>Close</button>
                </div>
            </form>
        </CreateForm>
    )
}

export default CreateFeat
