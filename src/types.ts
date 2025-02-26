export type TutorialInfo = {
	tutorial_title: string;
	tool: string;
	prefix: string;
	base?: string;
	legacy?: boolean;
	globalModifiers?: string[];
	core?: string[];
};
export type Step = {
	id: number;
	title: string;
	video?: string;
	explanation?: string;
	tagline?: string;
	description?: string;
	short?: string;
	hint?: string;
	code?: string;

	outcome?: string;
	modifiers?: string[];
	whitelist?: string[];
};
export type Tutorial = [TutorialInfo, ...Step[]];
