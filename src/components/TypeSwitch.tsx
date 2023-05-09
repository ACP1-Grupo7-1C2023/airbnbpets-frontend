
import { FaDog, FaHome } from 'react-icons/fa';
import ReactSwitch from 'react-switch';
import '../styles/TypeSwitch.scss';

type TypeSwitchProps = {
  type: 'petSitter' | 'host';
  setType: (type: 'petSitter' | 'host') => void;
}

export const TypeSwitch = ({ type, setType }: TypeSwitchProps) => {
  return <ReactSwitch
    checked={type === 'host'}
    onColor="#535657"
    offColor="#535657"
    onHandleColor="#fff"
    offHandleColor="#fff"
    onChange={() => setType(type === 'petSitter' ? 'host' : 'petSitter')}
    uncheckedIcon={false}
    checkedIcon={false}
    uncheckedHandleIcon={<FaDog className="switch-icon" size={16} />}
    checkedHandleIcon={<FaHome className="switch-icon" size={16} />}
    className="switch"
  />
}