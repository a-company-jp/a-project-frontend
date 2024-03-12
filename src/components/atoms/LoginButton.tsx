import React from "react";

interface Props {
  onClick: () => void;
}

const LoginButton = (props: Props) => {
  const { onClick } = props;
  return (
    <div className="dark:bg-gray-800">
      <button
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={onClick}
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default LoginButton;
