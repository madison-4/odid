import React from "react";

export class Poster extends React.Component {
  canvas;
  canvasRef;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = new CanvasContainer(this.canvasRef.current, {
      width: this.props.width,
      height: this.props.height,
      backgroundColor: this.props.backgroundColor,
    });
    this.canvas.paint();
  }

  render() {
    return <canvas ref={this.canvasRef} id="canvas" />;
  }
}

class CanvasContainer {
  constructor(root, options = {}) {
    this.root_ = root;

    this.ctx = this.root_.getContext("2d", { alpha: false });

    Object.assign(this, {
      width: 0,
      height: 0,
    });
  }

  clear = () => {
    const { ctx, width, height } = this;

    // save the default state
    ctx.save();

    // clear the canvas bitmap
    ctx.clearRect(
      0,
      0,
      width * window.devicePixelRatio,
      height * window.devicePixelRatio
    );
  };

  paint = () => {
    // clear canvas before paint
    this.clear();

    // paint background image
    this.paintBackgroundImage();

    // paint user-uploaded image
    if (this.image_) this.paintImage();

    // apply color to the image
    if (this.gradientColor) this.paintGradient();
  };

  paintBackgroundImage = () => {
    const { ctx, width, height } = this;

    // fallback to black background color
    ctx.fillStyle = "black";
    ctx.fillRect(
      0,
      0,
      width * window.devicePixelRatio,
      height * window.devicePixelRatio
    );
  };

  paintImage = () => {
    const { ctx, scaleRatio, image_, imageOffset } = this;

    ctx.drawImage(
      image_,
      0,
      0,
      image_.width,
      image_.height,
      imageOffset.x,
      imageOffset.y,
      image_.width * scaleRatio,
      image_.height * scaleRatio
    );
  };
}
