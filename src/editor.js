import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class EditorArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const { onChange } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { editorState, onChange } = this.props;

    return (
      <div className="rich-editor">
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={onChange}
          customStyleMap={styleMap}
        />
      </div>
    );
  }
}

export default EditorArea;

const styleMap = {
  CODE: {
    backgroundColor: 'red',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};