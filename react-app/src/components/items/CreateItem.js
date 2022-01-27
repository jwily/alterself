import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { createItem } from "../../store/items";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';

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

    #inventory-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }

    #create-buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-top: 1rem;

        button {
            margin-left: .5rem;
        }
    }

    h2 {
        font-size: 1.25rem;
        margin-bottom: .5rem;
    }
`

const CreateItem = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const charId = useSelector((state) => state.characters.entities.character.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            charId,
            name,
            description,
        }
        const data = await dispatch(createItem(formData));
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
            {!show && <div id="inventory-title">
                <h2>Inventory</h2>
                <button type="button" onClick={() => setShow(true)}><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faShoppingBag} /></button>
            </div>}
            {show && <form onSubmit={handleSubmit} autoComplete="off">
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
                    <label htmlFor="forge-description">Description</label>
                    <textarea type="textarea" id="forge-description" value={description} onChange={updateDescription} rows="5"></textarea>
                </div>
                <div id="create-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                        setShow(false);
                        setName('');
                        setDescription('');
                        setErrors([]);
                    }}>Cancel</button>
                </div>
            </form>}
        </CreateForm>
    )
}

export default CreateItem
