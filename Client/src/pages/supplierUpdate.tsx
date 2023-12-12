import React, { useEffect, useState } from "react";
import {
    useGetSupplierById,
    useUpdateSupplierMutation,
} from "../hooks/services/Supplier";
import { useRouter } from "next/router";
import {
  Stack,
  TextField,
} from "@mui/material";
import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
import { AppButton } from "../components/Button";
import { useForm } from "react-hook-form";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";

type SupplierFormData = {
  id: string;
  name: string;
  location: string;
  phone: string;
};

const SupplierUpdate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>();
  const [mutate] = useUpdateSupplierMutation();
  const router = useRouter();
  const { idUpdate } = router.query;
  const [id, setId] = useState<string>("");
  const [supplier, setSupplier] = useState<SupplierFormData | undefined>(
    undefined
  );
  const [confirmData, setConfirmData] = useState(false);

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
    }
  }, [idUpdate]);

  const { data: supplierData, loading: supplierLoading } =
  useGetSupplierById(id);

  useEffect(() => {
    if (supplierData && !supplierLoading) {
      setSupplier(supplierData.getsupplier);
      setConfirmData(true);
    }
  }, [supplierData, supplierLoading]);

  const onSubmit = async (data: SupplierFormData) => {
    const newIngredient : SupplierFormData = {
      id:id,
      name: data.name,
      location: data.location,
      phone: data.phone,
    }
    const confirm = await ConfirmAlert();
    if (confirm) {
      console.log(newIngredient)
      mutate({ variables: { updateIngredient: newIngredient } })
        .then((response) => {
          SuccessAlert("Proveedor actualizado exitosamente");
          router.push(`/client?Update=${encodeURIComponent("true")}`);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("Proveedor no actualizado");
        });
    }
  };

  return (
    <div className={ingredientsRegisterStyles.box}>
      <h1 className={ingredientsRegisterStyles.title}>
        Actualizar proveedor
      </h1>
      {confirmData ? (
        <Stack>
          <form
            className={ingredientsRegisterStyles.formData}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              className={ingredientsRegisterStyles.RowContainer}
              direction={"row"}
              spacing={5}
            >
              <Stack
                className={ingredientsRegisterStyles.IngredientInputs}
                direction={"column"}
                spacing={5}
              >
                <TextField
            id="name"
            label="Nombre"
            variant="outlined"
            defaultValue={supplier?.name}
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Este campo es requerido"}
          />
          <TextField
            id="location"
            label="Ubicación"
            variant="outlined"
            defaultValue={supplier?.location}
            {...register("location", { required: true })}
            error={!!errors.location}
            helperText={errors.location && "Este campo es requerido"}
          />
          <TextField
            id="phone"
            label="Teléfono"
            variant="outlined"
            defaultValue={supplier?.phone}
            {...register("phone", { required: true })}
            error={!!errors.phone}
            helperText={errors.phone && "Este campo es requerido"}
          />
              </Stack>

            </Stack>
            <Stack className={ingredientsRegisterStyles.btn}>
              <AppButton
                className={ingredientsRegisterStyles.btnSave}
                type="submit"
              >
                Guardar
              </AppButton>
            </Stack>
          </form>
        </Stack>
      ) : null}
    </div>
  );
};

export default SupplierUpdate;