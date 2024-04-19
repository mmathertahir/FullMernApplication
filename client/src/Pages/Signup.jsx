import React from "react";
import UserWrapper from "../components/UserWrapper";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUser } from "../AppStore/actions";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const dispatch = useDispatch();
  // const validationSchema = Yup.object({
  //   // firstName: Yup.string().required("Please fill out this field."),
  //   // lastName: Yup.string().required("Please fill out this field."),
  //   username: Yup.string().required("Please fill out this field."),
  //   password: Yup.string().required("Please fill out this field."),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match")
  //     .required("Confirm Password is required"),
  //   email: Yup.string().required("Email is Mandatory"),
  //   // address: Yup.string().required("Please fill out this field."),
  //   phoneNo: Yup.string().required("Please fill out this field."),
  // });


  useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, { setSubmitting }) => {
       // Simulate form submission
       console.log(values);
       dispatch(createUser(values));
       setSubmitting(false);
    },
   });
   

  return (
    <UserWrapper>
      <div className="h-screen flex justify-center items-center">
        <Formik
          // initialValues={{
          //   // firstName: "",
          //   // lastName: "",
          //   username: "",
          //   email: "",
          //   password: "",
          //   confirmPassword: "",
          //   // address: "",
          //   phoneNo: "",
          // }}
          // validationSchema={validationSchema}
          // onSubmit={(values, { setSubmitting }) => {
          //   // Simulate form submission
          //   console.log(values);
          //   dispatch(createUser(values));
          //   setSubmitting(false);
          // }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg">
              {/* First Name Field */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-username"
                  >
                    UserName
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-username"
                    name="username"
                    type="text"
                    placeholder="Jane"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                {/* Last Name Field */}
                {/* <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div> */}
              </div>
              {/* Email Field */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    name="email"
                    type="email"
                    placeholder="Doe"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    name="password"
                    type="password"
                    placeholder="******************"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              {/* Confirm Password Field */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-confirm-password"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="******************"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              {/* Address Field */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-number"
                  >
                    Phone No
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-address"
                    name="phoneNo"
                    type="text"
                    placeholder="Albuquerque"
                  />
                  <ErrorMessage
                    name="phoneNo"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </UserWrapper>
  );
};

export default Signup;
