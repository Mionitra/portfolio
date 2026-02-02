import React from 'react'
import styled from 'styled-components'

// npm i styled-components

const CursorEffect = styled.div.attrs(props => ({
    style: {
        left: props.x,
        top: props.y
    }
}))`
    background-color: white;
    position: absolute;
    border-radius: 100%;
    mix-blend-mode: difference;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default CursorEffect