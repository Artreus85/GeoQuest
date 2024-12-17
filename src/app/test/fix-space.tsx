import React from "react"

const Space: React.FC<CustomComponentProps> = ({ line }) => {
    return (
        {for (let: any index = 0; index < line; index++) {
            <><br/></>
        }}
    );
}

export default Space;