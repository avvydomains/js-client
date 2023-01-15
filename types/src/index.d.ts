export default AVVY;
declare function AVVY(_provider: any, _opts: any): {
    name: (n: any) => {
        name: any;
        resolve: (key: any) => Promise<any>;
    };
    hash: (h: any) => {
        hash: any;
        lookup: () => Promise<{
            name: any;
            resolve: (key: any) => Promise<any>;
        }>;
    };
    reverse: (key: any, value: any) => Promise<{
        hash: any;
        lookup: () => Promise<{
            name: any;
            resolve: (key: any) => Promise<any>;
        }>;
    }>;
    batch: (items: any) => {
        lookup: () => Promise<string[]>;
        reverse: (key: any) => Promise<any>;
    };
    contracts: {};
    utils: {
        num2Bits: (inputNum: any, numBits: any) => any[];
        bits2Num: (inputBits: any) => bigint;
        string2AsciiArray: (text: any, len: any) => any;
        asciiArray2PreimageSignal: (_chars: any) => (bigint | bigint[])[];
        preimageSignal2HashSignal: (num: any) => Promise<any>;
        keccak256: (str: any) => string;
        nameHash: (domain: any) => Promise<number>;
        nameHashIteration: (prevHash: any, label: any) => Promise<any>;
        registrationCommitHash: (_nameHashes: any, quantities: any, constraintsProofs: any, pricingProofs: any, salt: any) => Promise<string>;
        encodeNameHashInputSignals: (domain: any) => Promise<any[]>;
        decodeNameHashInputSignals: (inputSignals: any) => Promise<string>;
    };
    RECORDS: {};
};
declare namespace AVVY {
    export { records as RECORDS };
}
import records from "./records.js";
