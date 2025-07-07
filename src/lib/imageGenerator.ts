declare global {
  interface Window {
    generate_image?: (params: {
      prompt: string;
      target_path: string;
      width?: number;
      height?: number;
      model?: string;
    }) => Promise<void>;
  }
}

export const generateImage = async (
  prompt: string,
  targetPath: string,
  width: number = 1200,
  height: number = 630,
  model: string = 'flux.schnell'
): Promise<void> => {
  if (window.generate_image) {
    await window.generate_image({
      prompt,
      target_path: targetPath,
      width,
      height,
      model
    });
  } else {
    throw new Error('Image generation not available');
  }
};