declare namespace _default {
    export { ethersLoader };
}
export default _default;
declare function ethersLoader(signerOrProvider: any, chainId: any): {
    getContracts: () => {};
    getResolverContract: (address: any) => any;
    getEVMReverseResolverContract: (address: any) => any;
};
