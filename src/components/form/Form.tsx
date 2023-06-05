import { useState, useEffect, FormEvent } from "react";
import Checkbox from "../checkbox/Checkbox";
import Input from "../input/Input";
import Select from "../select/Select";

import "./form.scss";

interface ModalProps {
  setActive: (value: boolean) => void;
}

const Form = ({ setActive }: ModalProps) => {

  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [additionalFeatureHundred, setadditionalFeatureHundred] = useState<boolean>(false);
  const [additionalFeatureTwoHundred, setadditionalFeatureTwoHundred] = useState<boolean>(false);
  const [totalPrice, settotalPrice] = useState<number>(0);

  const [errorFirstName, setErrorFirstName] = useState<string>("");
  const [errorLastName, setErrorLastName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorSelectedOption, setErrorSelectedOption] = useState<string>("");

  const [isValidFirstName, setIsValidFirstName] = useState<boolean>(true);
  const [isValidLastName, setIsValidLastName] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidSelectedOption, setIsValidSelectedOption] = useState<boolean>(true);

  useEffect(() => {
    let hundred = 0;
    let twoHundred = 0;
    let productType = 0;

    if (additionalFeatureHundred) {
      hundred = 100
    }
    if (additionalFeatureTwoHundred) {
      twoHundred = 200
    }

    switch (selectedOption) {
      case "product $50":
        productType = 50;
        break;

      case "product $100":
        productType = 100;
        break;

      case "product $300":
        productType = 300;
        break;

      default:
        productType = 0;
        break;
    }

    settotalPrice(hundred + twoHundred + productType)

  },[selectedOption, additionalFeatureHundred, additionalFeatureTwoHundred])

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (isValidFirstName && isValidLastName && isValidEmail && isValidSelectedOption) {

      const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        comment: comment,
        totalPrice: totalPrice,
      };

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response error");
          }
        })
        .catch((err) => console.log(err));

      setfirstName("");
      setlastName("");
      setEmail("");
      setComment("");
      settotalPrice(0);

      setSelectedOption(null);
      setadditionalFeatureHundred(false);
      setadditionalFeatureTwoHundred(false);
    }
  };

  const validateFirstName = () => {
    if (firstName.trim() === '') {
      setErrorFirstName("Please fill in first name.");
      setIsValidFirstName(false);
    } else {
      setErrorFirstName("");
      setIsValidFirstName(true);
    }
  }

  const validateLastName = () => {
    if (lastName.trim() === '') {
      setErrorLastName("Please fill in last name.");
      setIsValidLastName(false);
    } else {
      setErrorLastName("");
      setIsValidLastName(true);
    }
  }

  const validateseEmail = () => {
    if (email.trim() === '') {
      setErrorEmail("Please fill in email.");
      setIsValidEmail(false);
    } else if (/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email) === false) {
      setErrorEmail("Please enter a valid email address.");
      setIsValidEmail(false);
    } else {
      setErrorEmail("");
      setIsValidEmail(true);
    }
  }

  const validateSelectedOption = () => {
    if (selectedOption === null) {
      setErrorSelectedOption("Please select product type.");
      setIsValidSelectedOption(false);
    } else {
      setErrorSelectedOption("");
      setIsValidSelectedOption(true);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="form">
        <div className="form_tetle-form">
          <h2>Title form</h2>
          <button
            className="form_tetle-form_button-close"
            onClick={() => setActive(false)}
          ></button>
        </div>
        <div className="form_inputs">
          <Input 
            inputValue={firstName} 
            setInputValue={setfirstName} 
            errorInputValue={errorFirstName} 
            labelText={'First Name *'}
          />
          <Input 
            inputValue={lastName} 
            setInputValue={setlastName} 
            errorInputValue={errorLastName} 
            labelText={'Last Name *'}
          />
          <Input 
            inputValue={email} 
            setInputValue={setEmail} 
            errorInputValue={errorEmail} 
            labelText={'user@gmail.com *'}
          />
        </div>
        <div className="form_product-type">
          <p>Product type *</p>
          <Select 
            selectedOption={selectedOption} 
            setSelectedOption={setSelectedOption} 
            errorSelectedOption={errorSelectedOption}
          />
        </div>
        <div className="form_additinal-feature">
          <p>Additinal feature for $100</p>
          <Checkbox 
            additionalFeature={additionalFeatureHundred}
            setadditionalFeature={setadditionalFeatureHundred} 
          />
        </div>
        <div className="form_additinal-feature">
          <p>Additinal feature for $200</p>
          <Checkbox 
            additionalFeature={additionalFeatureTwoHundred}
            setadditionalFeature={setadditionalFeatureTwoHundred}
          />
        </div>
        <div className="form_textarea-form">
          <textarea
            name="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label
            htmlFor="textarea"
            className={comment ? "form_textarea-form_label-true" : "form_textarea-form_label"}
          >
            Type your comment
          </label>
        </div>
        <div className="form_total-prise">
          <p>Total prise</p>
          <p>${totalPrice}</p>
        </div>
        <div className="form_send-form-button">
          <button 
            onClick={() => {
              validateFirstName();
              validateLastName();
              validateseEmail();
              validateSelectedOption();
            }}
          >
            Send form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;