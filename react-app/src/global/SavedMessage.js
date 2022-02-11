import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const SavedSpan = styled.span`

    margin-left: .25rem;
    display: flex;
    align-items: center;
    font-size: .85rem;
`

const SavedMessage = ({ setSaved }) => {

    const span = useRef(null);

    useEffect(() => {
        const fadeOut = setTimeout(() => {
            span.current.style.transition = 'opacity .25s';
            span.current.style.opacity = 0;
        }, 850)
        const unmount = setTimeout(() => {
            setSaved(false);
        }, 1100)
        return (() => {
            clearTimeout(fadeOut);
            clearTimeout(unmount);
        })
    }, [setSaved])

    return (
        <SavedSpan ref={span}>Saved!</SavedSpan>
    )

};

export default SavedMessage;
