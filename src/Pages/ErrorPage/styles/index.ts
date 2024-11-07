import { styled } from '@packages/ui'

export const StyledErrorPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};

    .maintain {
        width: 500px;

        .icon {
            text-align: center;
        }

        .warning-banner {
            border: solid ${({ theme }) => theme.colors.warning};
            border-width: 1px 10px;
            color: ${({ theme }) => theme.colors.warning};
            text-align: center;
        }
        
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`