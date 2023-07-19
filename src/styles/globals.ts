import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import theme from '@/styles/theme';

export const globalStyles = () => css`
    ${emotionReset};

    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }

    label {
        font-size: 24px;
        line-height: 36px;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
