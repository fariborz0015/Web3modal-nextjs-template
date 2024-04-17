import * as React from "react";
//@ts-ignore
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon, IconProps } from "@iconify/react/dist/iconify.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative disabled:pointer-events-none disabled:opacity-50 group transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        "ghost-glass": "hover:bg-gray-400/20 ",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "border border-input bg-gray-700 bg-opacity-20   drop-blur  hover:bg-opacity-50 hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: IconProps;
  loadingIcon?: Partial<IconProps>;
  arrowMode?: boolean;
  arrowIcon?: Partial<IconProps>;
  underLineMode?: {
    className: string;
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type,
      variant,
      size,
      isLoading,
      loadingIcon = {},
      asChild = false,
      children,
      icon,
      underLineMode,
      arrowMode,
      arrowIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [hover, setHover] = React.useState(false);
    const iconRef = React.useRef(null);
    const [iconWidth, setIconWidth] = React.useState(null);
    React.useEffect(() => {
      iconRef &&
        iconRef!.current &&
        //@ts-ignore
        setIconWidth(iconRef!.current.clientWidth);
       
    }, [iconRef]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={isLoading || props.disabled}
        type={type}
      >
        {isLoading ? (
          <Icon
            icon={"svg-spinners:tadpole"}
            className="size-6"
            {...loadingIcon}
          />
        ) : (
          <>
            {icon && (
              <Icon
                {...icon}
                ref={iconRef}
                className={cn(
                  "me-2 transition-all size-5 relative",
                  icon.className,
                  arrowMode && "  group-hover:opacity-0"
                )}
              />
            )}
            <div
              style={{
                translate:
                  hover && arrowMode
                    ? `-${iconWidth && iconWidth + 5}px`
                    : "0px",
              }}
              className={cn(
                "flex gap-2 transition-all justify-between items-center h-full",
                hover && arrowMode && ` relative`
              )}
            >
              {children}
            </div>

            {arrowMode && (
              <Icon
                icon={"line-md:chevron-right"}
                {...arrowIcon}
                key={hover + "s"}
                className="end-2 absolute size-5 transition-all opacity-0  group-hover:opacity-100"
              />
            )}
            {underLineMode && (
              <div
                className={cn(
                  "absolute transition-all bottom-0 h-1 bg-black w-full group-hover:translate-x-0 -translate-x-full  ",
                  underLineMode.className
                )}
              ></div>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
