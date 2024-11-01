import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  IconButton,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { executeCode, saveRecording } from "../api";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      setOutput(result.split("\n"));
      setIsError(false);
      toast({
        title: "Code Executed Successfully",
        description: "Check the output below",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      setIsError(true);
      toast({
        title: "Execution Error",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      // Set preferred constraints to indicate "Entire Screen"
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: "screen", // Use "screen" to indicate entire screen preference
        },
      });

      // Continue with your audio and recording setup here
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      mediaRecorder.current = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });
      recordedChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = finishRecording;

      mediaRecorder.current.start();
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Your entire screen and audio are being recorded",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Unable to start recording.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Saving and uploading your recording...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const finishRecording = async () => {
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    recordedChunks.current = []; // Clear chunks

    const uniqueFilename = `sandbox_recording_${uuidv4()}.webm`;
    const formData = new FormData();
    formData.append("file", blob, uniqueFilename);

    try {
      const response = await saveRecording(formData);
      if (response.ok) {
        toast({
          title: "Upload Successful",
          description: "Your recording has been saved.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload the recording. Please try again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="90%">
      <Text mb={2} fontSize="md">
        Output
      </Text>
      <HStack spacing={2} mb={4}>
        <Button
          variant="outline"
          colorScheme="green"
          isLoading={isLoading}
          fontSize="sm"
          onClick={runCode}
        >
          Run Code
        </Button>
        <Spacer />
        <IconButton
          icon={isRecording ? <FaStop /> : <FaMicrophone />}
          onClick={isRecording ? stopRecording : startRecording}
          colorScheme={isRecording ? "red" : "gray"}
          aria-label="Toggle Recording"
        />
      </HStack>
      <Box
        height="75vh"
        p={2}
        overflowY="auto"     // Enable vertical scrolling
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        fontSize="sm"
        borderColor={isError ? "red.500" : "#333"}
      >
        {output ? (
          output.map((line, i) => <Text key={i}>{line}</Text>)
        ) : (
          <Text fontSize="sm">Click Run Code to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

Output.propTypes = {
  language: PropTypes.string.isRequired, // Specify language as a required string
  editorRef: PropTypes.shape({
    current: PropTypes.object, // Define current as an object for ref compatibility
  }).isRequired,
};

export default Output;
