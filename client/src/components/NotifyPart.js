import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const NotifyPart = () => {
    return <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer/>
    </div>;
}

const notify = () => toast.info('Wow so easy!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export default NotifyPart;
