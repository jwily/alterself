import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteChar } from "../../store/characters";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserSlash,
} from '@fortawesome/free-solid-svg-icons';

const Content = styled.div`
    form > div {
        width: 17.5rem;
    }

    p {
        margin-top: 1rem;
        text-align: center;
        font-size: 1.15rem;
        color: rgb(236, 52, 35);
    }

    p span {
        color: rgb(236, 52, 35);
    }
`

const DeleteCharModal = ({ char }) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <>
            <button type='button' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faUserSlash} /></button>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <Content className="modal-content">
                    <h2>A fresh start</h2>
                    <form onSubmit={(e) => handleDelete(e, char.id)}>
                        <div>
                            <p>Delete {char.name}, the {char.race} {char.class}?</p>
                        </div>
                        <div className="modal-btns">
                            <button type='submit'>Confirm</button>
                            <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </form>
                </Content>
            </Modal>}
        </>
    )
}

export default DeleteCharModal;
