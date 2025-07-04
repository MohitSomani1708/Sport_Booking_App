// src/UserSvg.js
import React from 'react';

const UserSvg = ({ color = 'black', width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill={color}
            className="svg-icon"
        >
            <path d="M12 2C8.13 2 5 5.13 5 9s3.13 7 7 7 7-3.13 7-7S15.87 2 12 2zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
    );
};

export default UserSvg;