import { Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";

const test = () => {
const n: number = 1;
return (
    <Stack mt={10} width={500} mb={10}>
    <TextField
    label="Nombre">
    
    </TextField>
    <AppButton>Guardar</AppButton>
    </Stack>

)



}


export default test;