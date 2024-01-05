import React from "react";

const InputField = ({ name, label, type, formik }) => (
  <div className="flex flex-col gap-1">
    <label>{label} :</label>
    <input
      type={type}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`${InputButton} ${
        formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
      }`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500">{formik.errors[name]}</div>
    )}
  </div>
);

const InputButton = "bg-[#EEE8E3] px-2 py-1 outline-none rounded-md";

export default InputField;
