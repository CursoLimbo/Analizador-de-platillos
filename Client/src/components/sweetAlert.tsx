import Swal from "sweetalert2";

export const SuccessAlert = (title: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const ErrorAlert = (title: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const ConfirmAlert = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "¿Estás Seguro?",
    text: 'Los cambios no podran revertirse!',
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí",
  });

  return result.isConfirmed;
};
