export const onRequestGet = async (): Promise<Response> => {
  return Response.json({
    message: "Hello from Chen Taiji's backend!",
    timestamp: new Date().toISOString(),
  });
};