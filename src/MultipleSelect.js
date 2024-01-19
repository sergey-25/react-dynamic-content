import React from 'react';
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function MultipleSelect({ label, options, value, onChange }) {

    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };
    return (
        <div>
            <FormControl fullWidth>
                {/*<InputLabel id={`${label}-label`}>{label}</InputLabel>*/}
                <Select
                    labelId={`${label}-label`}
                    id={`${label}-select`}
                    multiple
                    value={value || []} // Ensure value is an array
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    inputprops={{ 'aria-label': 'Without label' }}
                    input={<OutlinedInput
                        // label={label}
                    />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <Checkbox checked={(value || []).indexOf(option.value) > -1} />
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelect;
