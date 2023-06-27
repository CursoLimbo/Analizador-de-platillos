
import {teal} from "@mui/material/colors";
import {Button, ButtonProps, styled} from "@mui/material";


export const AppButton = styled(Button)<ButtonProps>(({ theme, type }) => {

    return {
        type: type,
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[400],
        '&:hover': {
            backgroundColor: teal[700],
        },
    }
});
