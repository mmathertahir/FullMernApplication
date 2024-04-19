const env = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(
  "sk_test_51P67ZWSEwxHg0JTlSOdMmCTB86S82bpVeSpRspP99FTFbAmqq4zqGhTPaKhBvAd5E9YIQ1VfgJrOFg78CfPuXtYX00PtCbsdzq"
);

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/refresh"));
app.use("/", require("./routes/logoutRoute"));
app.use("/", require("./routes/ProductRoutes/CategoryRoutes/CategoryRoute"));

// app.post("/api/create-checkout-session", async (req, res) => {
//   const { cartdata } = req.body;
//   console.log(cartdata);

//   try {
//     const lineItems = await Promise.all(
//       cartdata.map(async (item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.title,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       })
//     );

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     console.log("Api Called ");
//     res.send({ url: session.url });
//     console.log(session.url);
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).send({ error: "Error creating checkout session" });
//   }
// });

// app.post("/api/create-checkout-session", async (req, res) => {
//   const { cartdata } = req.body;
//   console.log(cartdata);

//   try {
//     const lineItems = await Promise.all(
//       cartdata.map(async (item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.title,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       })
//     );

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     console.log("Api Called ");
//     res.send({ url: session.url }); // Send the session URL to the client
//     console.log(session.url);
//     res.redirect(303, session.url);
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).send({ error: "Error creating checkout session" });
//   }
// });

app.post("/api/create-checkout-session", async (req, res) => {
  const { cartdata } = req.body;
  console.log(cartdata);

  try {
    const lineItems = await Promise.all(
      cartdata.map(async (item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("Api Called ");
    console.log(session.url);
    res.json({ url: session.url }); // Redirect the client to the session URL
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Error creating checkout session" });
  }
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
