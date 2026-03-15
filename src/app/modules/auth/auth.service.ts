import { auth } from '../../lib/auth';
import { IRegister, ILogin } from './auth.interface';

const registerUserService = async (payload: IRegister) => {
  const { name, email, password } = payload;
   const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password
        }
    });
    if (!data.user){
        throw new Error("Patient registration failed");
    }
    return data.user;
};


const loginUserService = async (payload: ILogin) => {
  const { email, password } = payload;
  const session = await auth.api.signInEmail({ 
    body: {
        email, password 
    }
  });

  if (!session){
    throw new Error("Patient login failed");
  }

  if (session.user.status === "INACTIVE") {
    throw new Error("Patient is inactive");
  }
  if (session.user.isDeleted) {
    throw new Error("Patient is deleted");
  }

  return session;
};

export const authServices = {
  registerUserService,
  loginUserService
};