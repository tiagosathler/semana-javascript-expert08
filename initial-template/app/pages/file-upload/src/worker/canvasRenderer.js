export default class CanvasRenderer {
  /**
   * @type {OffscreenCanvas}
   */
  static #canvas;

  /**
   * @type {OffscreenCanvasRenderingContext2D}
   */
  static #ctx;

  /**
   *  @param {VideoFrame} frame
   */
  static #draw(frame) {
    const { displayHeight, displayWidth } = frame;

    CanvasRenderer.#canvas.width = displayWidth;
    CanvasRenderer.#canvas.height = displayHeight;
    CanvasRenderer.#ctx.drawImage(frame, 0, 0, displayWidth, displayHeight);

    frame.close();
  }

  /**
   * @param {OffscreenCanvas} canvas
   */
  static getRenderer(canvas) {
    let pendingFrame = null;
    CanvasRenderer.#canvas = canvas;
    CanvasRenderer.#ctx = canvas.getContext("2d");

    return (frame) => {
      const renderAnimationFrame = () => {
        CanvasRenderer.#draw(pendingFrame);
        pendingFrame = null;
      };

      if (!pendingFrame) {
        requestAnimationFrame(renderAnimationFrame);
      } else {
        pendingFrame.close();
      }

      pendingFrame = frame;
    };
  }
}
