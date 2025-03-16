import { toast } from "react-toastify";

export const notify = (msg: string, type: keyof typeof toast) => (toast[type] as (content: string) => void)(msg);
