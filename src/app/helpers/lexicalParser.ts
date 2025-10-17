export function extractTextFromLexical(content: string | object): string {
  try {
    // Handle null/undefined
    if (!content) return '';
    
    // If it's already plain text, return it
    if (typeof content === 'string') {
      // Check if it's JSON or plain text
      try {
        JSON.parse(content);
        // It's JSON, continue parsing
      } catch {
        // It's plain text, return as is
        return content;
      }
    }
    
    const lexicalData = typeof content === 'string' ? JSON.parse(content) : content;
    
    let text = '';
    
    const extractTextFromNode = (node: any): void => {
      if (node.text) {
        text += node.text + ' ';
      }
      
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(extractTextFromNode);
      }
    };
    
    if (lexicalData.root?.children) {
      lexicalData.root.children.forEach(extractTextFromNode);
    }
    
    return text.trim();
  } catch (error) {
    console.error('Error extracting text from Lexical:', error);
    return '';
  }
}