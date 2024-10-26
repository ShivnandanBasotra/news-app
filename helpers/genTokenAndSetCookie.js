import jwt from "jsonwebtoken";

export default function genTokenAndSetCookie (userId,res) {
   const token = jwt.sign({userId},process.env.JWT_SECRET);
   res.cookie('jwt',token,{
    httpOnly: true,
    secure: true,
    maxAge: 365*24*60*60*1000
  });
  return token;
}