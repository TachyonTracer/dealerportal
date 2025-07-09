
import Swal from 'sweetalert2';


const SwalConfig = {
  
  defaultConfig: {
    customClass: {
      popup: 'rounded-xl',
      title: 'text-gray-900 font-bold',
      content: 'text-gray-600',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors',
      cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors mr-2',
    },
    buttonsStyling: false
  },

  
  success: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#10B981',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },

  
  error: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#EF4444',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },


  warning: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: '#F59E0B',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },

  
  info: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: '#3B82F6',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },

  question: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      confirmButtonColor: '#6366F1',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },

 
  confirm: (title, text, options = {}) => {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'Cancel',
      ...SwalConfig.defaultConfig,
      ...options
    });
  },

  toast: (title, icon = 'success', options = {}) => {
    return Swal.fire({
      title,
      icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      ...options
    });
  },


  loading: (title = 'Loading...', text = 'Please wait') => {
    return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }
};

export default SwalConfig;
