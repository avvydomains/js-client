export default compatibility;
declare namespace compatibility {
    namespace ethers {
        function _methodOperation(contract: any, methodName: any, operationName: any, args: any): any;
        function populateTransaction(contract: any, methodName: any, args: any): any;
        function staticCall(contract: any, methodName: any, args: any): any;
    }
}
