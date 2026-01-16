document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const fileName = document.getElementById('fileName');
  const recognizedText = document.getElementById('recognizedText');
  const loading = document.getElementById('loading');
  const usePresetBtn = document.getElementById('usePresetBtn');

  // Путь к предустановленному фото
  const presetImagePath = 'images/schedule.jpg';

  // Обработчик загрузки файла
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileName.textContent = `Загружено: ${file.name}`;
    await recognizeTextFromFile(file);
  });

  // Обработчик кнопки "Использовать предустановленное"
  usePresetBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(presetImagePath);
      if (!response.ok) {
        throw new Error('Фото не найдено');
      }
      const blob = await response.blob();
      await recognizeTextFromBlob(blob);
    } catch (err) {
      recognizedText.textContent = `Ошибка: ${err.message}`;
      console.error(err);
    }
  });

  // Функция распознавания из файла
  async function recognizeTextFromFile(file) {
    loading.style.display = 'block';
    recognizedText.style.display = 'none';

    try {
      const result = await Tesseract.recognize(file, 'rus+eng', {
        logger: m => console.log(m)
      });
      recognizedText.textContent = result.data.text;
    } catch (err) {
      recognizedText.textContent = `Ошибка распознавания: ${err.message}`;
      console.error(err);
    }

    loading.style.display = 'none';
    recognizedText.style.display = 'block';
  }

  // Функция распознавания из blob
  async function recognizeTextFromBlob(blob) {
    loading.style.display = 'block';
    recognizedText.style.display = 'none';

    try {
      const result = await Tesseract.recognize(blob, 'rus+eng', {
        logger: m => console.log(m)
      });
      recognizedText.textContent = result.data.text;
    } catch (err) {
      recognizedText.textContent = `Ошибка распознавания: ${err.message}`;
      console.error(err);
    }

    loading.style.display = 'none';
    recognizedText.style.display = 'block';
  }
});
