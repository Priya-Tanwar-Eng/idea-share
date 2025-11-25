import { toast } from "react-toastify";

export const successToast = (msg) => toast.success(msg, { position: "top-right" });
export const errorToast = (msg) => toast.error(msg, { position: "top-right" });
export const infoToast = (msg) => toast.info(msg, { position: "top-right" });
