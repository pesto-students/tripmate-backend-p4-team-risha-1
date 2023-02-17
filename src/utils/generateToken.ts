import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const jwtSecret: string = process.env.JWT_SECRET ?? "Hello";
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "30d",
  });
};

export default generateToken;
