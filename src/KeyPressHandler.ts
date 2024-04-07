import { KeyCallback } from "./models";

export class KeyPressHandler {
  #keyHasFired: boolean;
  #longPress: boolean;
  #keyStartTime: Map<string, number>;
  #activeKeys: Set<string>;
  #longPressTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  #keyBindings: Map<string, KeyCallback>;

  #longPressTresholdMilliSeconds: number;

  constructor() {
    this.#keyHasFired = false;
    this.#longPress = false;
    this.#keyStartTime = new Map();
    this.#activeKeys = new Set();
    this.#longPressTimeouts = new Map();
    this.#keyBindings = new Map();
    this.#longPressTresholdMilliSeconds = 500;
  }

  get longPressTresholdMilliSeconds(): number {
    return this.#longPressTresholdMilliSeconds;
  }

  set longPressTresholdMilliSeconds(milliseconds: number) {
    this.#longPressTresholdMilliSeconds = milliseconds;
  }

  get longPressTresholdSeconds(): number {
    return this.#longPressTresholdMilliSeconds / 1000;
  }

  set longPressTresholdSeconds(seconds: number) {
    this.#longPressTresholdMilliSeconds = seconds * 1000;
  }

  get #activeKeysCount(): number {
    return this.#activeKeys.size;
  }

  addKeyBinding(keys: string[], func: KeyCallback): void {
    this.#keyBindings.set(JSON.stringify(keys.sort()), func);
  }

  init(): void {
    window.addEventListener("keydown", this.#handleKeydown.bind(this));
    window.addEventListener("keyup", this.#handleKeyup.bind(this));
  }

  destroy(): void {
    window.removeEventListener("keydown", this.#handleKeydown.bind(this));
    window.removeEventListener("keyup", this.#handleKeyup.bind(this));
  }

  #handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    const key = event.key.toLowerCase();

    if (!this.#activeKeys.has(key)) {
      this.#activeKeys.add(key);
      this.#keyStartTime.set(key, event.timeStamp);

      // Start a timeout for a long press
      this.#longPressTimeouts.set(
        key,
        setTimeout(() => {
          this.#longPress = true;
          if (!this.#keyHasFired) this.#checkKeyCombination();
          this.#longPressTimeouts.delete(key);
        }, this.#longPressTresholdMilliSeconds)
      );
    }
  }

  #handleKeyup(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const startTime = this.#keyStartTime.get(key) || 0;

    if (this.#keyStartTime.has(key)) {
      const duration = event.timeStamp - startTime;

      // Clear any running timeout for this key
      if (this.#longPressTimeouts.has(key)) {
        clearTimeout(
          this.#longPressTimeouts.get(key) as ReturnType<typeof setTimeout>
        );
        this.#longPressTimeouts.delete(key);
      }

      if (duration < this.#longPressTresholdMilliSeconds) {
        this.#longPress = false;
      }

      if (!this.#keyHasFired) this.#checkKeyCombination();

      // Cleanup
      this.#keyStartTime.delete(key);
      this.#activeKeys.delete(key);
      if (this.#activeKeysCount == 0) this.#keyHasFired = false;
    }
  }

  #checkKeyCombination(): void {
    const activeKeysArray = [...this.#activeKeys].sort();
    const action = this.#keyBindings.get(JSON.stringify(activeKeysArray));
    if (action) {
      this.#keyHasFired = true;
      action(this.#longPress);
    }
  }

  
}
