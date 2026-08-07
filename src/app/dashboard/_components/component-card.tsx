import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface ComponentCardProps {
  name: string;
  price: number;
  onClick?: () => void;
}

export const ComponentCard = ({ name, price, onClick }: ComponentCardProps) => {
  return (
    <Card>
      <CardHeader className="min-h-0 flex-1 pb-2">
        <CardTitle className="text-base font-medium leading-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-sm font-medium tabular-nums">
          {formatPrice(price)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button variant="secondary" size="sm" className="w-full gap-1.5 mt-2" onClick={onClick}>
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
