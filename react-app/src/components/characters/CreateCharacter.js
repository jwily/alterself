import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { createChar } from "../../store/characters";

const CreateForm = styled.form`
    margin: 1rem;
    display: flex;
    flex-direction: column;

    div {
        width: 22.5rem;
        display: flex;
        justify-content: space-between;
        margin: .5rem;
    }

    input {
        width: 15rem;
    }
`

const CreateCharacter = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [background, setBackground] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            race,
            charClass,
            background
        }
        const data = await dispatch(createChar(formData));
        if (data) {
            setErrors(data)
        }
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateRace = (e) => {
        setRace(e.target.value);
    };

    const updateClass = (e) => {
        setCharClass(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };

    return (
        <CreateForm onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="create-name">Name</label>
                <input name="name" type="text" id="create-name" required maxlength="255" value={name} onChange={updateName} />
            </div>
            <div>
                <label htmlFor="create-race">Race</label>
                <input name="race" type="text" id="create-race" required maxlength="40" value={race} onChange={updateRace} />
            </div>
            <div>
                <label htmlFor="create-char-class">Class</label>
                <input name="char_class" type="text" id="create-char-class" required maxlength="40" value={charClass} onChange={updateClass} />
            </div>
            <div>
                <label htmlFor="create-background">Background</label>
                <input name="background" type="text" id="create-background" required maxlength="40" value={background} onChange={updateBackground} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </CreateForm >
    )
}

export default CreateCharacter
