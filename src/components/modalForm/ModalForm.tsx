import Form from "../form/Form";
import "./modalForm.scss";

interface ModalProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

const ModalForm = ({active, setActive}: ModalProps) => {
  return (
    <div 
      className={active ? "modal active": "modal"} 
    >
      <div 
        className={active ? "modal_content active_content": "modal_content"} 
        onClick={(e) => e.stopPropagation()}
      >
        <Form setActive={setActive}/>
      </div>
    </div>
  );
};

export default ModalForm;