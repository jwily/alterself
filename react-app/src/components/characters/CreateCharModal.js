import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateCharacter from './CreateCharacter';

function CreateCharModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                }}>
                    <CreateCharacter setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateCharModal;
