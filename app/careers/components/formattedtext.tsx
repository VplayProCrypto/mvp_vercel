interface FormattedTextProps {
  text: string; // The text to be formatted into paragraphs
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Function to parse and render text with Markdown-like emphasis
  const renderMarkdown = (text: string) => {
    // Regular expressions to match bold+italic and bold patterns
    const boldItalicPattern = /\*\*\*(.*?)\*\*\*/g;
    const boldPattern = /\*\*(.*?)\*\*/g;

    // Helper function to replace matched patterns with React elements
    const replacePattern = (
      text: string,
      pattern: RegExp,
      component: (matched: string) => JSX.Element
    ) => {
      let match;
      let lastIndex = 0;
      const result = [];

      while ((match = pattern.exec(text)) !== null) {
        const matchedText = match[1];

        // Push preceding text if exists
        if (match.index > lastIndex) {
          result.push(text.substring(lastIndex, match.index));
        }

        // Push styled component
        result.push(component(matchedText));

        lastIndex = pattern.lastIndex;
      }

      // Push remaining text if exists
      if (lastIndex < text.length) {
        result.push(text.substring(lastIndex));
      }

      return result;
    };

    // Replace bold+italic with a header component, then bold
    let processed = replacePattern(text, boldItalicPattern, (matched) => (
      <h3 className="font-bold italic">{matched}</h3>
    ));
    processed = processed.flatMap((part) =>
      typeof part === 'string'
        ? replacePattern(part, boldPattern, (matched) => (
            <span className="font-bold">{matched}</span>
          ))
        : part
    );

    return processed;
  };

  // Split the text into paragraphs and add more spacing
  const paragraphs = text.split('\n').filter((p) => p.length > 0);

  return (
    <div className="space-y-8 px-8">
      {' '}
      {/* Adjusted spacing between paragraphs */}
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          className="text-left text-white leading-relaxed mt-5 mb-5"
        >
          {renderMarkdown(paragraph)}
        </div>
      ))}
    </div>
  );
};

export default FormattedText;
