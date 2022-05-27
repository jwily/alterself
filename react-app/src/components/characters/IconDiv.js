import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import { deleteImage } from "../../store/images"

const IconHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: .5rem;
    margin-right: 2.5rem;
`

const Icon = styled.div`
    background-color: ${props => props.color};
    width: 6rem;
    height: 6rem;
    font-size: 2.5rem;
    border-radius: 10rem;
    font-family: 'Cormorant SC', serif;

    margin-top: .25rem;
    margin-bottom: .85rem;
    margin-left: .5rem;
    margin-right: .5rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Portrait = styled.img`
    object-fit: cover;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 10rem;
`

const colorGen = (char) => {
    if (!char.id) return `rgb(110, 110, 110)`;
    let red = (char.str + char.con) <= 40 ? (char.str + char.con) : 40;
    let green = (char.wis + char.cha) <= 40 ? (char.wis + char.cha) : 40;
    let blue = (char.int + char.dex) <= 40 ? (char.int + char.dex) : 40;
    return `rgb(${red * 4.5 + 20}, ${green * 4.5 + 20}, ${blue * 4.5 + 20})`
}

const IconDiv = ({ edit, img, char, name, status, setStatus, setErrors, setImg, setChanged }) => {

    console.log(colorGen(char))

    const dispatch = useDispatch();
    const images = useSelector(state => state.images.entities);

    const handleDelete = async (e) => {
        e.preventDefault();
        if (img) {
            const data = await dispatch(deleteImage(img));
            if (data.errors) {
                setErrors(data.errors);
            }
            else {
                setImg(0);
                setChanged(true);
                // if (edit) {
                //     const res = await (dispatch(editImage({ charId: char.id, imgId: 0 })));
                //     if (res.errors) {
                //         setErrors(res.errors);
                //     }
                // }
            }
        }
    }

    return <IconHolder>
        <Icon color={colorGen(char)}>
            {img ?
                <Portrait src={images[img]?.url} alt="new character portrait" /> :
                name[0]?.toUpperCase()}
        </Icon>
        {status !== 'upload' ?
            <>
                <button id="choose-btn"
                    // onClick={() => {
                    //     setStatus('choose')
                    // }}
                    type="button">
                    Browse
                </button>
                <button
                    onClick={() => {
                        setStatus('upload')
                    }}
                    type="button">
                    Upload
                </button>
            </> :
            <>
                {/* <form onSubmit={handleDelete}>
                    <button id="choose-btn"
                        type="submit">
                        Clear
                    </button>
                </form> */}
                <button id="choose-btn"
                    type="button"
                    onClick={() => {
                        setImg(0);
                        setChanged(true);
                    }}>
                    Clear
                </button>
                <button
                    onClick={() => {
                        setStatus('');
                    }}
                    type="button">
                    Return
                </button>
            </>}
    </IconHolder>
}

export default IconDiv
