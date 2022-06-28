import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import {
  TextField,
  FormControl,
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

export default function TimePicker(props) {

  const classes = useStyles();

  const { name, label, value, onChange , error , disabled ,disablePast, others} = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl
    variant="outlined"
    className={classes.formControl}
    error={error ? true : false}
  >
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label={label}
        value={value}
        format={"yyyy-MM-dd HH:mm:ss"}
        onChange={(e, value) => onChange(convertToDefEventPara(name, value))}
        name={name}
        onError={console.log}
        disablePast ={disablePast}
        disabled={disabled}
        {...others}
      />

        {/* <KeyboardTimePicker
          margin="normal"
          id={name}
          label={label}
          value={value}
          format={"yyyy-MM-dd HH:mm:ss"}
          onChange={(e, value) => onChange(convertToDefEventPara(name, value))}
          name={name}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          disabled={disabled}
        {...others}
        /> */}
    </MuiPickersUtilsProvider>
    </FormControl>
  );
}
