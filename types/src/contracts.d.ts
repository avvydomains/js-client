declare namespace _default {
    export { ethersLoader };
    export { web3Loader };
}
export default _default;
declare function ethersLoader(signerOrProvider: any, chainId: any): Promise<{
    getContracts: () => {};
    getResolverContract: (address: any) => any;
    getEVMReverseResolverContract: (address: any) => any;
}>;
declare function web3Loader(provider: any, chainId: any): Promise<{
    getContracts: () => {};
    getResolverContract: (address: any) => Web3ContractAdapter;
    getEVMReverseResolverContract: (address: any) => Web3ContractAdapter;
}>;
declare function Web3ContractAdapter(provider: any, abi: any, address: any): void;
declare class Web3ContractAdapter {
    constructor(provider: any, abi: any, address: any);
    contract: any;
    abi: any;
    address: any;
    __getABIForMethod: (methodName: any) => any;
    __getTypesArray: (methodName: any) => any;
    __getOutputNames: (methodName: any) => any;
    __getMethodNameWithArguments: (methodAbi: any) => string;
    __multipleDefinitions: () => never;
    interface: {
        decodeFunctionResult: (methodName: any, responseData: any) => any;
    };
}
