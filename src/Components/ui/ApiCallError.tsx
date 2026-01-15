import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";

type ApiCallErrorProps = {
  error: Error | AxiosError | null;
};

export const ApiCallError = ({ error }: ApiCallErrorProps) => {
  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col w-full items-center mt-28">
      <p className="text-red-600">Something is wrong.</p>
      <p>
        Please go to
        <NavLink to="/" className="font-bold underline	">
          Home
        </NavLink>
        and try it later.
      </p>
    </div>
  );
};
