export class KeyPressHandler {
  private keyHasFired: boolean;
  private longPress: boolean;
  private keyStartTime: Map<string, number>;
  private activeKeys: Set<string>;
  private longPressTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  private keyBindings: Map<string, KeyCallback>;

  public longPressTresholdMilliSeconds: number

  constructor() {
    this.keyHasFired = false;
    this.longPress = false;
    this.keyStartTime = new Map();
    this.activeKeys = new Set();
    this.longPressTimeouts = new Map();
    this.keyBindings = new Map();
    this.longPressTresholdMilliSeconds = 500
  }

  public addKeyBinding(keys: string[], func: KeyCallback): void {
    this.keyBindings.set(JSON.stringify(keys.sort()), func);
  }

  public init(): void {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
    window.removeEventListener('keyup', this.handleKeyup.bind(this));
  }

  private handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    const key = event.key.toLowerCase();

    if (!this.activeKeys.has(key)) {
      this.activeKeys.add(key);
      this.keyStartTime.set(key, event.timeStamp);

      // Start a timeout for a long press
      this.longPressTimeouts.set(
        key,
        setTimeout(() => {
          this.longPress = true;
          if (!this.keyHasFired) this.checkKeyCombination();
          this.longPressTimeouts.delete(key);
        }, this.longPressTresholdMilliSeconds)
      );
    }
  }

  private handleKeyup(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const startTime = this.keyStartTime.get(key) || 0;

    if (this.keyStartTime.has(key)) {
      const duration = event.timeStamp - startTime;

      // Clear any running timeout for this key
      if (this.longPressTimeouts.has(key)) {
        clearTimeout(
          this.longPressTimeouts.get(key) as ReturnType<typeof setTimeout>
        );
        this.longPressTimeouts.delete(key);
      }

      if (duration < this.longPressTresholdMilliSeconds) {
        this.longPress = false;
      }

      if (!this.keyHasFired) this.checkKeyCombination();

      // Cleanup
      this.keyStartTime.delete(key);
      this.activeKeys.delete(key);
      if (this.activeKeysCount == 0) this.keyHasFired = false;
    }
  }

  private checkKeyCombination(): void {
    const activeKeysArray = [...this.activeKeys].sort();
    const action = this.keyBindings.get(JSON.stringify(activeKeysArray));
    if (action) {
      this.keyHasFired = true;
      action(this.longPress);
    }
  }

  public get longPressTresholdSeconds(): number {
    return this.longPressTresholdMilliSeconds / 1000
  }

  public set longPressTresholdSeconds(seconds: number) {
    this.longPressTresholdMilliSeconds = seconds * 1000
  }

  public get activeKeysCount(): number {
    return this.activeKeys.size;
  }
}