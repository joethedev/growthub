'use client';

import { useRef, useState } from 'react';

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      // Optional: upload blob to server
    };

    mediaRecorderRef.current.start();
    setRecording(true);

    // Stop automatically after 5 seconds
    setTimeout(() => {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }, 5000);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={startRecording}
        disabled={recording}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {recording ? 'Recording...' : 'Start 5s Audio Note'}
      </button>

      {audioURL && <audio controls src={audioURL} className="w-full mt-4" />}
    </div>
  );
}
