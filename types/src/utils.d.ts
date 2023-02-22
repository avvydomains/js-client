export default utils;
declare function utils(poseidonFunc: any): {
    num2Bits: (inputNum: any, numBits: any) => any[];
    bits2Num: (inputBits: any) => bigint;
    string2AsciiArray: (text: any, len: any) => any;
    asciiArray2PreimageSignal: (_chars: any) => (bigint | bigint[])[];
    preimageSignal2HashSignal: (num: any) => Promise<any>;
    keccak256: (str: any) => any;
    nameHash: (domain: any) => Promise<number>;
    nameHashIteration: (prevHash: any, label: any) => Promise<any>;
    registrationCommitHash: (_nameHashes: any, quantities: any, constraintsProofs: any, pricingProofs: any, salt: any) => Promise<any>;
    encodeNameHashInputSignals: (domain: any) => Promise<any[]>;
    decodeNameHashInputSignals: (inputSignals: any) => Promise<string>;
};
