export type NoRepeatRotator = {
  next: () => string;
  reset: () => void;
};

function shuffle(items: string[]): string[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = temp;
  }

  return shuffled;
}

export function createNoRepeatRotator(items: string[]): NoRepeatRotator {
  const source = items.filter(Boolean);
  let pool: string[] = [];
  let lastShown: string | null = null;

  const refillPool = () => {
    if (source.length === 0) {
      pool = [];
      return;
    }

    pool = shuffle(source);

    if (pool.length > 1 && lastShown && pool[0] === lastShown) {
      const temp = pool[0];
      pool[0] = pool[1];
      pool[1] = temp;
    }
  };

  const next = () => {
    if (source.length === 0) {
      return "";
    }

    if (pool.length === 0) {
      refillPool();
    }

    const nextItem = pool.shift();

    if (!nextItem) {
      return "";
    }

    lastShown = nextItem;
    return nextItem;
  };

  const reset = () => {
    pool = [];
    lastShown = null;
  };

  return { next, reset };
}
