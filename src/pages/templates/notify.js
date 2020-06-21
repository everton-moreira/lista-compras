import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyError = (text) => {
    toast.error(`${text}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500
    })
}

export const notifySuccess = (text) => {
    toast.success(`${text}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500
    })
}