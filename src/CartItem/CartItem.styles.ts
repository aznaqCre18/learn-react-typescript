import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Poppins;
    border-bottom: 1px solid lightblue;
    padding: 20px 0;
    align-items: center;

    .left {
        width: 70%
    }
    
    div {
        flex: 1;
    }

    .information {
        display: flex;
        justify-content: space-between;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    img {
        max-height: 200px;
        object-fit: cover;
        margin-left: 20px;
        width: 30%;
    }
`;