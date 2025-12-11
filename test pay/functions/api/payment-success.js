export async function onRequestPost(context) {
  const { request } = context;
  const data = await request.json();
  
  console.log("Payment succeeded:", data);
  
  return new Response("OK");
}