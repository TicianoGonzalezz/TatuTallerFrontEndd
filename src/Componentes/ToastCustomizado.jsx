import { Toast, ToastBody } from 'react-bootstrap'
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export const ToastCustomizado = ({ show, onClose, message, variant }) => {
    const getIcon = () => {
        switch (variant) {
            case 'success':
                return <FaCheckCircle color="white" />;
            case 'danger':
                return <FaExclamationTriangle color="white" />;
            default:
                return null;
        }
    }

    //FALTA SACAR EL STYLE Y MANDARLO AL APP.CSS, AUMENTAR EL TAMAÑO DEL ICONO Y MEJORAR EL SIZE DEL CONTENEDOR DEL MENSAJE

    return (
        <Toast
            show={show}
            onClose={onClose}
            delay={5000}
            autohide
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '1'
            }}
            className={`bg-${variant}`}
        >
            <ToastBody className={`text-${variant}`}>
                <div className="d-flex ">
                    {getIcon()}
                    <span className="ms-2 fw-bold text-white">{message}</span>
                </div>
            </ToastBody>
        </Toast>
    )
}

export default ToastCustomizado
