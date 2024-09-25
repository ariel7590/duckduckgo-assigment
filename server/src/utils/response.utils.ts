import { DuckDuckGoTopic, SearchResult } from "../types/types";

export const mapDuckDuckGoResponse = (data: DuckDuckGoTopic[]): SearchResult[] => {
	/**
	 * Takes the API response and returns it in a simplified format
	 */
	return data
		.map((topic) => {
			if (topic.FirstURL && topic.Result) {
				const title = extractTitleFromResult(topic.Result);
				return { url: topic.FirstURL, title };
			} else if (topic.Topics) {
				return topic.Topics.map((subTopic) => {
					const title = extractTitleFromResult(subTopic.Result);
					return {
						url: subTopic.FirstURL,
						title,
					};
				});
			}
		})
		.flat()
		.filter(Boolean) as SearchResult[];
};

const extractTitleFromResult = (input: string): string | null => {
	/**
	 * In the Json file we get from the DDG API, the title appears only in the Result field inside the <a> tag.
	 * This function extracts the title from the Result field.
	 * In simple terms, it returns the substring between the opening and closing <a> tags.
	 */
	const start = input.indexOf(">") + 1;
	const end = input.indexOf("</a>");

	if (start !== -1 && end !== -1) {
		return input.substring(start, end).trim();
	}

	return null;
};