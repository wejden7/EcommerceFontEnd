import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });
  const severityESWI = ["error", "success", "warning", "info"];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setmessageSnackbar] = useState("");
  const [severitySnackbar, setseveritySnackbar] = useState("success"); // error & warning & info & success

  const handleClickSnackbar = (msg, sev) => {
    setOpenSnackbar(true);
    setmessageSnackbar(msg);
    setseveritySnackbar(sev);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        handleOpenModel,
        handleCloseModel,
        openModel, setOpenModel,
        severityESWI,
        handleCloseSnackbar,
        handleClickSnackbar,
        openSnackbar,
        setOpenSnackbar,
        severitySnackbar,
        setseveritySnackbar,
        messageSnackbar,
        setmessageSnackbar,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContext = () => useContext(StateContext);
