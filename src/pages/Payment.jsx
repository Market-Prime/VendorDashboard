import React, { useState } from "react";

const Payment = () => {
  const [payments, setPayments] = useState([
    {
      id: "PAY12345",
      date: "2025-01-01",
      method: "Credit Card",
      amount: "$500.00",
      status: "Completed",
      details: "Payment for order ORD12345.",
    },
    {
      id: "PAY67890",
      date: "2025-01-02",
      method: "PayPal",
      amount: "$300.00",
      status: "Pending",
      details: "Payment for order ORD67890.",
    },
    {
      id: "PAY11223",
      date: "2025-01-03",
      method: "Bank Transfer",
      amount: "$700.00",
      status: "Failed",
      details: "Payment for order ORD11223.",
    },
  ]);

  const handlePaymentSettings = () => {
    alert("Redirecting to Payment Settings...");
    // Simulate redirect to settings page
    window.location.href = "#settings-page#payment";
  };

  const handleSetAutoPayment = () => {
    alert("Payment set to automatic on payday!");
  };

  return (
    <div className="payments-page">
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Payments
      </h1>
      <div>
        {payments.map((payment) => (
          <div
            key={payment.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ marginBottom: "8px" }}>{payment.id}</h2>
            <p>
              <strong>Date:</strong> {payment.date}
            </p>
            <p>
              <strong>Method:</strong> {payment.method}
            </p>
            <p>
              <strong>Amount:</strong> {payment.amount}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    payment.status === "Completed"
                      ? "green"
                      : payment.status === "Pending"
                      ? "orange"
                      : "red",
                }}
              >
                {payment.status}
              </span>
            </p>
            <p>
              <strong>Details:</strong> {payment.details}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={handleSetAutoPayment}
        >
          Set Automatic Payments
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handlePaymentSettings}
        >
          Payment Settings
        </button>
      </div>
    </div>
  );
};

export default Payment;
