import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("font-nunito text-primary", {
  variants: {
    variant: {
      "heading-2xl": "text-[96px] leading-[96px] font-extrabold",
      "heading-xl": "text-[80px] leading-[82px] font-extrabold",
      "heading-lg": "text-[60px] leading-[68px] font-bold",
      "heading-md": "text-[48px] leading-[48px] font-bold tracking-[-3%]",
      "title-lg": "text-[32px] leading-[40px] font-bold",
      "title-md": "text-[24px] leading-[32px] font-bold tracking-[0.5%]",
      "body-lg": "text-[24px] leading-[32px] font-medium tracking-[0.5%]",
      "body-md": "text-[18px] leading-[26px] tracking-[0.5%]",
      "body-sm": "text-[16px] leading-[24px] font-medium tracking-[0.5%]",
      link: "text-[16px] leading-[24px] font-medium tracking-[0.5%]",
      caption: "text-[14px] leading-[22px] font-medium tracking-[0.5%]",
    },
  },
  defaultVariants: {
    variant: "body-md",
  },
});

export type TypographyTag =
  | "div"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

const Typography = <Tag extends TypographyTag = "div">({
  className,
  tag,
  variant,
  ...props
}: { tag?: Tag } & VariantProps<typeof typographyVariants> &
  Omit<ComponentPropsWithoutRef<Tag>, "tag" | "variant">) => {
  const Component = tag || "div";

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
