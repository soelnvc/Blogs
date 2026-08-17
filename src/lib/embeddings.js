import { pipeline } from '@xenova/transformers';

class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

/**
 * Generate a normalized 384-dimensional vector embedding for given text
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} - Array of 384 floats
 */
export async function generateEmbedding(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Valid text string is required to generate embedding');
  }

  const extractor = await EmbeddingPipeline.getInstance();
  const output = await extractor(text, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data);
}
