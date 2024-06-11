const { handleTranscribe } = require('./src/app/functionsApi/api');

describe('handleTranscribe', () => {
    afterEach(() => {
        fetch.resetMocks();
    });

    it('should return transcription if response is ok', async () => {
        const mockTranscription = 'Transcription text';

        fetch.mockResponseOnce(JSON.stringify({ transcription: mockTranscription }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

        const file = new File(['test audio content'], 'audio.mp3', { type: 'audio/mp3' });
        const language = { code: 'es-US', model: 'latest_long' };

        const result = await handleTranscribe(file, language);

        expect(result).toEqual({ success: true, transcription: mockTranscription });
    }, 10000);

    it('should return success false if response is not ok', async () => {
        fetch.mockResponseOnce('', { status: 500 });

        const file = new File(['test audio content'], 'audio.mp3', { type: 'audio/mp3' });
        const language = { code: 'es-US', model: 'latest_long' };

        const result = await handleTranscribe(file, language);

        expect(result).toEqual({ success: false });
    }, 10000);

    it('should return success false if there is a network error', async () => {
        fetch.mockRejectOnce(new Error('Network Error'));

        const file = new File(['test audio content'], 'audio.mp3', { type: 'audio/mp3' });
        const language = { code: 'es-US', model: 'latest_long' };

        const result = await handleTranscribe(file, language);

        expect(result).toEqual({ success: false, error: 'Network Error' });
    }, 10000);
});
