// components/LexicalRenderer.tsx
'use client';

import React from 'react';

interface LexicalNode {
  type: string;
  version: number;
  children?: LexicalNode[];
  text?: string;
  format?: number | string; // Can be number (bitmask) or string (alignment)
  style?: string;
  direction?: 'ltr' | 'rtl' | null;
  indent?: number;
  tag?: string;
  listType?: 'bullet' | 'number';
  [key: string]: any;
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
  };
}

interface LexicalRendererProps {
  content: string | LexicalContent;
  className?: string;
  maxLength?: number;
}

const LexicalRenderer: React.FC<LexicalRendererProps> = ({ 
  content, 
  className = '',
  maxLength 
}) => {
  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null;

    const key = `${node.type}-${index}`;

    // Handle text nodes
    if (node.type === 'text' && node.text) {
      let textContent = node.text;

      // Apply formatting based on format bitmask (number)
      let element: React.ReactNode = textContent;

      if (typeof node.format === 'number') {
        if (node.format & 1) { // Bold
          element = <strong>{element}</strong>;
        }
        if (node.format & 2) { // Italic
          element = <em>{element}</em>;
        }
        if (node.format & 4) { // Underline
          element = <u>{element}</u>;
        }
        if (node.format & 8) { // Strikethrough
          element = <s>{element}</s>;
        }
        if (node.format & 16) { // Code
          element = <code className="bg-gray-100 px-1 rounded">{element}</code>;
        }
      }

      // Apply styles if any
      if (node.style) {
        element = <span style={{ ...parseStyle(node.style) }}>{element}</span>;
      }

      return <React.Fragment key={key}>{element}</React.Fragment>;
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph') {
      const style: React.CSSProperties = {};
      
      // Check if format is a string for alignment
      if (typeof node.format === 'string') {
        if (node.format === 'center') {
          style.textAlign = 'center';
        } else if (node.format === 'right') {
          style.textAlign = 'right';
        } else if (node.format === 'justify') {
          style.textAlign = 'justify';
        }
      }

      if (node.indent) {
        style.marginLeft = `${node.indent * 20}px`;
      }

      if (node.direction) {
        style.direction = node.direction;
      }

      return (
        <p key={key} style={style} className="mb-2">
          {node.children?.map((child, idx) => renderNode(child, idx))}
        </p>
      );
    }

    

    // Handle list nodes
    if (node.type === 'list') {
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol';
      return (
        <ListTag key={key} className="my-2 ml-6">
          {node.children?.map((child, idx) => renderNode(child, idx))}
        </ListTag>
      );
    }

    if (node.type === 'listitem') {
      return (
        <li key={key}>
          {node.children?.map((child, idx) => renderNode(child, idx))}
        </li>
      );
    }

    // Handle line breaks
    if (node.type === 'linebreak') {
      return <br key={key} />;
    }

    // Handle generic element nodes
    if (node.children) {
      return (
        <div key={key}>
          {node.children.map((child, idx) => renderNode(child, idx))}
        </div>
      );
    }

    return null;
  };

  // Parse inline styles with proper typing
  const parseStyle = (styleString: string): React.CSSProperties => {
    const style: React.CSSProperties = {};
    
    if (!styleString) return style;
    
    const declarations = styleString.split(';').filter(dec => dec.trim());
    
    declarations.forEach(declaration => {
      const [property, value] = declaration.split(':').map(part => part?.trim());
      
      if (property && value) {
        // Convert kebab-case to camelCase for React
        const cssProperty = property.replace(/-([a-z])/g, (_, letter) => 
          letter.toUpperCase()
        ) as keyof React.CSSProperties;
        
        // Only assign if it's a valid CSS property
        if (cssProperty in style) {
          (style as any)[cssProperty] = value;
        }
      }
    });
    
    return style;
  };

  // Parse and render content
  const renderContent = () => {
    try {
      let parsedContent: LexicalContent;
      
      if (typeof content === 'string') {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }

      if (!parsedContent.root?.children) {
        return <div>No content available</div>;
      }

      let renderedContent = parsedContent.root.children.map((child, index) => 
        renderNode(child, index)
      );

      // Handle maxLength for excerpts
      if (maxLength) {
        const textContent = extractPlainText(parsedContent);
        if (textContent.length > maxLength) {
          renderedContent = [
            <div key="excerpt">
              {textContent.substring(0, maxLength)}...
            </div>
          ];
        }
      }

      return renderedContent;

    } catch (error) {
      console.error('Error rendering Lexical content:', error);
      return <div>Error rendering content</div>;
    }
  };

  // Extract plain text for length calculation
  const extractPlainText = (lexicalData: LexicalContent): string => {
    let text = '';
    
    const extractText = (node: LexicalNode): void => {
      if (node.text) {
        text += node.text;
      }
      if (node.children) {
        node.children.forEach(extractText);
      }
    };

    if (lexicalData.root?.children) {
      lexicalData.root.children.forEach(extractText);
    }
    
    return text;
  };

  return (
    <div className={`lexical-content ${className}`}>
      {renderContent()}
    </div>
  );
};

export default LexicalRenderer;