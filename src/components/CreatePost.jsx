import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React from "react";
import {
  Image,
  TypeBold,
  TypeItalic,
  TypeUnderline,
  Youtube,
} from "react-bootstrap-icons";

const PostEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Votre texte"
    />
  );
};

const CreatePost = () => {
  return (
    <div
      className="w-screen flex flex-col items-center justify-evenly "
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div
        className="w-10/12 h-3/4 flex flex-col items-center justify-center gap-3 border"
        // action=""
        // method="post"
      >
        <input
          className="h-14 w-full px-2 rounded outline-none bg-gray-200 hover:bg-white border border-gray-300 hover:border-red-400 transition-all duration-200"
          type="text"
          name="createPost"
          id="createPost"
          placeholder="Titre de votre post"
        />
        <div className="h-full w-full ">
          <div className="h-12 w-full flex items-center justify-between rounded-t bg-gray-200">
            <div className="w-2/3 h-full flex items-center justify-start">
              <button
                role="button"
                className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
              >
                <TypeBold />
              </button>
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <TypeItalic />
              </button>
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <TypeUnderline />
              </button>
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <Image />
              </button>
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <Youtube />
              </button>
            </div>
            <div className="w-1/3 h-full whitespace-wrap text-xs flex items-center justify-center text-right pr-4">
              Enregistrer le brouillon
            </div>
          </div>
          <div className="container h-48 border border-gray-300 rounded-b overflow-y-auto p-2">
            <PostEditor />
          </div>
        </div>
        <button
          className="w-48 text-white p-2 rounded disabled:opacity-50 shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
          disabled={true}
          type="submit"
        >
          publier!
        </button>{" "}
      </div>
      {/* <div className="flex flex-col items-center justify-center border">
        <button
          className="w-48 text-white p-2 rounded disabled:opacity-50 shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
          disabled={true}
          type="submit"
        >
          annuler{" "}
        </button>{" "}
      </div> */}
    </div>
  );
};

export default CreatePost;
