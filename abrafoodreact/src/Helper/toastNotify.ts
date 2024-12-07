import {Bounce, toast, TypeOptions} from "react-toastify";


const toastNotify = (message: string, type: TypeOptions= "success") => {
    toast.error(message, {
        type:type,
        position: "top-right",
        autoClose: 400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}

export default toastNotify;