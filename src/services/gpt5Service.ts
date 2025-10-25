interface GPT5Response {
  correctAnswers: number;
  totalAnswers: number;
  confidence: number;
  transcript?: string;
  details?: string[];
  detectedAnswers?: string[];
}

interface ScoringResult {
  score: number;
  confidence: number;
  transcript: string;
  details: string;
  detectedAnswers: string[];
}

export class GPT5Service {
  private static readonly API_URL = 'https://api.openai.com/v1/audio/transcriptions';
  private static readonly GPT_URL = 'https://api.openai.com/v1/chat/completions';

  private static getApiKey(): string {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    console.log('🔑 API Key check:', apiKey ? `Found (length: ${apiKey.length})` : 'NOT FOUND');
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your environment variables.');
    }
    return apiKey;
  }

  private static async transcribeAudio(audioBlob: Blob): Promise<string> {
    console.log('🎵 Starting audio transcription...');
    console.log('   Original blob type:', audioBlob.type);
    console.log('   Original blob size:', audioBlob.size);
    
    // Try different approaches with language preferences
    const approaches = [
      // Approach 1: Try with Hindi language specification
      async () => {
        console.log('🔄 Approach 1: Hindi transcription...');
        const webmBlob = new Blob([audioBlob], { type: 'audio/webm' });
        return this.sendToWhisper(webmBlob, 'recording.webm', 'hi');
      },
      
      // Approach 2: Try with Punjabi language specification
      async () => {
        console.log('🔄 Approach 2: Punjabi transcription...');
        const webmBlob = new Blob([audioBlob], { type: 'audio/webm' });
        return this.sendToWhisper(webmBlob, 'recording.webm', 'pa');
      },
      
      // Approach 3: Try with English language specification
      async () => {
        console.log('🔄 Approach 3: English transcription...');
        const webmBlob = new Blob([audioBlob], { type: 'audio/webm' });
        return this.sendToWhisper(webmBlob, 'recording.webm', 'en');
      },
      
      // Approach 4: Try WAV conversion with Hindi
      async () => {
        console.log('🔄 Approach 4: WAV with Hindi...');
        const wavBlob = await this.convertToWav(audioBlob);
        return this.sendToWhisper(wavBlob, 'recording.wav', 'hi');
      },
      
      // Approach 5: Try auto-detect (fallback)
      async () => {
        console.log('🔄 Approach 5: Auto-detect language...');
        const webmBlob = new Blob([audioBlob], { type: 'audio/webm' });
        return this.sendToWhisper(webmBlob, 'recording.webm');
      }
    ];
    
    let lastError: Error | null = null;
    
    for (const approach of approaches) {
      try {
        const result = await approach();
        console.log('✅ Transcription successful!');
        return result;
      } catch (error) {
        console.warn('❌ Approach failed:', error);
        lastError = error instanceof Error ? error : new Error(String(error));
        // Continue to next approach
      }
    }
    
    // If all approaches fail, try one final fallback - create a minimal WAV file with Hindi
    try {
      console.log('🔄 Final fallback: Creating minimal WAV file with Hindi...');
      const minimalWav = this.createMinimalWav(audioBlob);
      return this.sendToWhisper(minimalWav, 'recording.wav', 'hi');
    } catch (finalError) {
      console.error('❌ Final fallback also failed:', finalError);
      throw lastError || new Error('All transcription approaches failed');
    }
  }

  private static getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: { [key: string]: string } = {
      'audio/wav': 'wav',
      'audio/mp4': 'mp4',
      'audio/mpeg': 'mp3',
      'audio/ogg': 'ogg',
      'audio/webm': 'webm',
      'audio/flac': 'flac',
      'audio/m4a': 'm4a',
      'audio/oga': 'oga',
      'audio/mpga': 'mpga'
    };
    return mimeToExt[mimeType] || 'wav';
  }

  private static async sendToWhisper(audioBlob: Blob, filename: string, language?: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioBlob, filename);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    
    // Specify language if provided, otherwise let Whisper auto-detect
    if (language) {
      formData.append('language', language);
    }

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getApiKey()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Whisper API error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result.text || '';
  }

  private static async convertToWav(audioBlob: Blob): Promise<Blob> {
    console.log('🔄 Converting audio to WAV format...');
    console.log('   Original blob type:', audioBlob.type);
    console.log('   Original blob size:', audioBlob.size);
    
    try {
      // Create an audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Convert blob to array buffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      console.log('   Array buffer size:', arrayBuffer.byteLength);
      
      // Decode the audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log('   Audio buffer sample rate:', audioBuffer.sampleRate);
      console.log('   Audio buffer channels:', audioBuffer.numberOfChannels);
      console.log('   Audio buffer length:', audioBuffer.length);
      
      // Convert to WAV format
      const wavBuffer = this.audioBufferToWav(audioBuffer);
      console.log('   WAV buffer size:', wavBuffer.byteLength);
      
      const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
      console.log('✅ Successfully converted to WAV');
      return wavBlob;
    } catch (error) {
      console.error('❌ Failed to convert audio to WAV:', error);
      
      // If WAV conversion fails, just return the original blob
      // The multi-approach system will try other formats
      console.log('🔄 Returning original blob for other approaches to try');
      return audioBlob;
    }
  }

  private static audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;
    const numberOfChannels = buffer.numberOfChannels;
    const bytesPerSample = 2; // 16-bit
    const blockAlign = numberOfChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = length * blockAlign;
    const bufferSize = 44 + dataSize;

    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, bufferSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    // Convert audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  }

  private static createMinimalWav(audioBlob: Blob): Blob {
    console.log('🔄 Creating minimal WAV file...');
    
    // Create a minimal WAV header (44 bytes)
    const bufferSize = 44 + audioBlob.size;
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, bufferSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, 44100, true); // Sample rate
    view.setUint32(28, 44100 * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    writeString(36, 'data');
    view.setUint32(40, audioBlob.size, true);
    
    // Copy the original audio data after the header
    return new Blob([arrayBuffer.slice(0, 44), audioBlob], { type: 'audio/wav' });
  }

  private static async scoreWithGPT5(transcript: string, prompt: string): Promise<GPT5Response> {
    console.log('🤖 Starting GPT-4o scoring...');
    console.log('   Category prompt:', prompt);
    console.log('   Audio transcript:', transcript);
    
    const systemPrompt = `You are scoring answers for a fun word game. The goal is to count how many valid answers the player gave that match the given category.

IMPORTANT RULES:
1. Be VERY generous and lenient with scoring
2. Accept ANY language including: English, Hindi, Punjabi, Urdu, Hinglish, and other South Asian languages
3. Accept partial words, abbreviations, and variations
4. Accept single words, phrases, or even sounds that could relate to the category
5. If someone says "me" or similar, consider if it could relate to the category in any way
6. Count each distinct answer separately
7. Ignore repeats of the same answer
8. Be encouraging and positive!
9. For Urdu/Hindi text, look for words that could match the category even if they're mixed with other words
10. Focus on the meaning and context, not just exact word matches

Return ONLY valid JSON:
{
  "correctAnswers": number,
  "totalAnswers": number,
  "confidence": number,
  "transcript": "exact transcript",
  "details": ["explanation of scoring"],
  "detectedAnswers": ["list of detected answers"]
}`;

    const response = await fetch(this.GPT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using GPT-4o - faster and more reliable than GPT-5 for this task
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Category Prompt: "${prompt}"\n\nAudio Transcript: "${transcript}"\n\nNote: The transcript may be in Urdu, Hindi, Punjabi, English, or mixed languages. Please be very generous in scoring and look for any words that could relate to the category.`,
          },
        ],
        max_tokens: 500, // GPT-4o uses standard tokens (no reasoning overhead)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ GPT-4o API Error:', errorData);
      throw new Error(`GPT-4o scoring failed: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log('📥 GPT-4o Full Response:', result);
    const content = result.choices[0]?.message?.content;
    console.log('📝 GPT-4o Content:', content);

    if (!content) {
      console.error('❌ Response structure:', JSON.stringify(result, null, 2));
      throw new Error('No response from GPT-4o');
    }

    try {
      return JSON.parse(content);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      console.warn('Failed to parse GPT-4o response as JSON, using fallback');
      console.log('Raw content for fallback parsing:', content);
      
      const correctAnswersMatch = content.match(/(\d+)\s*(?:correct|valid|answers?)/i);
      const confidenceMatch = content.match(/(\d+)\s*(?:confidence|%)/i);
      
      // Be more generous in fallback - if we have a transcript, give at least 1 point
      const fallbackScore = correctAnswersMatch ? parseInt(correctAnswersMatch[1]) : (transcript.trim().length > 0 ? 1 : 0);
      
      return {
        correctAnswers: fallbackScore,
        totalAnswers: 1,
        confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 75,
        transcript: transcript,
        details: [`Fallback scoring: ${content}`],
        detectedAnswers: transcript.trim().length > 0 ? [transcript.trim()] : [],
      };
    }
  }

  static async scoreRound(audioBlob: Blob, prompt: string): Promise<ScoringResult> {
    try {
      console.log('Starting audio transcription...');
      const transcript = await this.transcribeAudio(audioBlob);
      
      console.log('Transcription complete, scoring with GPT-5...');
      const gptResponse = await this.scoreWithGPT5(transcript, prompt);
      
      console.log('Scoring complete:', gptResponse);
      
      return {
        score: gptResponse.correctAnswers,
        confidence: gptResponse.confidence,
        transcript: gptResponse.transcript || transcript,
        details: gptResponse.details?.join(', ') || 'No details provided',
        detectedAnswers: gptResponse.detectedAnswers || [],
      };
    } catch (error) {
      console.error('Error in GPT-5 scoring:', error);
      throw new Error(`Scoring failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Real-time scoring for live feedback
  static async scoreRealTime(audioBlob: Blob, prompt: string): Promise<number> {
    try {
      const result = await this.scoreRound(audioBlob, prompt);
      return result.score;
    } catch (error) {
      console.error('Real-time scoring error:', error);
      return 0; // Return 0 on error for graceful degradation
    }
  }
}
