import React from "react";
import ReactDOM from "react-dom";

import Test from "./js/components/Test";

const reactElement = document.getElementById("react");
ReactDOM.render(<Test isWorking="true" />, reactElement);