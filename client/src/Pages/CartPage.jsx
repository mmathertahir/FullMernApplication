import React, { useState } from "react";
import UserWrapper from "../components/UserWrapper";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { userURL } from "../Axios/Axios";

import axios from "axios";
import "@stripe/stripe-js";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectTotalPrice,
} from "../AppStore/CartSlice";

const stripePromise = loadStripe(
  "pk_test_51P67ZWSEwxHg0JTlxMlxmpKXwyaPBMiVSALqMHtVvVak8Ue7JvPlQzuIP0Tv2DJBt6bCkGohYl954ND7o4A9YgQm00n9tBQGIw"
);

const CartPage = () => {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart);
  const cartlength = useSelector((state) => state.cart.length);
  const totalPrice = useSelector(selectTotalPrice);

  const [stripeURl, setStripeUrl] = useState(null);
  const [stripeConirm, setStripeConfirm] = useState(false);

  const increase = (item) => {
    console.log("Function Called");
    dispatch(increaseQuantity(item));
  };

  const decrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const remove = (item) => {
    dispatch(removeItem(item));
  };

  console.log(cartdata);

  // const makePayment = async () => {
  //   try {
  //     const stripe = await stripePromise;

  //     const response = await axios.post(
  //       "http://localhost:5000/api/create-checkout-session",
  //       { cartdata: cartdata },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to create checkout session");
  //     }

  //     const session = response.data;

  //     console.log("Checkout session:", session);

  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: session.url,
  //     });

  //     if (error) {
  //       throw new Error(`Error redirecting to checkout: ${error.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };

  // const makePayment = async () => {
  //   try {
  //     const stripe = await stripePromise;

  //     const response = await axios.post(
  //       "http://localhost:5000/api/create-checkout-session",
  //       { cartdata: cartdata },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to create checkout session");
  //     }

  //     const session = response.data;

  //     console.log("Checkout session:", session);

  //     // Redirect to checkout only if session URL exists
  //     if (session.url) {
  //       const { error } = await stripe.redirectToCheckout({
  //         sessionId: session.url,
  //       });

  //       if (error) {
  //         throw new Error(`Error redirecting to checkout: ${error.message}`);
  //       }
  //     } else {
  //       throw new Error("Session URL is missing in the response");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/api/create-checkout-session`,
  //       {
  //         cartdata,
  //       }
  //     );
  //     console.log(response.data);
  //     if (response.data.url) {
  //       window.location.href = response.data.url;
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const makePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-checkout-session",
        { cartdata: cartdata },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create checkout session");
      }

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/api/create-checkout-session`,
  //       {
  //         cartdata,
  //       }
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error.message);
  //     throw error;
  //   }
  // };
  // const handleResponse = (responseData) => {
  //   console.log(responseData);
  //   if (responseData.url) {
  //     window.location.href = responseData.url;
  //   }
  // };

  // const handleError = (error) => {
  //   console.log(error.message);
  //   // Display an error message to the user or perform other error handling
  // };

  // handleCheckout().then(handleResponse).catch(handleError);

  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/api/create-checkout-session`, {
        cartdata,
      })
      .then((response) => {
        console.log(response, "Back end response");
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <UserWrapper>
      <section class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div class="grid grid-cols-12">
            <div class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black">
                  {cartlength} Items
                </h2>
              </div>
              <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div class="col-span-12 md:col-span-7">
                  <p class="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div class="col-span-12 md:col-span-5">
                  <div class="grid grid-cols-5">
                    <div class="col-span-3">
                      <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div class="col-span-2">
                      <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {cartlength > 0 ? (
                cartdata.map((item, index) => (
                  <div
                    class="relative flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200"
                    key={index}
                  >
                    <button
                      class="rounded-full group flex items-center justify-center focus-within:outline-red-500  top-2 absolute right-3"
                      onClick={() => remove(item)}
                    >
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          class="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                          cx="17"
                          cy="17"
                          r="17"
                          fill=""
                        />
                        <path
                          class="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                          d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                          stroke="#EF4444"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <div class="w-full   md:max-w-[126px]">
                      <img
                        src={item.thumbnail}
                        alt="perfume bottle image"
                        class="mx-auto max-h-[150px]"
                      />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 w-full">
                      <div class="md:col-span-2">
                        <div class="flex flex-col max-[500px]:items-center gap-3">
                          <h6 class="font-semibold text-base leading-7 text-black">
                            {item.brand}
                          </h6>
                          <h6 class="font-normal text-base leading-7 text-gray-500">
                            {item.title}
                          </h6>
                          <h6 class="font-semibold text-base leading-7 text-indigo-600">
                            ${item.price}
                          </h6>
                        </div>
                      </div>
                      <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                        <div class="flex items-center h-full">
                          <button
                            class="group rounded-l-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            onClick={() => decrease(item)}
                          >
                            <svg
                              class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                              <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                              <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                            </svg>
                          </button>
                          <div
                            type="text"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                            placeholder="1"
                          >
                            {item.quantity}
                          </div>
                          <button
                            class="group rounded-r-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            onClick={() => increase(item)}
                          >
                            <svg
                              class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke=""
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                              <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                              <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                        <p class="font-bold text-lg leading-8 text-indigo-600 text-center">
                          ${item.quantity * item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4">No Data Found</div>
              )}

              <div class="flex items-center justify-end mt-8">
                <button class="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-50">
                  Add Coupon Code
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                      stroke="#4F46E5"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div class="mt-8">
                <div class="flex items-center justify-between pb-6">
                  <p class="font-normal text-lg leading-8 text-black">
                    {cartlength} Items
                  </p>
                  <p class="font-medium text-lg leading-8 text-black">
                    $ {totalPrice}
                  </p>
                </div>
                <form>
                  <label class="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                    Shipping
                  </label>
                  <div class="flex pb-6">
                    <div class="relative w-full">
                      <div class=" absolute left-0 top-0 py-3 px-4">
                        <span class="font-normal text-base text-gray-300">
                          Second Delivery
                        </span>
                      </div>
                      <input
                        type="text"
                        class="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                        placeholder="$5.00"
                      />
                      <button
                        id="dropdown-button"
                        data-target="dropdown-delivery"
                        class="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                        type="button"
                      >
                        <svg
                          class="ml-2 my-auto"
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                            stroke="#6B7280"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdown-delivery"
                        aria-labelledby="dropdown-delivery"
                        class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                      >
                        <ul
                          class="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Shopping
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Images
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              News
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Finance
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <label class="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                    Promo Code
                  </label>
                  <div class="flex pb-4 w-full">
                    <div class="relative w-full ">
                      <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                      <input
                        type="text"
                        class="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                        placeholder="xxxx xxxx xxxx"
                      />
                      <button
                        id="dropdown-button"
                        data-target="dropdown"
                        class="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                        type="button"
                      >
                        <svg
                          class="ml-2 my-auto"
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                            stroke="#6B7280"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdown"
                        class="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul
                          class="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Shopping
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Images
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              News
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Finance
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center border-b border-gray-200">
                    <button class="rounded-full w-full bg-black py-3 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                      Apply
                    </button>
                  </div>
                  <div class="flex items-center justify-between py-8">
                    <p class="font-medium text-xl leading-8 text-black">
                      3 Items
                    </p>
                    <p class="font-semibold text-xl leading-8 text-indigo-600">
                      $485.00
                    </p>
                  </div>
                  <button
                    class="w-full text-center bg-indigo-600 rounded-full py-4 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                    onClick={handleCheckout}
                    // onClick={makePayment}
                  >
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserWrapper>
  );
};

export default CartPage;
