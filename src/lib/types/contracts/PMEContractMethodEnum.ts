export enum PMEContractMethodEnum  {
 addToWhitelist="addToWhitelist" , 

 undefined="undefined" , 

 ERC20InsufficientAllowance="ERC20InsufficientAllowance" , 

 ERC20InsufficientBalance="ERC20InsufficientBalance" , 

 ERC20InvalidApprover="ERC20InvalidApprover" , 

 ERC20InvalidReceiver="ERC20InvalidReceiver" , 

 ERC20InvalidSender="ERC20InvalidSender" , 

 ERC20InvalidSpender="ERC20InvalidSpender" , 

 OwnableInvalidOwner="OwnableInvalidOwner" , 

 OwnableUnauthorizedAccount="OwnableUnauthorizedAccount" , 

 Approval="Approval" , 

 approve="approve" , 

 BalanceBlocked="BalanceBlocked" , 

 BalanceUnblocked="BalanceUnblocked" , 

 batchAddToWhitelist="batchAddToWhitelist" , 

 batchRemoveFromWhitelist="batchRemoveFromWhitelist" , 

 blacklist="blacklist" , 

 Blacklisted="Blacklisted" , 

 blockBalance="blockBalance" , 

 burn="burn" , 

 disableWhitelist="disableWhitelist" , 

 enableWhitelist="enableWhitelist" , 

 mint="mint" , 

 Mint="Mint" , 

 OwnershipTransferred="OwnershipTransferred" , 

 RemovedFromBlacklist="RemovedFromBlacklist" , 

 removeFromBlacklist="removeFromBlacklist" , 

 removeFromWhitelist="removeFromWhitelist" , 

 renounceOwnership="renounceOwnership" , 

 transfer="transfer" , 

 Transfer="Transfer" , 

 transferFrom="transferFrom" , 

 transferOwnership="transferOwnership" , 

 unblockBalance="unblockBalance" , 

 WhitelistAdded="WhitelistAdded" , 

 WhitelistRemoved="WhitelistRemoved" , 

 allowance="allowance" , 

 balanceOf="balanceOf" , 

 decimals="decimals" , 

 getBlockedBalance="getBlockedBalance" , 

 getWhitelistedAmount="getWhitelistedAmount" , 

 isBlacklisted="isBlacklisted" , 

 name="name" , 

 owner="owner" , 

 symbol="symbol" , 

 totalSupply="totalSupply" , 

}

export interface PMEContractMethodInterface extends Record<PMEContractMethodEnum, any> {
    Approval: {
      args: string[];
    };
    // Define other methods as needed
  }
  