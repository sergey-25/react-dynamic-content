import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function CustomSelect({id, label, options, value, onChange }) {

    return (
        <div>
            <FormControl fullWidth>
                {/*<InputLabel id={`${label}-label`}>{label}</InputLabel>*/}
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    value={value}
                    inputprops={{ 'aria-label': 'Without label' }}
                    // label={label}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default CustomSelect;
