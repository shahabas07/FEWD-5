import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Kalvium-Logo.png";

const requirerror = "is required";
const minlenerror = "should have a minimum of 3 Special characters";
const maxlenerror = "can only have a maximum of 30 characters";
const patternerror = "Enter a valid";
const validaterror = "Passwords must match";

const errorMessages = {
  required: requirerror,
  minLength: minlenerror,
  maxLength: maxlenerror,
  pattern: patternerror,
  validate: validaterror,
};

function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [submit, setSubmit] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSubmit(true);
  };

  const renderInput = (placeholder, name, rules) => (
    <div>
      <input
        type={name.includes("password") ? "password" : "text"}
        placeholder={placeholder}
        className="border rounded- mb-4 border-black h-12 pl-4 outline-none w-full"
        {...register(name, rules)}
      />
      {errors[name] && (
        <span className="text-red-600 ">
          {`${errorMessages[errors[name].type]} ${placeholder.toLowerCase()}`}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex items-center px-7 py-5 bg-gray-300">
        <NavLink to="/" className="flex items-center">
          <div className="flex">
            <img className="w-7 h-9 ml-1 mr-3" src={Logo} alt="KalviumBooks Logo" />
            <span className="text-red-500 text-3xl font-bold">
              KalviumBooks
            </span>
          </div>
        </NavLink>
      </div>
      <div className="flex flex-col items-center ">
        <strong className="text-3xl font-bold">Create Account</strong>
        {submit ? (
          <div className="p-10 mt-12 text-center rounded-md shadow-lg bg-orange-500">
            <h2 className="mb-6 text-4xl font-semibold">
              Registration Successful!
            </h2>
            <p className="font-semibold">Congratulations from Kalvium!</p>
            <NavLink to="/" className="flex items-center justify-items-center">
              <button className="py-6 text-white">Go Back Home &#8594;</button>
            </NavLink>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-100 px-5 py-5 bg-gray-300 text-center rounded lg:w-1/3"
          >
            {renderInput("First name", "firstName", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            {renderInput("Last name", "lastName", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            {renderInput("Email", "email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            {renderInput("Password", "password", {
              required: true,
              minLength: 10,
              pattern: /.*[\W]+.*/i,
            })}
            {renderInput("Confirm password", "confirmPassword", {
              validate: (value) => value === watch("password"),
            })}
            <button
              type="submit"
              className="w-full h-10 mt-4 px-4 py-2 bg-green-500 rounded text-white font-bold"
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Forms;
