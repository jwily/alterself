import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { createItem } from "../../store/items";
import { setCharItem } from "../../store/characters";

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

    #forge-name {
        font-size: 1rem;
    }
`

const CreateItem = ({ setAdd }) => {

    const { charId } = useParams();

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
            quantity
        }
        const data = await dispatch(createItem(formData));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        }
        else {
            setName('');
            setDescription('');
            setQuantity(1);
            dispatch(setCharItem(data));
        }
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

    const handleBlur = (e) => {
        if (!e.target.value) {
            setQuantity(0)
        }
    };

    return (
        <CreateForm>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label htmlFor="forge-name">Item Name</label>
                    <input type="text" id="forge-name" value={name} onChange={updateName} />
                </div>
                <div>
                    <label htmlFor="forge-quantity">Quantity</label>
                    <input type="number" id="forge-quantity" value={quantity} min="0" onBlur={handleBlur} onChange={updateQuantity} />
                </div>
                <div>
                    <label htmlFor="forge-description">Description (Optional)</label>
                    <textarea id="forge-description" value={description} onChange={updateDescription} rows="8" />
                </div>
                <div className="create-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                        setAdd(false);
                        setQuantity(1);
                        setName('');
                        setDescription('');
                    }}>Close</button>
                </div>
            </form>
        </CreateForm>
    )
}

export default CreateItem
