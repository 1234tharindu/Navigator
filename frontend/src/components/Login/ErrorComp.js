import React from "react";

function Error({ error }) {
  return error && <div className="">{error}</div>;
}

export default Error;
