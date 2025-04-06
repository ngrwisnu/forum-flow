import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from '../components/auth/SignUpForm';
import { SignupRequest } from '../types/auth';
import type { AppDispatch } from '../store';
import { asyncUserSignup } from '../store/auth/action';

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const signUpHandler = async (data: SignupRequest) => {
    const response = await dispatch(asyncUserSignup(data)).unwrap();

    if (!response) {
      return;
    }

    navigate('/login');
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
      <div className="w-full rounded-2xl bg-white p-4 drop-shadow-xl md:max-w-[480px]">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Create an Account
        </h1>
        <SignUpForm onSubmit={signUpHandler} />
        <div className="mt-6 text-slate-500">
          Have an account?{' '}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
