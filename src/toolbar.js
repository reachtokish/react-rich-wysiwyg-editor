import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleBlockTypes(style) {
    const { editorState, onChange } = this.props;
    onChange(RichUtils.toggleBlockType(editorState, style));
  }

  toggleInlineStyles(style) {
    const { editorState, onChange } = this.props;
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  }

  render() {
    const { toolbar: { inlineTypes, blockTypes }, editorState } = this.props;
    return (
      <div className="toolbar">
        <div>
          <BlockStyleControls
            editorState={editorState}
            blockTypes={blockTypes}
            onToggle={this.toggleBlockTypes.bind(this)}
          />
        </div>
        <div>
          <InlineStyleControls
            editorState={editorState}
            inlineStyles={inlineTypes}
            onToggle={this.toggleInlineStyles.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Toolbar;

const BlockStyleControls = (props) => {
  const { editorState, blockTypes, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <>
      {blockTypes.map((type) =>
        <button
          key={type.label}
          className={(type.style === blockType ? 'active' : '')}
          onClick={() => onToggle(type.style)}
        >
          {type.label}
        </button>
      )}
    </>
  )
}

const InlineStyleControls = (props) => {
  const { editorState, inlineStyles } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {inlineStyles.map((type) =>
        <button
          key={type.label}
          onClick={() => props.onToggle(type.style)}
          className={(currentStyle.has(type.style) ? 'active' : '')}
        >
          {type.label}
        </button>
      )}
    </div>
  );
};

Toolbar.defaultProps = {
  toolbar: {
    inlineTypes: [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
      { label: 'Monospace', style: 'CODE' },
    ],
    blockTypes: [
      { label: 'H1', style: 'header-one' },
      { label: 'H2', style: 'header-two' },
      { label: 'H3', style: 'header-three' },
      { label: 'H4', style: 'header-four' },
      { label: 'H5', style: 'header-five' },
      { label: 'H6', style: 'header-six' },
      { label: 'Blockquote', style: 'blockquote' },
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
      { label: 'Code Block', style: 'code-block' },
    ]
  }
}