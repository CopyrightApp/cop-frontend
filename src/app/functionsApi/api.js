export const handleTranscribe = async (file, language) => {
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('language', JSON.stringify(language))
    //console.log("Idioma seleccionado en la api:", language)
    
    try {
      const response = await fetch('http://localhost:4000/transcribe/audio', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, transcription: data.transcription };
      } else {
        //console.error('Error al transcribir el audio');
        return { success: false };
      }
    } catch (error) {
      //console.error('Error de red:', error);
      return { success: false, error: error.message };
    }
};