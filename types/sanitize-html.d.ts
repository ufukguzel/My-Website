declare module 'sanitize-html' {
    const sanitizeHtml: (html: string, options?: {
      allowedTags?: string[];
      allowedAttributes?: Record<string, string[]>;
    }) => string;
  
    export default sanitizeHtml;
  }