const fetchMock = require('fetch-mock').sandbox();
const nodeFetch = require('node-fetch');
fetchMock.config.fetch = nodeFetch;

const { handleTranscribe } = require('./src/app/functionsApi/api');

describe('handleTranscribe', () => {
    afterEach(() => {
        fetchMock.reset();
    });

    it('should return transcription if response is ok', async () => {
        const mockTranscription = '';

        fetchMock.post('http://localhost:4000/transcribe/audio', {
            body: { transcription: mockTranscription },
            status: 200,
        });

        const file = new File(['test audio content'], 'audio.mp3', { type: 'audio/mp3' });
        const result = await handleTranscribe(file, {"code":"es-US", "model":"latest_long"});

        expect(result).toEqual({ success: true, transcription: mockTranscription });
    }, 10000);

    it('should return success false if response is not ok', async () => {
        fetchMock.post('http://localhost:4000/transcribe/audio', {
            status: 500,
        });

        const result = await handleTranscribe('file');

        expect(result).toEqual({ success: false });
    }, 10000);

});