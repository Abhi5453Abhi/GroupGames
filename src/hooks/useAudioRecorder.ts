import { useState, useRef, useCallback } from 'react';

interface AudioRecorderState {
  isRecording: boolean;
  audioBlob: Blob | null;
  recordingTime: number;
  error: string | null;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    audioBlob: null,
    recordingTime: 0,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });
      
      streamRef.current = stream;
      
      // Create MediaRecorder with compatible settings
      let mimeType = 'audio/webm;codecs=opus';
      
      // Check for better supported formats in order of preference
      const preferredTypes = [
        'audio/wav',
        'audio/mp4',
        'audio/mpeg',
        'audio/ogg',
        'audio/webm',
        'audio/webm;codecs=opus'
      ];
      
      for (const type of preferredTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          console.log('🎤 Using audio format:', mimeType);
          break;
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mimeType 
        });
        setState(prev => ({ ...prev, audioBlob }));
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms for real-time processing
      
      // Start timer
      let recordingTime = 0;
      timerRef.current = setInterval(() => {
        recordingTime += 0.1;
        setState(prev => ({ ...prev, recordingTime }));
      }, 100);

      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        audioBlob: null,
        recordingTime: 0 
      }));

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to start recording' 
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop media stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      setState(prev => ({ ...prev, isRecording: false }));
    }
  }, [state.isRecording]);

  const resetRecording = useCallback(() => {
    stopRecording();
    setState({
      isRecording: false,
      audioBlob: null,
      recordingTime: 0,
      error: null,
    });
    audioChunksRef.current = [];
  }, [stopRecording]);

  return {
    ...state,
    startRecording,
    stopRecording,
    resetRecording,
  };
};

