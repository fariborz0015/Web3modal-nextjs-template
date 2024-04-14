import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { parseUnits } from "viem";
import { polygon } from "viem/chains";
import { useAccount, useBalance, useSendTransaction } from "wagmi";

 

const BuyMeCoffee = ( ) => {
  const coffees = [
    {
      value: "1",
      scale: 1,
    },
    {
      value: "3",
      scale: 1.2,
    },
    {
      value: "10",
      scale: 1.5,
    },
  ];
  const { address, isConnected } = useAccount();
  const [selectedCoffee, setSelectedCoffee] = useState(coffees[0]);
  const { sendTransaction, isPending } = useSendTransaction();
  const { data, isLoading } = useBalance({
    address: address,
    chainId: polygon.id,
  });
const payForCoffeeHandler = () => {
  if (!address && !isConnected) {
    toast.error("Sorry, You should connect to your wallet first");
    return;
  }

  const value = parseUnits(selectedCoffee.value, polygon.nativeCurrency.decimals);

  if (data?.value && value > data.value) {
    toast.error("Sorry, You don't have enough MATIC to pay for this");
    return;
  }

  sendTransaction(
    {
      to: process.env.NEXT_PUBLIC_MY_ACCOUNT as `0x${string}`,
      account: address,
      chainId: polygon.id,
      value,
    },
    {
      onError: ({ cause }) => {
        //@ts-expect-error
        toast.error(cause?.shortMessage??"Transaction Fail");
      },
    }
  );
};

  return (
    <Card className="bg-gray-700 bg-opacity-10 backdrop-blur">
      <CardHeader className="border-b p-4 ">
        <CardTitle className="flex items-center gap-2 ">
          <Icon
            icon={"vscode-icons:file-type-coffeescript"}
            className="size-9 "
          />{" "}
          <span> Would you like to buy me a coffee ? </span>
        </CardTitle>
        <CardContent>
          <div className="pt-8">
            <div className="ps-4 font-bold "> Please Select a coffee : </div>
            <div className="px-4 pt-8 flex  justify-between items-end ">
              {coffees.map((item) => {
                const { scale, value } = item;
                const isActive = value == selectedCoffee.value;
                return (
                  <div
                    key={value}
                    className="relative"
                    onClick={() => setSelectedCoffee(item)}
                  >
                    {isActive && (
                      <div className="w-full scale-110 rounded-xl h-full absolute gradient-animation z-0 "></div>
                    )}

                    <div
                      className={cn(
                        "flex bg-gray-900  rounded-xl p-4 relative z-20  flex-col justify-center items-center w-fit cursor-pointer",
                        !isActive && "bg-transparent"
                      )}
                    >
                      <Image
                        src={"/assets/images/coffee.png"}
                        alt="coffee"
                        width={40 * scale}
                        height={100 * scale}
                      />

                      <span className="welcomeText !text-sm mt-2">
                        {" "}
                        {value} MATIC
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center pt-8">
              <Button
                disabled={isLoading}
                isLoading={isPending}
                variant={"glass"}
                className="text-lg"
                onClick={payForCoffeeHandler}
              >
                {isLoading ? "fetching your balance ..." : "  Pay for Coffee"}
              </Button>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BuyMeCoffee;
