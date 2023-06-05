import classNames from 'classnames';
import "./input.scss";

interface ModalProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  errorInputValue: string;
  labelText: string;
}

const Input = ({inputValue, setInputValue, errorInputValue, labelText}: ModalProps) => {

  const inputLabelClass = classNames({
		'form_inputs_input-body_input_label': true,
		"form_inputs_input-body_input_label-true": inputValue,
    "form_inputs_input-body_input_label-error": errorInputValue,
    "form_inputs_input-body_input_label-error-true": inputValue && errorInputValue
	});

  return (
    <div className="form_inputs_input-body">
      <input
        name="firstName"
        type="text"
        className={errorInputValue ? "error-message-input" : "form_inputs_input-body_input"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label
        htmlFor="firstName"
        className={inputLabelClass}
      >
        {labelText}
      </label>
      {errorInputValue && <div className="error-message">{errorInputValue}</div>}
    </div>
  );
};

export default Input;