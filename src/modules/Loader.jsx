import React from "react";
import { PulseLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex w-full justify-center h-lvh items-center">
      <PulseLoader size="15" color="#fb2c36" />
    </div>
  );
}

export default Loader;
