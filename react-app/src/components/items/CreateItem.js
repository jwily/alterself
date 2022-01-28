import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { createItem } from "../../store/items";

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

    #create-buttons {
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

const CreateItem = ({ setMode }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const charId = useSelector((state) => state.characters.entities.character.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
            quantity
        }
        const data = await dispatch(createItem(formData));
        if (data) {
            setErrors(data);
        }
        setName('');
        setDescription('');
        setQuantity(1)
        setErrors([]);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
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
                    <label htmlFor="forge-name">Name</label>
                    <input type="text" id="forge-name" required maxLength="255" value={name} onChange={updateName} />
                </div>
                <div>
                    <label htmlFor="forge-quantity">Quantity</label>
                    <input type="number" id="forge-quantity" value={quantity} onChange={updateQuantity} min="1" />
                </div>
                <div>
                    <label htmlFor="forge-description">Description (Optional)</label>
                    <textarea id="forge-description" value={description} onChange={updateDescription} rows="5" />
                </div>
                <div id="create-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                        setMode('base');
                        setQuantity(1);
                        setName('');
                        setDescription('');
                        setErrors([]);
                    }}>Close</button>
                </div>
            </form>
        </CreateForm>
    )
}

export default CreateItem
