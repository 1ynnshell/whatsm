export enum NumberType {
    i32,
    i64,
    f32,
    f64,
};

export type Value = {
    type: NumberType,
    value: number | bigint,
};

export const Opcode: Record<number,
    {
        name: string,
        execute: (interpreter: Interpreter) => void
    }> = {
    [0x00]: {
        name: "Unreachable",
        execute: () => { },
    },
    [0x01]: {
        name: "No Operation",
        execute: () => { },
    },
    [0x02]: {
        name: "Block",
        execute: () => { },
    },
    [0x03]: {
        name: "Loop",
        execute: () => { },
    },
}
export class Interpreter {
    private stack: Value[] = [];
    private ip: number = 0;
    execute(opcode: number): void {
        const info = Opcode[opcode];
        if (!info) {
            throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`);
        }
    }
}