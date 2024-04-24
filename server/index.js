const env = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stripe = require("stripe")(
  "sk_test_51P67ZWSEwxHg0JTlSOdMmCTB86S82bpVeSpRspP99FTFbAmqq4zqGhTPaKhBvAd5E9YIQ1VfgJrOFg78CfPuXtYX00PtCbsdzq"
);

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(bodyParser.raw({ type: "application/json" }));

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
      cartdata.map(async (item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }))
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

app.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    // Retrieve the webhook secret from your endpoint object
    const webhookSecret = "whsec_KaHIBI9nAqK3SSP9aoKFCfnNBTkxGz8E"; // Make sure to retrieve the secret from where you've stored it
    const payload = JSON.stringify(request.body);

    let sig = request.headers["stripe-signature"];
    // Verify the webhook signature
    // const payload = request.rawBody;
    console.log(request.headers["stripe-signature"], "Headers coming");
    console.log(sig, "Signature");
    console.log(payload, "Psdede");
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed.", error);
      return response.status(400).send("Webhook Error: Invalid signature.");
    }

    // Handle the webhook event
    switch (event.type) {
      case "payment_intent.payment_failed":
        // Handle payment failure event
        console.log("Payment failed:", event.data.object);
        break;
      case "payment_intent.succeeded":
        // Handle successful payment event
        console.log("Payment succeeded:", event.data.object);
        break;
      // Add cases for other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

// const rawBodyParser = express.raw({ type: "application/json" });
// app.post("/stripe-webhook", rawBodyParser, async (req, res) => {
//   console.log("Webhook hit"); // Debugging line

//   const payload = JSON.stringify(req.body);

//   console.log(payload, "Body LOad");
//   const sig = req.headers["stripe-signature"];

//   try {
//     const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret, {
//       stripeVersion: "2020-08-27",
//     });

//     console.log(`Received event: ${event.type}`);

//     res.status(200);

//     console.log(event.type, "Event Type");
//     setImmediate(async () => {
//       try {
//         if (event.type === "checkout.session.completed") {
//           const session = event.data.object;
//           await createOrder(session);
//         }
//       } catch (error) {
//         console.error("Error creating order:", error.message);
//       }
//     });
//   } catch (err) {
//     console.error("Webhook error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// });

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
