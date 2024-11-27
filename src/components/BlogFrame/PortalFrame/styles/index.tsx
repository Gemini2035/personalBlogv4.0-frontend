import { Flex, styled } from "@packages/ui";

export const StyledPortalFrame = styled(Flex)`
    min-height: 100vh;
    min-width: 500px;
    /* overflow-x: hidden; */
    background-color: ${({ theme }) => theme.colors.background};

    .router-container {
        flex-shrink: 0;
        min-height: 100vh;
        flex: 1;
        display: flex;
        /* justify-content: center; */
        align-items: center;
    };

    .router-content {
        transition: transform 1s ease;

        &.shrink {
            height: 80vh;
            width: 100%;
            overflow: hidden;
            transform: perspective(200vw) rotateY(-15deg) scale(0.95) translateX(-1vw);
            transform-origin: right center;
            border: 1px solid #000
        }
    }
`