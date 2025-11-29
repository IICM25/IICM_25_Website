import ReactMarkdown from "react-markdown";

interface GuidelinesProps {
	guidelines: string;
}

export const Guidelines = ({ guidelines }: GuidelinesProps) => {
  return (
    <div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10">
      <div className="prose prose-invert vintage-body prose-lg max-w-none text-foreground/80 prose-a:text-primary hover:prose-a:text-secondary prose-ul:list-disc prose-li:ml-4">
        <ReactMarkdown>{guidelines}</ReactMarkdown>
      </div>
    </div>
  );
};
