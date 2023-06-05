import { useState } from "react";
import "./select.scss";

interface ModalProps {
  selectedOption: string | null;
  setSelectedOption: (value: string) => void;
  errorSelectedOption: string;
}

const Select = ({selectedOption, setSelectedOption, errorSelectedOption}: ModalProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOption] = useState<string[]>(["Product $50", "Product $100", "Product $300"]);

  const toggling = (): void => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => (): void => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="select">
      <div className="select_body">
        <div 
          className={errorSelectedOption ? "select_body_header-error" : "select_body_header"}
          tabIndex={0} 
          onClick={() => toggling()}
          onFocus={(event) => {
            event.target.style.border = "3px solid #b1d4f1";
          }}
          onBlur={(event) => {
            event.target.style.border = "";
          }}
        >
          {selectedOption || "Select product type"}
          <div className={isOpen ? "arrow-up" : "arrow-down" }></div>
        </div>
        {isOpen && (
          <div className="select_body_container">
            <ul className="select_body_container_items">
              {options.map((option) => (
                <li
                  className="select_body_container_items_item"
                  onClick={onOptionClicked(option)}
                  key={option}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = "#ebfdff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = "";
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
        {errorSelectedOption && <div className="error-message">{errorSelectedOption}</div>}
      </div>
    </div>
  );
};

export default Select;