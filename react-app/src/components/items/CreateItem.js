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
`

const CreateItem = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const charId = useSelector((state) => state.characters.entities.character.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
            quantity,
        }
        const data = await dispatch(createItem(formData));
        if (data) {
            setErrors(data);
        }
        setName('');
        setDescription('');
        setQuantity(1);
        setErrors([]);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
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
                    <input type="number" min="1" id="forge-quantity" value={quantity} onChange={updateQuantity}
                        onBlur={() => {
                            if (!quantity) setQuantity(1);
                        }} />
                </div>
                <div>
                    <label htmlFor="forge-description">Description</label>
                    <textarea type="textarea" id="forge-description" value={description} onChange={updateDescription} rows="5"></textarea>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </CreateForm>
    )
}

export default CreateItem
