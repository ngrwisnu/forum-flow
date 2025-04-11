import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { JSX } from 'react';
import Button from './Button';
import { AlertType } from '../../store/alert/slice';
import { capitalizedFirstLetter } from '../../helpers/capitalizeFirstLetter';

interface AlertProps {
  clickHandler: () => void;
  type: AlertType;
  message: string;
  isOpen: boolean;
}

const Alert = ({ type, message, isOpen, clickHandler }: AlertProps) => {
  const iconList: Record<AlertType, JSX.Element> = {
    info: <Info size={20} />,
    warning: <TriangleAlert size={20} />,
    success: <CircleCheck size={20} />,
    error: <CircleX size={20} />,
  };

  const typeClass = {
    info: 'alert-info',
    warning: 'alert-warning',
    success: 'alert-success',
    error: 'alert-error',
  };

  return (
    <div
      className={`absolute -top-20 z-[999] w-full ${isOpen && 'top-0'} transition-all duration-200`}
    >
      <div
        role="alert"
        className={`alert ${typeClass[type]} mx-auto w-full lg:w-2/3`}
      >
        {iconList[type]}
        <span>
          {capitalizedFirstLetter(type)}: {message}
        </span>
        <Button onClick={clickHandler}>Close</Button>
      </div>
    </div>
  );
};

export default Alert;
