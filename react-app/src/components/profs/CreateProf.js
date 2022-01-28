import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { createProf } from "../../store/profs";

const CreateForm = styled.div`
    div {
        display: flex;
        flex-direction: column;
    }

    textarea {
        resize: none;
    }

    label {
        margin-bottom: .5rem;
        margin-top: .5rem;
    }

    .create-buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-top: .25rem;
        margin-bottom: .5rem;

        button {
            margin-left: .5rem;
        }
    }
`

const CreateProf = ({ setMode }) => {
    const [errors, setErrors] = useState([]);
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
        const data = await dispatch(createProf(formData));
        if (data) {
            setErrors(data);
        }
        setName('');
        setDescription('');
        setErrors([]);
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
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor="prof-name">Name</label>
                    <input type="text" id="prof-name" required maxLength="255" value={name} onChange={updateName} />
                </div>
                <div>
                    <label htmlFor="prof-description">Description (Optional)</label>
                    <textarea id="prof-description" value={description} onChange={updateDescription} rows="8" />
                </div>
                <div className="create-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                        setMode('base');
                        setName('');
                        setDescription('');
                        setErrors([]);
                    }}>Close</button>
                </div>
            </form>
        </CreateForm>
    )
}

export default CreateProf
