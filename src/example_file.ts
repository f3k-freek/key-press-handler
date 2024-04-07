/**
 * Classes should contain (a link to) a minimal working example
 * ```js
 * // Example
 * const ES = ExampleSpace.ExampleClass()
 * ES.publicNumber = 1234
 * ```
 */
export default class ExampleClass {
  /** @ignore */
  #parentElement!: HTMLElement;
  #privateString = "private text";
  publicNumber = 1234;

  set parentId(parentId: string) {
    this.#parentElement = document.querySelector(parentId)!;
  }

  get parentElement() {
    // Add logic here
    return this.#parentElement;
  }

  async printAsync(elements: string[]) {
    for (const element of elements) {
      await this.#delay(400);
      this.#parentElement.append(element);
    }
  }

  async #delay(milliseconds: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async #waitForImage(image: HTMLImageElement) {
    return new Promise<void>((resolve) => {
      const checkExist = setInterval(function () {
        console.log(image);
        if (image.src !== "undefined") {
          clearInterval(checkExist);
          resolve();
        }
      }, 100);
    });
  }
}
