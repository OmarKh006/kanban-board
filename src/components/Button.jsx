import { cva } from "class-variance-authority";

/**
 * A button component with different variants and sizes.
 * @param {Object} props - The props for the button component.
 * @param {string} props.variant - The variant of the button. Can be "primary", "secondary", or "destructive".
 * @param {string} props.size - The size of the button. Can be "sm" or "lg".
 * @param {boolean} props.isFullWidth - If true, the button will take the full width of its container.
 * @param {boolean} props.isDisabled - If true, the button will be disabled and not clickable.
 * @param {string} props.className - Additional class names to apply to the button.
 * @param {React.ReactNode} props.children - The content of the button.
 * @returns {JSX.Element} A React component that renders a button with the specified props.
 */

const button = cva("rounded-full px-6 duration-200 text-[13px] font-bold", {
  variants: {
    variant: {
      primary: "text-white bg-main-purple hover:bg-main-purple-hover",
      secondary: "text-main-purple bg-main-purple/10 hover:bg-main-purple/25",
      destructive: "text-white bg-red hover:bg-red-hover",
    },

    size: {
      sm: "h-10",
      lg: "h-12",
    },

    isFullWidth: {
      true: "w-full",
    },

    isDisabled: {
      true: "cursor-not-allowed opacity-25 hover:bg-main-purple",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

const Button = ({
  children,
  variant,
  size,
  isDisabled,
  className,
  isFullWidth,
  ...props
}) => {
  return (
    <button
      className={button({ variant, size, isDisabled, isFullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
