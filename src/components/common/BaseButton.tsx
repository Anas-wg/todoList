import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex justify-center items-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        'z-primary': 'bg-brand text-white hover:brightness-90 focus:ring-brand',
        'z-secondary': 'bg-fill-muted text-fg hover:brightness-95 focus:ring-brand',
      },
      size: {
        XL: "w-[360px] rounded-xl py-3 px-5 text-base",
        L: "w-[180px] rounded-xl py-3 px-5 text-base",
        M: "w-fit rounded-lg py-2 px-4 text-base",
        S: "w-fit rounded-lg py-1 px-3 text-sm",
        XS: "w-fit rounded-md py-1 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "z-primary",
      size: "M",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function BaseButton({
  variant,
  size,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
