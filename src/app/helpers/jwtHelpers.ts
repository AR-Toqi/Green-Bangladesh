import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
  });
};

const verifyToken = (token: string, secret: Secret) => {
  const decode = jwt.verify(token, secret) as JwtPayload;
  return decode;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
