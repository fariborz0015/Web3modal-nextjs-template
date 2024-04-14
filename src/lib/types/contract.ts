import { Abi } from "viem";

export interface ContractI {
  TEST_ADDRESS?: `0x${string}`;
  MAIN_ADDRESS: `0x${string}`;
  ABI: Abi;
}
