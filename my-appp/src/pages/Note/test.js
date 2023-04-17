/* <div class="quill ">
  <div class="ql-container ql-snow">
    <div class="ql-editor" data-gramm="false" contenteditable="true" ></div> */
import "react-quill/dist/quill.snow.css";
function Test({ isAuth }) {
  return (
    <div class="quill ">
      <div class="ql-container ql-snow">
        <div class="ql-editor ql-blank" data-gramm="false">
          <pre class="ql-syntax" spellcheck="false">
            q
          </pre>
          <iframe
            class="ql-video"
            frameborder="0"
            allowfullscreen="true"
            src="https://www.youtube.com/embed/zL0dKETbCNE?showinfo=0"
          ></iframe>
          <p>
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Test;
