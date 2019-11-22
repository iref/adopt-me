import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Denny" animal="Dog" breed="Siberian Husky" />
      <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Doink" animal="Cat" breed="Mixed" />
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
