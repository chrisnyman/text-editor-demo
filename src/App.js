import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './styles/index.css';

var toolbar = {
  options: ['inline', 'blockType', 'list', 'link', 'history' ],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic'],
  },
  blockType: {
    inDropdown: true,
    options: [ 'Normal', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered'],
  },
  link: {
      inDropdown: false,
      options: ['link', 'unlink'],
    },
  history: {
   inDropdown: false,
   options: ['undo', 'redo']
 }
};


  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: null,
        displayText: null,
        text: false
      };
    }

    onEditorStateChange(editorState) {
      this.setState({
        editorState: editorState
      });
    }

    displayText() {
      let contentState = this.state.editorState.getCurrentContent();
      const markup = draftToHtml(convertToRaw(contentState));

      // markup value is to be stored in database
      this.setState({
        text: true,
        displayText: markup
      });
    }

    render = () => {
      const { editorState } = this.state;

      return (
        <div className="editor-container">

          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={(val) => this.onEditorStateChange(val)}
            toolbar={toolbar}
          />

        <button
          onClick={() => this.displayText()}>Add text</button>


        {/*  Displaying text */}
        {this.state.text && (
          <div className="textbox"
            dangerouslySetInnerHTML={{__html: this.state.displayText}}>
          </div>
        )}


        </div>
      );
    }
  }
