import React, {
    useState,
    // useCallback,
    useEffect
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import debounce from "lodash/debounce"

import { deleteItem } from "../../store/items";
import { editItem } from "../../store/items";
import { editQuantity } from "../../store/items";

import { updateChar, delResource } from "../../store/characters";

import { setErrors } from "../../store/help";
import SavedMessage from "../../global/SavedMessage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearchPlus,
    faSearchMinus
} from '@fortawesome/free-solid-svg-icons';

const Card = styled.li`

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: .25rem;

        button {
            margin-left: .25rem;
        }
    }

    .edit-item-form {
        display: flex;
        flex-direction: column;
    }

    .edit-name-field {
        font-size: 1rem;
        padding: .5rem;
        width: 12.5rem;
    }

    .edit-quant-field {
        color: #ffcd00;
        width: 4rem;
    }

    .item-delete-confirm {
        justify-self: end;
    }

    .item-reveal {
        margin-left: .5rem;
    }

    input.edit-name-field {
        color: #ffcd00;
    }

    p {
        padding: .5rem;
        margin: .5rem 0;
        background-color: rgba(51, 48, 47, 0.25);
        font-size: .85rem;
    }

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    textarea {
        margin-top: .5rem;
        resize: none;
        color: #ffcd00;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const dbItemSave = debounce(async (formData, dispatch) => {
    const data = await dispatch(editQuantity(formData));
    if (data.errors) {
        dispatch(setErrors(data.errors))
    } else {
        dispatch(updateChar(data))
    }
}, 350)

const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [changed, setChanged] = useState(false);
    const [saved, setSaved] = useState(false);

    const [name, setName] = useState(item.name);
    const [description, setDesc] = useState(item.description)
    const [quantity, setQuant] = useState(item.quantity)

    // const debouncedSave = useCallback(
    //     debounce(async (formData) => {
    //         const data = await dispatch(editQuantity(formData));
    //         if (data.errors) {
    //             dispatch(setErrors(data.errors))
    //         } else {
    //             dispatch(updateChar(data))
    //         }
    //     }, 350),
    //     [],
    // );

    useEffect(() => {
        if (changed) {
            const formData = {
                itemId: item.id,
                quantity: parseInt(quantity, 10) || 0
            }
            dbItemSave(formData, dispatch);
        }
    }, [dispatch, item.id, quantity, changed])

    const submitEdit = async (e) => {
        e.preventDefault();
        if (saved) return;
        const formData = {
            itemId: item.id,
            name,
            quantity: parseInt(quantity, 10) || 0,
            description
        };
        const data = await dispatch(editItem(formData));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        } else {
            setSaved(true);
            dispatch(updateChar(data));
        }
    }

    const clickLook = () => {
        setShow(!show);
        setConfirm(false);
        setName(item.name);
        setDesc(item.description);
        setSaved(false);
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        const data = await dispatch(deleteItem(id));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        } else {
            data.arrName = 'itemsById'
            dispatch(delResource(data));
        }
    }

    const clickDelete = () => {
        setConfirm(!confirm);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const quantChange = (e) => {
        setChanged(true);
        setQuant(e.target.value);
    }

    const descChange = (e) => {
        setDesc(e.target.value);
    }

    const handleBlur = (e) => {
        if (e.target.value < 0) {
            setQuant(item.quantity);
        } else if (!e.target.value) {
            setQuant(0);
        }
    };

    return (
        <Card>
            <form className="edit-item-form" id={`edit-item-${item.id}`} onSubmit={submitEdit} autoComplete="off">
                <div className="title">
                    {!show ? <span className="edit-name-field">{item.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} spellCheck={false} />}
                    <div>
                        <input className="edit-quant-field" value={quantity} min="0" onChange={quantChange} onBlur={handleBlur} type="number" />
                        <button type="button" className="item-reveal" onClick={clickLook}><FontAwesomeIcon icon={!show ? faSearchPlus : faSearchMinus} /></button>
                    </div>
                </div>
                {show && <textarea value={description} onChange={descChange} rows="8" />}
            </form>
            {
                show && <div className="buttons">
                    {saved ? <SavedMessage setSaved={setSaved} /> : <span></span>}
                    {!confirm ?
                        <div>
                            <button type="submit" form={`edit-item-${item.id}`}>Update</button>
                            <button type='button' onClick={clickDelete}>Delete</button>
                        </div> :
                        <form onSubmit={(e) => handleDelete(e, item.id)} className='item-delete-confirm'>
                            <button type='submit'>Confirm Delete</button>
                            <button type='button' onClick={clickDelete}>Cancel</button>
                        </form>}
                </div>
            }
        </Card >
    )
}

export default ItemCard;
