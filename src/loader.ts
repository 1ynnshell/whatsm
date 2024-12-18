
export const loadWasm = async (file: File): Promise<WebAssembly.Instance> => {
  try {
    const buffer = await file.arrayBuffer();
    if (!isWasm(buffer)) {
      throw new Error("This file is not a valid WebAssembly binary.");
    }
    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module, {
    });
    return instance;
  } catch (error) {
    throw new Error(error as string);
  }
};

const isWasm = (buffer: ArrayBuffer): boolean => {
  // first 4 bytes are magic number: 0x00 0x61 0x73 0x6d
  // next 4 bytes are the version number
  if (buffer.byteLength < 8) return false;
  const prefix = new Uint8Array(buffer.slice(0, 4));
  return (
    prefix[0] === 0x00 &&
    prefix[1] === 0x61 &&
    prefix[2] === 0x73 &&
    prefix[3] === 0x6d
  );
};
