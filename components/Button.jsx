function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  isSending = false,
}) {
  const disabled = isSending;
  const base = `text-white font-semibold py-2 px-4 rounded-md transition  ${
    isSending ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
  }`;

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${
        isSending ? variants.secondary : variants[variant]
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
