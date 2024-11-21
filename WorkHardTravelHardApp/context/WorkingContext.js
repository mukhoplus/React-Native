import React, { createContext, useState } from "react";

export const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  const [working, setWorking] = useState(true);
  const [toDos, setToDos] = useState({});

  return (
    <WorkingContext.Provider value={{ working, setWorking, toDos, setToDos }}>
      {children}
    </WorkingContext.Provider>
  );
};
