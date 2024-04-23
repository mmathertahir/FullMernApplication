const env = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const rawBodyParser = express.raw({ type: "application/json" });
const cookieParser = require("cookie-parser");
var getRawBody = require("raw-body");
const mongoose = require("mongoose");
const { json } = require("body-parser");

const stripe = require("stripe")(
  "sk_test_51P67ZWSEwxHg0JTlSOdMmCTB86S82bpVeSpRspP99FTFbAmqq4zqGhTPaKhBvAd5E9YIQ1VfgJrOFg78CfPuXtYX00PtCbsdzq"
);

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cors());

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/refresh"));
app.use("/", require("./routes/logoutRoute"));
app.use("/", require("./routes/ProductRoutes/CategoryRoutes/CategoryRoute"));

const endpointSecret = "whsec_KaHIBI9nAqK3SSP9aoKFCfnNBTkxGz8E";

app.post("/api/create-checkout-session", async (req, res) => {
  const { cartdata } = req.body;

  console.log(req.body.cartdata);

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

      metadata: {
        endpointUrl: "http://localhost:5000/stripe-webhook", // Your webhook endpoint URL
      },
    });

    console.log("Api Called ");
    console.log(session.url);
    res.json({ url: session.url }); // Redirect the client to the session URL
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Error creating checkout session" });
  }
});

app.post("/stripe-webhook", rawBodyParser, async (req, res) => {
  const payload = JSON.stringify(req.body);
  console.log(payload, "Pay Load From");
  const sig = req.headers["stripe-signature"];
  // Replace with your actual webhook secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret, {
      // Set the stripeVersion as per your requirement
      stripeVersion: "2020-08-27",
    });

    console.log(req.body.toString(), "Raw Body Data"); // Logging the raw body data
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await createOrder(session);
  }

  res.status(200).end();
});

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // Assuming a Customer model
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

async function createOrder(session) {
  const { line_items, customer } = session;

  try {
    const order = new Order({
      customer: customer,
      items: line_items.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100,
      })),
    });

    await order.save();
    console.log("Order created successfully:", order._id);
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
