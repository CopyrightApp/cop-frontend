export const handleTranscribe = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);
  
    try {
      const response = await fetch('http://localhost:4000/transcribe/audio', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, transcription: data.transcription };
      } else {
        console.error('Error al transcribir el audio');
        return { success: false };
      }
    } catch (error) {
      console.error('Error de red:', error);
      return { success: false, error: error.message };
    }
};