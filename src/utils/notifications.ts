import Swal from 'sweetalert2';

export const showSuccessNotification = (message: string) => {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
};

export const showErrorNotification = (message: string) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    });
};
