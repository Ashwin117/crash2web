import { useRef, useState, useEffect } from "react";
import { Box, HStack, Spinner, Button } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { COMMENTS } from '../constants';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(COMMENTS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [decorations, setDecorations] = useState([]); // Track decorations
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    // Add event listener for content changes
    editor.onDidChangeModelContent((event) => {
      const changes = event.changes;

      // For each change, add a decoration (comment marker)
      const newDecorations = changes.map((change) => ({
        range: new monaco.Range(
          change.range.startLineNumber,
          1,
          change.range.startLineNumber,
          1
        ),
        options: {
          isWholeLine: true,
          glyphMarginClassName: "myDecoration",
          hoverMessage: { value: "Line modified" }, // Comment message for hover
        },
      }));

      // Update decorations
      setDecorations((prev) => {
        return editor.deltaDecorations(prev, newDecorations);
      });
    });
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(COMMENTS[language] || "");
  };

  const handleRunCode = () => {
    setLoading(true);
    // Simulate a code submission process
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with actual submission logic
  };

  return (
    <Box bg="black" p={4} minH="100vh" color="white">
      <HStack spacing={4} align="start">
        {/* Language Selector and Editor */}
        <Box w="50%" bg="gray.900" p={4} borderRadius="md">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
          <Button mt={4} onClick={handleRunCode} colorScheme="teal" isDisabled={loading}>
            Run Code
          </Button>
        </Box>

        {/* Output Section */}
        <Box w="50%" bg="gray.900" p={4} borderRadius="md">
          {loading ? (
            <Spinner size="xl" color="teal.500" />
          ) : (
            <Output editorRef={editorRef} language={language} />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
