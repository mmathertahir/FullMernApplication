import React from "react";
import UserWrapper from "../components/UserWrapper";
import { Formik, Field, Form, validateYupSchema, ErrorMessage } from "formik";
import { loginUser } from "../AppStore/actions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const Signin = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    password: Yup.string().required("Password is Rquired."),
    email: Yup.string().required("Email is Mandatory"),
  });

  return (
    <UserWrapper>
      <div className="h-screen  flex  justify-center  items-center">
        <Formik
          initialValues={{
            fullName: "Jane Doe",
            password: "",
            newsletter: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            dispatch(loginUser(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="email"
                  >
                    email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    name="email"
                    type="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="password"
                    name="password"
                    type="password"
                  />

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </UserWrapper>
  );
};

export default Signin;
