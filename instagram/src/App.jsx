import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestion from "./Suggestion";

function App() {
  return (
    <div className="d-flex vh-100 ">
      <div className="w-20">
        <Sidebar />
      </div>
      <div className="w-50 ">
        <Feed />
      </div>
      <div className="w-30">
        <Suggestion />
      </div>
    </div>
  );
}

/* w25 w-50 w-75 w-100*/
export default App;
