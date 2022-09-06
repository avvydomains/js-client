export function num2Bits(inputNum: any, numBits: any): any[];
export function bits2Num(inputBits: any): bigint;
export function string2AsciiArray(text: any, len: any): any;
export function asciiArray2PreimageSignal(_chars: any): (bigint | bigint[])[];
export function preimageSignal2HashSignal(num: any): Promise<any>;
export function keccak256(str: any): string;
export function nameHashIteration(prevHash: any, label: any): Promise<any>;
export function nameHash(domain: any): Promise<number>;
export function registrationCommitHash(_nameHashes: any, quantities: any, constraintsProofs: any, pricingProofs: any, salt: any): Promise<string>;
declare namespace _default {
    export { num2Bits };
    export { bits2Num };
    export { string2AsciiArray };
    export { asciiArray2PreimageSignal };
    export { preimageSignal2HashSignal };
    export { keccak256 };
    export { nameHash };
    export { nameHashIteration };
    export { registrationCommitHash };
    export { encodeNameHashInputSignals };
    export { decodeNameHashInputSignals };
}
export default _default;
declare function encodeNameHashInputSignals(domain: any): Promise<any[]>;
declare function decodeNameHashInputSignals(inputSignals: any): Promise<string>;
