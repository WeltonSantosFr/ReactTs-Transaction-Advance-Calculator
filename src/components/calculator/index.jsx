import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";

const Calculator = () => {
  const scheema = yup.object().shape({
    amount: yup.number().required("campo obrigatorio"),
    installments: yup.number().required("campo obrigatorio"),
    mdr: yup.number().required("campo obrigatorio"),
  });

  const [value, setValue] = useState({ 1: 0, 15: 0, 30: 0, 90: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheema),
  });

  const onSubmitFunction = (data) => {
    axios
      .post("https://frontend-challenge-7bu3nxh76a-uc.a.run.app", data)
      .then((res) => {
        setValue(res.data);
      });
  };

  return (
    <form className="mainDiv" onSubmit={handleSubmit(onSubmitFunction)}>
      <div>
        <h1>Simule sua Antecipação</h1>
        <label>Informe o valor da venda *</label>
        <input type="number" min="1000" {...register("amount")} />
        <label>Em quantas parcelas *</label>
        <input type="number" max="12" {...register("installments")} />
        <p>Máximo de 12 parcelas</p>
        <label>Informe o percentual de MDR *</label>
        <input type="number" max="100" {...register("mdr")} />
      </div>
      <div className="receiversDiv">
        <h2>VOCÊ RECEBERÁ:</h2>
        <p className="receivers">Amanhã: R$ {value[1]}</p>
        <p className="receivers">Em 15 dias: R$ {value[15]}</p>
        <p className="receivers">Em 30 dias: R$ {value[30]}</p>
        <p className="receivers">Em 90 dias: R$ {value[90]}</p>
      </div>
      <button></button>
    </form>
  );
};

export default Calculator;
