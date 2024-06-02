import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import editorStyle from "../../src/components/editorStyles.module.css";

const RichEditor = ({ editorState, setEditorState }) => {
  return (
    <>
      <div className={editorStyle.editor}>
        <Editor
          onEditorStateChange={setEditorState}
          editorState={editorState}
          toolbar={{
            options: ["inline", "blockType", "list", "textAlign", "link"],
            inline: {
              options: ["bold", "strikethrough"],
            },
            blockType: {
              inDropdown: false,
              options: ["H2"],
            },
            list: {
              options: ["unordered"],
            },
            textAlign: {
              options: ["center"],
            },
            link: {
              options: ["link"],
            },
          }}
        />
      </div>
    </>
  );
};

export default RichEditor;
