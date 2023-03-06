export default AVVY;
declare class AVVY {
    constructor(provider: any, opts: any);
    provider: Promise<any>;
    batchExecutor: any;
    RECORDS: {};
    _promises: {};
    contracts: Promise<any>;
    init(_provider: any, _opts: any): Promise<void>;
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
        reverseToNames: (key: any) => Promise<string[]>;
    };
    utils: {
        num2Bits: (inputNum: any, numBits: any) => any[];
        bits2Num: (inputBits: any) => bigint;
        string2AsciiArray: (text: any, len: any) => any;
        asciiArray2PreimageSignal: (_chars: any) => (bigint | bigint[])[];
        preimageSignal2HashSignal: (num: any) => Promise<any>;
        nameHash: (domain: any) => Promise<number>;
        nameHashIteration: (prevHash: any, label: any) => Promise<any>;
        encodeNameHashInputSignals: (domain: any) => Promise<any[]>;
        decodeNameHashInputSignals: (inputSignals: any) => Promise<string>;
        generateNameAndPath: (domain: any) => Promise<{
            name: number;
            path: any[];
        }>;
    };
}
declare namespace AVVY {
    export { records as RECORDS };
    export const providers: {
        ethersProvider: (provider: any, config: any) => any;
    };
}
import records from "./records.js";
