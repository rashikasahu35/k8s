import CircularProgress from "@mui/joy/CircularProgress";
import React from "react";
import "./CircularSpinner.scss";
import { ThreeDots } from "react-loader-spinner";

export default function CircularSpinner({ initial }) {
  return (
    <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
      <CircularProgress size="lg" variant="plain" />
      {/* <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#006AFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      /> */}
    </div>
  );
}
