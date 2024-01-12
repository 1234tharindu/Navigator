import { useRef } from "react";

const VerificationCodeInput = ({
  value,
  onChange,
  name,
  disabled,
  required,
  className,
  length,
}) => {
  const inputRefs = useRef([]);
  const code = value.split("");

  const handleChange = (index, digit) => {
    const newCode = [...code];
    newCode[index] = digit;
    onChange({
      target: { value: newCode.toString().replaceAll(",", ""), name },
    });
    if (index < length - 1 && digit !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.keyCode === 8 && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={"flex space-x-1 " + className}>
      {Array(length)
        .fill("")
        .map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            autoFocus={index === 0 && true}
            value={code[index] ?? ""}
            onKeyDown={(e) => {
              handleKeyDown(index, e);
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-10 h-10 text-2xl text-center border rounded focus:outline-none focus:border-blue-500"
            required={required}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default VerificationCodeInput;
