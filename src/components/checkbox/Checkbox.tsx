import { ChangeEvent } from 'react';
import "./checkbox.scss";

interface ModalProps {
  setadditionalFeature: (value: boolean) => void;
  additionalFeature: boolean;
}

const Checkbox = ({additionalFeature, setadditionalFeature}:ModalProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setadditionalFeature(e.target.checked);
  }

  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" checked={additionalFeature} onChange={e => handleChange(e)} />
        <span className="checkbox_span"></span>
      </label>
    </div>
  );
};

export default Checkbox;