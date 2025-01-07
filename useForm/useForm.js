import { useState } from "react";

 //EXISTE UN REACT-HOOK-FORM QUE SE PUEDE UTILIZAR -- LIBRERIA DE TERCEROS
export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(target);
    //utilizamos operador spread
    //según cual de los unputs llame a la función se cambiara uno u otro
    // para ello usamos [name]: value
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onFormReset = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    onInputChange,
    onFormReset,
  };
};
