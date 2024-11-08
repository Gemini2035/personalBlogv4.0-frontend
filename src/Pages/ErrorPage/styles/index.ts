import { styled, Flex } from '@packages/ui'

export const StyledErrorPage = styled(Flex)`
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};

    .maintain {
        width: 400px;
    
        .icon {
            text-align: center;
        }

        .warning-banner {
            border: solid ${({ theme }) => theme.colors.warning};
            border-width: 1px 10px;
            text-align: center;
            padding: 5px 0
        }
        
        .title {
            margin-top: 15px;
            position: relative;

            .warning-icon {
                width: 20px;
                height: auto;
                animation: blink-animation 1.5s infinite;


                @keyframes blink-animation {
                    0% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            }

            &::before {
                content: '';
                width: 70%;
                border: 2.5px solid ${({ theme }) => theme.colors.border};
                position: absolute;
                bottom: 100%;
                border-radius: 10px;
            }
        }

        .content {
            text-align: start;
            margin-top: 10px;
        }
    }

    .tips {
        width: 100%;
        margin-top: 100px;
        text-align: center;

        a {
            color: inherit;
            margin: 0 1px;
        }
    }
`