import { createFile } from "../deps/mp4box.0.5.2.js";

export default class MP4Demuxer {
  #onConfig;
  #onChunk;
  #file;

  constructor(params) {}

  /**
   *
   * @param {ReadableStream} stream
   * @param {object} options
   * @param {(config: object) => void} options.onConfig
   *
   * @returns {Promise<void>}
   */
  async run(stream, { onConfig, onChunk }) {
    this.#onConfig = onConfig;
    this.#onChunk = onChunk;
    this.#file = createFile();

    this.#file.onReady = (args) => {
      debugger;
    };

    this.#file.onError = (err) => {
      console.error("mp4Demuxer error: ", err);
    };

    this.#init(stream);
  }

  /**
   *
   * @param {ReadableStream} stream
   *
   * @returns Promise<void>
   *
   */
  #init(stream) {
    const consumeFile = new WritableStream({
      /**
       * @param {Uint8Array} chunk
       */
      write: (chunk) => {
        debugger;
      },
      close: () => {
        debugger;
      },
    });

    return stream.pipeTo(consumeFile);
  }
}
