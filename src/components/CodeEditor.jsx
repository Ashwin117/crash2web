import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { COMMENTS, TEXT } from "../constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(COMMENTS[TEXT]);
  const [language, setLanguage] = useState(TEXT);
  const [editorWidth, setEditorWidth] = useState(50); // Initial width percentage for the editor

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(COMMENTS[language] || "");
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newEditorWidth = (e.clientX / window.innerWidth) * 100;
    setEditorWidth(newEditorWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Box bg="black" p={4} minH="100vh" color="white" display="flex">
      {/* Left Pane - Language Selector and Editor */}
      <Box
        width={`${editorWidth}%`}
        bg="#1E1E1E"
        p={4}
        borderRadius="md"
        display="flex"
        flexDirection="column"
      >
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          options={{
            fontFamily: "Fira Code, monospace",
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            suggestFontFamily: "Fira Code, monospace",
          }}
          height="75vh"
          theme="vs-dark"
          language={language}
          value={value}
          onMount={onMount}
          onChange={(value) => setValue(value)}
        />
      </Box>

      {/* Divider */}
      <Box
        width="10px"
        cursor="col-resize"
        bg="gray.700"
        onMouseDown={handleMouseDown}
        zIndex="1"
        position="relative"
        transition="background-color 0.2s"
        _hover={{ bg: "gray.500" }} // Changes color on hover
      />

      {/* Right Pane - Output Section */}
      <Box width={`${100 - editorWidth}%`} bg="gray.900" p={4} borderRadius="md" overflowY="auto">
        <Output editorRef={editorRef} language={language} />
      </Box>
    </Box>
  );
};

export default CodeEditor;
