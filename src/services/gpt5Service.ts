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
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    formData.append('model', 'whisper-1');
    // Don't specify language - let Whisper auto-detect (supports Hindi, English, and 90+ languages)
    formData.append('response_format', 'json');

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getApiKey()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Whisper API Error:', errorData);
      throw new Error(`Transcription failed: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result.text || '';
  }

  private static async scoreWithGPT5(transcript: string, prompt: string): Promise<GPT5Response> {
    const systemPrompt = `You are an expert game scorer for a multilingual category-based word game. 
    
Your task is to:
1. Listen to the audio transcript of players giving answers to a category prompt
2. Count how many valid, correct answers were given
3. Provide a confidence score (0-100) for your assessment

Rules for scoring:
- Accept answers in ANY language (English, Hindi, Hinglish, or any other language)
- Only count answers that directly relate to the given category prompt
- Accept variations, synonyms, and related terms in any language
- For Hindi/Hinglish: recognize transliterations, Roman script, and Devanagari
- Ignore repetitions of the same answer
- Ignore off-topic responses
- Ignore incomplete or unclear answers
- Be generous but fair in your scoring
- Understand cultural context and slang from multiple languages

Respond with a JSON object containing:
{
  "correctAnswers": number,
  "totalAnswers": number,
  "confidence": number (0-100),
  "transcript": "cleaned transcript",
  "details": ["list of valid answers found"],
  "detectedAnswers": ["exact words/phrases detected that were valid answers"]
}`;

    const response = await fetch(this.GPT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5', // Using GPT-5
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Category Prompt: "${prompt}"\n\nAudio Transcript: "${transcript}"`,
          },
        ],
        max_completion_tokens: 2000, // GPT-5 uses reasoning tokens, need more for actual output
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ GPT-5 API Error:', errorData);
      throw new Error(`GPT-5 scoring failed: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log('📥 GPT-5 Full Response:', result);
    const content = result.choices[0]?.message?.content;
    console.log('📝 GPT-5 Content:', content);

    if (!content) {
      console.error('❌ Response structure:', JSON.stringify(result, null, 2));
      throw new Error('No response from GPT-5');
    }

    try {
      return JSON.parse(content);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      console.warn('Failed to parse GPT-5 response as JSON, using fallback');
      const correctAnswersMatch = content.match(/(\d+)\s*(?:correct|valid|answers?)/i);
      const confidenceMatch = content.match(/(\d+)\s*(?:confidence|%)/i);
      
      return {
        correctAnswers: correctAnswersMatch ? parseInt(correctAnswersMatch[1]) : 0,
        totalAnswers: 0,
        confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 50,
        transcript: transcript,
        details: [content],
        detectedAnswers: [],
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
