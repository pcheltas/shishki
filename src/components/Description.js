import React from 'react';

const Description = ({text, position}) => {
    const style = {
        left: position.x,
        top: position.y,
    };
    return (
        <div className="description" style={style}>
            {text}
        </div>
    );
};

export default Description;