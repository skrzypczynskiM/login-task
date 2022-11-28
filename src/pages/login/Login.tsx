import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store";
import { LoginRequest } from "../../store/types";
import { loginSchema } from "../../validators";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "../../components/alert";
import { Button } from "../../components/button";
import classNames from "classnames";

type FormData = {
  email: string;
  password: string;
};

export function Login() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  function onSubmit({ email, password }: LoginRequest) {
    return dispatch(userActions.login({ email, password }));
  }

  function guidePanelHandler() {
    reset({
      email: "test@example.com",
      password: "test",
    });
  }

  return (
    <section className="h-screen ">
      <div className="container px-6 py-12 h-full">
        <Alert className="w-80 fixed top-10 right-10">
          <div>
            <button
              className="text-xs w-10 font-bold absolute top-2 right-2 leading-3"
              onClick={guidePanelHandler}
            >
              Click me
            </button>
            <div className="font-bold">email: test@example.com</div>

            <div className="font-bold">password: test</div>
          </div>
        </Alert>
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="woman with doors"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className="text-3xl mb-5">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <input
                  {...register("email")}
                  name="email"
                  className={classNames(
                    "block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none",
                    {
                      "border-red-600": errors?.email,
                      "border-gray-300 focus:border-blue-600": !errors?.email,
                    }
                  )}
                  placeholder="Email address"
                />
                <div className="text-red-600 h-4">{errors.email?.message}</div>
              </div>

              <div className="mb-6">
                <input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={classNames(
                    "block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none",
                    {
                      "border-red-600": errors?.password,
                      "border-gray-300 focus:border-blue-600":
                        !errors?.password,
                    }
                  )}
                />
                <div className="text-red-600 h-4">
                  {errors.password?.message}
                </div>
              </div>

              <Button type="submit" loading={isSubmitting}>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
