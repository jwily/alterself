import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { createProf } from "../../store/profs";
import { setResource } from "../../store/characters";

import { setErrors } from "../../store/help";

const CreateForm = styled.div`
    div {
        display: flex;
        flex-direction: column;
    }

    input, textarea {
        color: #ffcd00;
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

    #prof-name {
        font-size: 1rem;
    }
`

const CreateProf = ({ setAdd }) => {

    const { charId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
        }
        const data = await dispatch(createProf(formData));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        } else {
            setName('');
            setDescription('');
            data.arrName = 'profsById'
            dispatch(setResource(data));
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
                    <label htmlFor="prof-name">Proficiency Name or Category</label>
                    <input type="text" id="prof-name" value={name} onChange={updateName} spellCheck={false} />
                </div>
                <div>
                    <label htmlFor="prof-description">Description (Optional)</label>
                    <textarea id="prof-description" value={description} onChange={updateDescription} rows="8" />
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

export default CreateProf
