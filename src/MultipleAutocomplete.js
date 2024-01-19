import React from "react";
import { Autocomplete, TextField } from "@mui/material";


function MultipleAutocomplete({
  id,
  options,
  getOptionLabel,
  label,
  formData,
  field,
  onChange,
  ...rest
}) {

  const selectedOptions = formData[field] || [];

  const handleAutocompleteChange = (event, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div>
      <Autocomplete
       
        id={id}
        options={options}
        getOptionLabel={getOptionLabel}
        value={selectedOptions}
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        renderOption={(props, option) => (
          <li {...props}>{getOptionLabel(option)}</li>
        )}
        inputprops={{ "aria-label": "Without label" }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            // label={label}
          />
        )}
        {...rest}
      />
    </div>
  );
}

export default MultipleAutocomplete;
