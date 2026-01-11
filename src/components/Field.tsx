interface Props {
  label: string;
  id: string;
  type: string;
  errors: any;
  register: any;
  required: boolean;
  message: string;
  className?: string;
  min?: number;
  value?: string;
  placeholder?: string;
}
export default function Field({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`${className ? className : ""} font-semibold text-md `}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${
          className ? className : ""
        } px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${
          errors[id]?.message ? "border-red-500" : "border-slate-600"
        }`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum length should be " + min }
            : null,
          pattern:
            type === "email"
              ? {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value:
                    /https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/,
                  message: "Invalid URL",
                }
              : null,
        })}
      />
      {errors[id] && <p className="text-red-500">{message}</p>}
    </div>
  );
}
