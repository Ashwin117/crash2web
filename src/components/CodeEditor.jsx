import { React, useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { COMMENTS } from "../constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(COMMENTS["javascript"]);
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(COMMENTS[language] || "");
  };

  return (
    <Box bg="black" p={4} minH="100vh" color="white">
      <HStack spacing={4} align="start">
        {/* Language Selector and Editor */}
        <Box w="50%" bg="#1E1E1E" p={4} borderRadius="md">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
              padding: 4,
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>

        {/* Output Section */}
        <Box w="50%" bg="gray.900" p={4} borderRadius="md">
          <Output editorRef={editorRef} language={language} />
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
