import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";

type ApiCallErrorProps = {
  error: Error | AxiosError | string;
};

export const ApiCallError = ({ error }: ApiCallErrorProps) => {

  if(error instanceof AxiosError || error instanceof Error)  {
    // do something, inform it's failed fetch, just an example of error handling logic here
    return null;
  }

  return (
    <div className="flex flex-col w-full items-center mt-28">
      <p className="text-red-600">Something is wrong. {error}</p>
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
