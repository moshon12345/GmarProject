import { node } from "prop-types";
import React, { useContext, useEffect, useState } from "react";

const ValueContext = React.createContext(null);

export const ValueProvider = ({ children }) => {
  // const [value, setValue] = useState("Eliran");
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("Eliran");
  }, []);

  // const obj = {{ value, setValue }}

  return (
    <ValueContext.Provider value={{ value, setValue }}>
      {children}
    </ValueContext.Provider>
  );
};

export const useValue = () => {
  const context = useContext(ValueContext);
  if (!context) throw Error("useValue must use ValueProvider");
  return context;
};

ValueProvider.propTypes = {
  children: node.isRequired,
};