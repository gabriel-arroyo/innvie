import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";

// pay button arrow function component
function PayButton({ price, onApprove }) {
  const stringPrice = parseFloat(price.toString()).toFixed(2);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AV6fcal5XwIGN4OXUc9cZ3GmOTLfp4JYhpGH39hP92nxNjQlMvsXmHib_jpGlOK7pkGInHd0oEutDvD0",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: stringPrice } }],
          })
        }
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}
PayButton.propTypes = {
  price: PropTypes.number.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default PayButton;
