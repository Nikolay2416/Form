import { useState } from "react";
import ModalForm from "../modalForm/ModalForm";

import "./main.scss"

const Main = () => {
  const [modalActive, setModalActive] = useState<boolean>(true)

  return (
    <div>
      <button 
        className="button_send-a-request"
        onClick={() => setModalActive(true)}
      >
        Отправить заявку
      </button>
      <ModalForm active={modalActive} setActive={setModalActive}/>
    </div>
  );
};

export default Main;