import { PMEContract } from "@/lib/data/contracts/PME";
import { UseReadContractParameters, useReadContract } from "wagmi";
 
const useReadPMEContract = (params: UseReadContractParameters) => {
  
  const contracts = useReadContract({
    abi: PMEContract.ABI,
    address: PMEContract.MAIN_ADDRESS,
    ...params,
  });

  return contracts;
};

export default useReadPMEContract;
