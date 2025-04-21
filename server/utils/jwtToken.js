export const generateToken = (user, message, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // Or "None" if you’re doing cross-origin cookies
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};
