import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";

type Props = {};

const WalletStatus = (props: Props) => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const disConnecthandler = () => {
    disconnect(
      {},
      {
        onSuccess: () => toast.success("You disconnected Successfully"),
      }
    );
  };

  return (
    <Card className="bg-gray-700 bg-opacity-10 backdrop-blur">
      <CardHeader className="border-b p-4 ">
        <CardTitle className="flex items-center gap-2 ">
          <Icon
            icon={"solar:wallet-money-bold-duotone"}
            className="size-9 text-purple-500"
          />{" "}
          <span> Your Wallet Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {!isConnected && (
          <div className="bg-yellow-600 bg-opacity-30 border-yellow-800 rounded p-4">
            <h4 className="font-bold">Warning ⚠️</h4>
            <div className="w-full ">
              You Do Not Connect To Your Wallet Yet !!
            </div>
          </div>
        )}
      </CardContent>
      {!isConnected && (
        <div className="w-full flex justify-center mb-4 ">
          <w3m-connect-button />
        </div>
      )}
      {isConnected && (
        <div className="w-full max-w-fit mx-auto flex flex-col items-start justify- mb-4 ">
          <h3 className="mb-2 w-full text-start  text-lg font-bold">
            Your Wallet details
          </h3>
          <div>
            <w3m-account-button />
          </div>

          <div className="mt-4">
            <Button
              onClick={disConnecthandler}
              variant="glass"
              className="flex gap-2 ps-2"
            >
              <span>
                <Icon icon={"solar:logout-3-bold-duotone"} className="size-6" />
              </span>
              <span>Disconnect</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WalletStatus;
