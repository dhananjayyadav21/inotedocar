import React,{useContext} from "react";
import AlertContext from "../context/alert/AlertContext";

const Alert = () => {
 
    const Context = useContext(AlertContext);
    const {alert} = Context;

    if (!alert) return null;

  return (
    <>
      <div className={`alert alert-${alert.type} p-2`}>{alert.message}</div>
    </>
  );
};

export default Alert;
