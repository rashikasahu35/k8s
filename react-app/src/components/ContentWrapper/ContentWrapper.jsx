import React from "react";

import "./ContentWrapper.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;


// is a higher order fun so that any child that is passed here is wrapped inside a "contentWrapper" div & css is applied on whole