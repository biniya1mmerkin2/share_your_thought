import React from "react";
import { TextField,Grid,InputAdornment,IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input=({name,handleChange,label,half,autoFocus,type,handleShowPassword})=>
{
    return(
        <Grid  item xs={12} sm={half ? 6:12}>
            <TextField
            style={{margin:'5px', marginLeft:'5px'}}
            fullWidth={name === 'email' || name === 'password'|| name === 'confirmpassword'?true:false}
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password'? {
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password'? <VisibilityOff/>:<Visibility/> }
                        </IconButton>
                    </InputAdornment>

                )
            }:null}
             />

        </Grid>

    )
}

export default Input;