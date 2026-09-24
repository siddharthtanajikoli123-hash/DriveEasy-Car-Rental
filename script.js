// ================================
// DRIVE EASY - JAVASCRIPT
// ================================


// Copy Coupon Code Function

function copyCoupon() {

    // Coupon Code
    const couponCode = "DRIVE20";

    // Copy coupon to clipboard
    navigator.clipboard.writeText(couponCode);

    // Show message
    alert("Coupon Code " + couponCode + " copied successfully!");
}


// Smooth Scroll for Navigation Links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function (e) {

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ================================
// PAGE LOADED MESSAGE
// ================================

console.log("DriveEasy Website Loaded Successfully!");

// =================================
// BOOKING PAGE CALCULATION
// =================================

const carSelect = document.getElementById("car");
const daysInput = document.getElementById("days");
const pricePerDay = document.getElementById("pricePerDay");
const totalAmount = document.getElementById("totalAmount");
const rentalPeriod = document.getElementById("rentalPeriod");

function calculateRent() {

    // Check if booking page elements exist
    if (!carSelect || !daysInput) {
        return;
    }

    // Get selected car price
    const price = Number(carSelect.value);

    // Get number of rental days
    const days = Number(daysInput.value);

    // Show price per day
    if (price > 0) {
        pricePerDay.value = "₹" + price;
    } else {
        pricePerDay.value = "₹0";
    }


    // ================================
    // BASIC RENT CALCULATION
    // ================================

    let total = price * days;

    let offerMessage = "";


    // ================================
    // DRIVE10 - 10% DISCOUNT
    // ================================

    const promoCode = localStorage.getItem("promoCode");

    if (promoCode === "DRIVE10" && total > 0) {

        const discount = total * 0.10;

        total = total - discount;

        offerMessage =
            "🎉 DRIVE10 Applied! 10% Discount Included.";

    }


    // ================================
    // 7 DAYS + 1 FREE OFFER
    // ================================

    const weeklyOffer =
    localStorage.getItem("weeklyOffer");

if (weeklyOffer === "7 Days + 1 Free" && days >= 7) {

    // Customer pays for entered days
    // Customer gets 1 extra day free

    const actualDays = days + 1;

    if (rentalPeriod) {

        rentalPeriod.value =
            days + " Paid Days + 1 Free Day = " +
            actualDays + " Days";

    }

    offerMessage =
        "🎉 Weekly Offer Applied! " +
        "You get 1 Extra Day FREE.";

}

else {

    if (rentalPeriod && days > 0) {

        rentalPeriod.value =
            days + " Days";

    }

}

    // ================================
    // SHOW TOTAL
    // ================================

    if (total > 0) {

        totalAmount.value =
            "₹" + Math.round(total);

    } else {

        totalAmount.value = "₹0";

    }


    // ================================
// SHOW OFFER BOX
// ================================

const offerBox = document.getElementById("offerBox");
const offerText = document.getElementById("offerText");

if (offerBox && offerText) {

    if (offerMessage !== "") {

        offerText.textContent = offerMessage;

        offerBox.style.display = "flex";

    } else {

        offerBox.style.display = "none";

    }

}
}

// When customer selects a car
if (carSelect) {
    carSelect.addEventListener("change", calculateRent);
}


// When customer enters number of days
if (daysInput) {
    daysInput.addEventListener("input", calculateRent);
}

// =================================
// BOOKING FORM SUBMIT
// =================================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        // Stop page refresh
        event.preventDefault();

        // Get customer details
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value;

        // Get selected car
        const carName =
            carSelect.options[carSelect.selectedIndex].text;

        // Get rental days
        const days = daysInput.value;

        // Get price and total
        const price = pricePerDay.value;
        const total = totalAmount.value;

        // Save booking data
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerMobile", mobile);
        localStorage.setItem("selectedCar", carName);
        localStorage.setItem("rentalDays", days);
        localStorage.setItem(
    "rentalPeriod",
    rentalPeriod ? rentalPeriod.value : days + " Days"
);
        localStorage.setItem("pricePerDay", price);
        localStorage.setItem("totalAmount", total);

        // Open Payment Page
        window.location.href = "payment.html";

    });

}
// =================================
// PAYMENT PAGE - BOOKING SUMMARY
// =================================

const summaryName = document.getElementById("summaryName");

if (summaryName) {

    document.getElementById("summaryName").textContent =
        localStorage.getItem("customerName") || "-";

    document.getElementById("summaryCar").textContent =
        localStorage.getItem("selectedCar") || "-";

    document.getElementById("summaryDays").textContent =
        (localStorage.getItem("rentalDays") || "-") + " Days";

    const summaryRentalPeriod =
    document.getElementById("summaryRentalPeriod");

if (summaryRentalPeriod) {

    summaryRentalPeriod.textContent =
        localStorage.getItem("rentalPeriod") || "-";

}

    document.getElementById("summaryPrice").textContent =
        localStorage.getItem("pricePerDay") || "₹0";

    document.getElementById("summaryTotal").textContent =
        localStorage.getItem("totalAmount") || "₹0";
}

// =================================
// PAYMENT METHOD SWITCHING
// =================================

const paymentOptions =
    document.querySelectorAll('input[name="payment"]');

const cardPayment =
    document.getElementById("cardPayment");

const upiPayment =
    document.getElementById("upiPayment");

const bankPayment =
    document.getElementById("bankPayment");

const cashPayment =
    document.getElementById("cashPayment");


function showPaymentMethod(method) {

    // Check if payment page exists
    if (!cardPayment) {
        return;
    }

    // Hide all payment forms
    cardPayment.classList.add("payment-hidden");
    upiPayment.classList.add("payment-hidden");
    bankPayment.classList.add("payment-hidden");
    cashPayment.classList.add("payment-hidden");


    // Show selected payment form

    if (method === "Card") {

        cardPayment.classList.remove("payment-hidden");

    }

    else if (method === "UPI") {

        upiPayment.classList.remove("payment-hidden");

    }

    else if (method === "Net Banking") {

        bankPayment.classList.remove("payment-hidden");

    }

    else if (method === "Cash") {

        cashPayment.classList.remove("payment-hidden");

    }

}


// Detect payment method change

paymentOptions.forEach(function(option) {

    option.addEventListener("change", function() {

        showPaymentMethod(this.value);

    });

});

// =================================
// PAY SECURELY BUTTON
// =================================

const payButton = document.getElementById("payButton");

if (payButton) {

    payButton.addEventListener("click", function () {

        // Get selected payment method
        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );

        // Save payment method
        if (selectedPayment) {

            localStorage.setItem(
                "paymentMethod",
                selectedPayment.value
            );

        }

        // Go to confirmation page
        window.location.href = "confirmation.html";

    });

}

// =================================
// CONFIRMATION PAGE
// =================================

const confirmName = document.getElementById("confirmName");

if (confirmName) {

    document.getElementById("confirmName").textContent =
        localStorage.getItem("customerName") || "Customer";

    document.getElementById("confirmCar").textContent =
        localStorage.getItem("selectedCar") || "-";

    document.getElementById("confirmDays").textContent =
        (localStorage.getItem("rentalDays") || "-") + " Days";

    document.getElementById("confirmTotal").textContent =
        localStorage.getItem("totalAmount") || "₹0";

    document.getElementById("confirmPayment").textContent =
        localStorage.getItem("paymentMethod") || "-";

}

// =================================
// DIGITAL MARKETING OFFERS
// =================================


// FIRST BOOKING OFFER

const promoBtn = document.getElementById("promoBtn");

if (promoBtn) {

    promoBtn.addEventListener("click", function () {

        localStorage.setItem("promoCode", "DRIVE10");

        alert(
            "🎉 Promo Code DRIVE10 Applied!\n\nYou will get 10% OFF on your first booking."
        );

        window.location.href = "booking.html";

    });

}


// WEEKLY RENTAL OFFER

const weeklyOfferBtn =
    document.getElementById("weeklyOfferBtn");

if (weeklyOfferBtn) {

    weeklyOfferBtn.addEventListener("click", function () {

        localStorage.setItem(
            "weeklyOffer",
            "7 Days + 1 Free"
        );

        alert(
            "🎉 Weekly Offer Activated!\n\nRent a car for 7 days and get 1 day FREE!"
        );

        window.location.href = "cars.html";

    });

}


// REFER AND EARN

const referBtn = document.getElementById("referBtn");

if (referBtn) {

    referBtn.addEventListener("click", function () {

        alert(
            "🎉 Refer & Earn!\n\nShare DriveEasy with your friends and earn exciting discounts."
        );

    });

}