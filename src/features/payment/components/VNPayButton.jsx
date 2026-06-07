import {
    Button,
    CircularProgress,
} from "@mui/material";

import PaymentIcon
from "@mui/icons-material/Payment";

import { useState }
from "react";

import {
    createVNPayPaymentUrlApi,
} from "../services/paymentApi";

function VNPayButton({
    invoiceCode,
}) {

    const [loading,
        setLoading] =
        useState(false);

    const handlePayment =
        async () => {

            try {

                setLoading(true);

                const paymentUrl =
                    await createVNPayPaymentUrlApi(
                        invoiceCode
                    );

                window.location.href =
                    paymentUrl;

            } catch (error) {

                alert(
                    error.response?.data?.message
                    || "Không thể tạo liên kết thanh toán"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={
                <PaymentIcon />
            }
            onClick={
                handlePayment
            }
            disabled={
                loading
            }
            sx={{

                borderRadius: 3,

                px: 4,

                py: 1.5,

                fontWeight: 700,

                textTransform: "none",

                boxShadow:
                    "0 8px 24px rgba(46,125,50,0.3)",

                "&:hover": {

                    transform:
                        "translateY(-2px)",
                },

                transition:
                    "all .2s ease",
            }}
        >

            {
                loading
                    ? (
                        <CircularProgress
                            size={22}
                            color="inherit"
                        />
                    )
                    : "Thanh toán"
            }

        </Button>

    );
}

export default VNPayButton;