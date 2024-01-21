import React from "react";

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    const titleStyle = {
        fontSize: '65px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%',
        fontFamily: 'cursive'
    };

    return (
        <div>
            <h1 style={titleStyle}>{text}</h1>
        </div>
    );
};

export default Title;
