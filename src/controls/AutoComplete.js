import * as React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  FormControl,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    padding: 3,
    width: "100%",
    // minWidth: 500,
  },
}));

export default function AutoComplete(props) {
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const classes = useStyles();
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    filterOptions,
    renderOption,
    getOptionLabel,
    others,
    freesolo,
    disabled,
    onmyTextChange,
    defaultValue
  } = props;

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={error ? true : false}
      // {...(error && { error: true })}
    >
      <Autocomplete
        value={value}
        onChange={(e, value) => onChange(convertToDefEventPara(name, value))}
        
        filterOptions={filterOptions}
        selectOnFocus
        handleHomeEndKeys
        id={name}
        name={name}
        options={options}
        getOptionLabel={getOptionLabel}
        freeSolo={freesolo}
        defaultValue={defaultValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            
            {...(error && {
              error: true,
              helperText: error,
            })}
          />
        )}
        disabled={disabled}
        {...others}
      />
      {/* {error && <FormHelperText>{error}</FormHelperText>} */}
    </FormControl>
  );
}
