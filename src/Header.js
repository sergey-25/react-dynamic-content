import React from "react";
import "boxicons";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

function Header({ handleButtonClick, toggleDrawer, showButton, title }) {

    
  return (
    <div>
      <header className="header">
        <div className="header__container">
          <div className="inner">
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <div className="header-title">
              <h1>{title}</h1>
            </div>
            {showButton && (
              <div className="controls">
                <button className="btn-add" onClick={handleButtonClick}>
                  Додати
                  <box-icon name="plus"></box-icon>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
