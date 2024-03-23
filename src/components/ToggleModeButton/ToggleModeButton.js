import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleMode } from '../../reducers/modeSlice';
import { LightModeRoundedIcon, ModeNightRoundedIcon } from '../../utils/constants'
import './toggleModeButton.css'

const ToggleModeButton = ({theme}) => {
    const dispatch                    = useDispatch();
    const [isChecked, setIsChecked]   = useState(theme === "dark");
    
    const toggleTheme = () => {
        setIsChecked(!isChecked);
        dispatch(toggleMode());
    };
    // Make sure to handle checkbox changes
    const handleCheckboxChange = () => {
        toggleTheme();
    };
  return (
    <>
        <div className="mode-button relay" id="button-1">
            <input type="checkbox" className="mode-button-checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
            <div className={theme === "light" ? "mode-layer mode-layer-light" : "mode-layer mode-layer-dark"}>
            <div className={theme === "light" ? "mode-knobs" : "mode-knobs mode-knobs-active"}>
                {theme === "light" ? <ModeNightRoundedIcon /> : <LightModeRoundedIcon />}
            </div>
            </div>
        </div>
    </>
  )
}

export default ToggleModeButton