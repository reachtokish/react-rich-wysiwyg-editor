import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Toolbar from './toolbar';
import EditorArea from './editor';

import 'draft-js/dist/Draft.css';
import './editor.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => {
      this.setState({editorState})
    };
  }

  render() {
    const { editorState } = this.state;

    return (
      <>
        <Toolbar
          editorState={editorState}
          onChange={this.onChange}
        />
        <EditorArea
          editorState={editorState}
          onChange={this.onChange}
        />
      </>
    );
  }
}

export default App;
