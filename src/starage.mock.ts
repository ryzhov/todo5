
export const storageMock = (): Storage => {
  const storage = {};

  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || '';
    },    
    getItem: (key: string): string | null =>  key in storage ? storage[key] : null,
    removeItem: (key: string) => delete storage[key],
    get length(): number {
      return Object.keys(storage).length;
    },
    key: (i: number): string | null => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: (): void => {
      Object.keys(storage).map(key => delete storage[key])
    },
  };
}

