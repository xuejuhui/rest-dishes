import React, { Component } from "react";

class Upload extends Component {
  state = {
    file: {},
    fileImage: null,
    upload: false
  };
  handleFileSelected = e => {
    const files = e.target.files;
    this.setState({ file: files[0], fileImage: URL.createObjectURL(files[0]) });
  };
  render() {
    const { fileImage } = this.state;
    return (
      <div>
        <input
          type="file"
          name="dishPhoto"
          id="dishPhoto"
          onChange={this.handleFileSelected}
        />
        {fileImage ? <img src={fileImage} alt="preview" /> : ""}
      </div>
    );
  }
}

export default Upload;
