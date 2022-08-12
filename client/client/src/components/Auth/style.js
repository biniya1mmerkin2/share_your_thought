
import { Paper,Avatar ,Button} from "@mui/material";
import {styled} from '@mui/material/styles';

export const Item1 = styled(Paper)(({ theme }) => ({
    // marginTop: theme.spacing(8),
    width:'30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent:'center',
    padding: theme.spacing(2),
  }));

export const Item2 =styled(Avatar)(({theme}) =>({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
})

)

export const Item3 = styled(Button)(({theme})=>(
    {
        margin: '5px',
        

    }
)
)

export const Style={
   style:{

    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:"#555421",
    // marginTop: 10,
   }
   ,
   style2:{
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    
   },
   style3:{
    margin:'5px',
    
   }
}

