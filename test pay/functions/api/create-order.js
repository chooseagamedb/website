export async function onRequestPost(context) {
  try {
    const { request } = context;
    const { amount } = await request.json();
    
    // Use Razorpay TEST credentials
    const razorpayKey = "rzp_test_xxxxxxxxxxxx"; // Replace with your test key
    const razorpaySecret = "xxxxxxxxxxxxxxxxxx"; // Replace with your test secret
    
    // Create Razorpay order
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(razorpayKey + ':' + razorpaySecret),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // in paise
        currency: "INR",
        receipt: "receipt_" + Date.now(),
        payment_capture: 1
      })
    });
    
    const order = await razorpayResponse.json();
    
    return new Response(JSON.stringify({
      success: true,
      amount: amount,
      currency: "INR",
      razorpayOrderId: order.id
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {'Content-Type': 'application/json'}
    });
  }
}