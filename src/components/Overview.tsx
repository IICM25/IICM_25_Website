import ReactMarkdown from "react-markdown";

interface Competition {
	name: string;
	desc: string;
}
interface OverviewProps {
	content: string;
	title: string;
	competitions: Competition[];
	handleCompetitionClick: (competitionName: string) => void;
	slug: string;
}

export const Overview = ({
	content,
	title,
	competitions,
	handleCompetitionClick,
	slug,
}: OverviewProps) => {
	return (
		<div className="bg-foreground/5 p-6 sm:p-8 backdrop-blur-2xl bg-black/0 rounded-lg border border-primary/10">
			<h3 className="font-title text-3xl vintage-title text-primary mb-6 border-b border-primary/20 pb-4">
				{title}
			</h3>
			<div className="prose prose-invert prose-lg vintage-body max-w-none text-foreground/80 prose-headings:text-secondary prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-secondary prose-p:leading-relaxed">
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			{slug !== "MnM" && (
				<div className="mt-8">
					<h2 className="font-title vintage-title text-3xl text-secondary mb-4">
						Competitions
					</h2>
					<ul className=" m-0 px-7 flex vintage-body flex-col items-start gap-2">
						{competitions?.map((comp) => (
							<li key={comp.name}>
								<button
									onClick={() => handleCompetitionClick(comp.name)}
									className="font-title vintage-body text-lg lg:text-xl text-secondary hover:text-primary cursor-pointer transition-colors text-left"
								>
									{comp.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
