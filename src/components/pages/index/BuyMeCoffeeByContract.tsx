import { useState } from "react"; // Import the useState hook from React for managing state
import toast from "react-hot-toast"; // Import the toast library for displaying toast notifications
import { formatUnits, parseUnits } from "viem"; // Import functions for formatting and parsing units from wagmi

import { Button } from "@/components/ui/button"; // Import the Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { PMEContract } from "@/lib/data/contracts/PME"; // Import the PME contract data
import useReadPMEContract from "@/lib/hooks/contracts/pme/useReadPMEContract"; // Import custom hook for reading PME contract
import { PMEContractMethodEnum } from "@/lib/types/contracts/PMEContractMethodEnum"; // Import enum for PME contract methods
import { cn } from "@/lib/utils"; // Import utility function for conditional classnames
import { Icon } from "@iconify/react"; // Import the Icon component from iconify
import Image from "next/image"; // Import the Image component from next.js
import { useAccount, useWriteContract } from "wagmi"; // Import custom hooks for account and contract management from wagmi

// Define the BuyMeCoffeeByContract component
const BuyMeCoffeeByContract = () => {
  const [selectedCoffee, setSelectedCoffee] = useState({ value: "10", scale: 1 }); // Initialize state for selected coffee with default values
  const { address, isConnected } = useAccount(); // Get the user's address and connection status using the useAccount hook

  // Define an array of coffee options with different values and scales
  const coffees = [
    { value: "10", scale: 1 },
    { value: "30", scale: 1.2 },
    { value: "100", scale: 1.5 },
  ];

  // Use custom hooks to read PME contract balance and decimals, and write contract
  const contractBalanceHook = useReadPMEContract({
    functionName: PMEContractMethodEnum.balanceOf,
    args: [address], // Pass the user's address as argument
  });
  const contractDecimalHook = useReadPMEContract({
    functionName: PMEContractMethodEnum.decimals,
  });
  const contractTransferHook = useWriteContract();

  // Determine if the contract is currently loading
  const contractLoading = contractBalanceHook.isLoading || contractDecimalHook.isLoading;

  // Calculate the normal balance based on the connected status and contract data
  const contractNormalBalance =
    isConnected &&
    contractBalanceHook.data &&
    contractDecimalHook.data &&
    formatUnits(contractBalanceHook.data as bigint, contractDecimalHook.data as number);

  // Define the payForCoffeeHandler function to handle the process of buying coffee
  const payForCoffeeHandler = () => {
    // Check if the user is not connected and display an error message using toast
    if (!address && !isConnected) {
      toast.error("You should connect to your wallet first");
      return;
    }

    // Check if the contract decimal data is missing and return early
    if (!contractDecimalHook.data) {
      return;
    }

    // Parse the selected coffee value in units based on the contract decimal data
    const value = parseUnits(selectedCoffee.value, contractDecimalHook.data as number);

    // Check if the user has enough balance to pay for the selected coffee
    if (contractNormalBalance && Number(selectedCoffee.value) > Number(contractNormalBalance)) {
      toast.error("Sorry, you don't have enough MATIC to pay for this");
      return;
    }

    // Write a contract to transfer the specified value to the PME contract
    contractTransferHook.writeContract(
      {
        abi: PMEContract.ABI,
        address: PMEContract.MAIN_ADDRESS,
        args: [process.env.NEXT_PUBLIC_MY_ACCOUNT, value],
        functionName: "transfer",
      },
      {
        onSuccess: () => toast.success("Thank you! I've got that coffee"), // Display a success message using toast
      }
    );
  };

  return (
    <Card className="bg-gray-700 bg-opacity-10 backdrop-blur">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center gap-2">
          <Icon icon={"vscode-icons:file-type-coffeescript"} className="size-9" /> {/* Display an icon */}
          <span>Would you like to buy me a coffee?</span>
        </CardTitle>
        <CardContent>
          <div className="pt-8">
            <div className="ps-4 font-bold">
              <div className="w-fit">Please select a coffee:</div>
              {isConnected && ( // Display the user's balance if connected
                <div>
                  Your balance: {!contractLoading ? <span>{Number(contractNormalBalance)} PME</span> :
                    <Icon icon={"svg-spinners:tadpole"} className="size-6 mx-2" />}
                </div>
              )}
            </div>
            <div className="px-4 pt-8 flex justify-between items-end">
              {coffees.map((item) => { // Map over the coffee options to display them
                const { scale, value } = item;
                const isActive = value === selectedCoffee.value; // Determine if the current coffee is selected
                return (
                  <div key={value} className="relative" onClick={() => setSelectedCoffee(item)}> {/* Display each coffee option */}
                    {isActive && <div className="w-full scale-110 rounded-xl h-full absolute gradient-animation z-0"></div>} {/* Add a visual indicator for the selected coffee */}
                    <div className={cn( // Display the coffee image and value
                      "flex bg-gray-900 rounded-xl p-4 relative z-20 flex-col justify-center items-center w-fit cursor-pointer",
                      !isActive && "bg-transparent"
                    )}>
                      <Image src={"/assets/images/coffee.png"} alt="coffee" width={40 * scale} height={100 * scale} /> {/* Display the coffee image */}
                      <span className="welcomeText !text-sm mt-2">{value} PME</span> {/* Display the coffee value */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center pt-8">
              <Button
                disabled={contractTransferHook.isPending || contractLoading || !isConnected} // Disable the button based on contract status and connection
                isLoading={contractTransferHook.isPending || contractLoading} // Show loading state based on contract status
                variant={"glass"} // Set the button variant
                className="text-lg" // Set the button text size
                onClick={payForCoffeeHandler} // Handle the click event to buy coffee
              >
                {!isConnected ? "You are not connected" : contractLoading ? "Fetching your balance..." : "Pay for Coffee"} {/* Set the button label based on the connection and contract status */}
              </Button>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BuyMeCoffeeByContract;
