import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div`
    margin: 3.5rem;
`;

export const IconButtonCust = styled(IconButton)`
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 100;
    background-color: #77777726;
`;