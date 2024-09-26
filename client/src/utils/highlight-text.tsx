export const highlightText = (title: string, query: string) => {
	/**
	 * splits the title by the query into an array of strings
	 * itterates the array and checks if there's a match between the string and the query
	 * if there's a much, the string will be highlighted in yellow using a span
	 */
	if (!query) return title;
	const regex = new RegExp(`(${query})`, "gi"); // creates a regex object, which is used to search for matches of the query string within another string, also case insensitive.
	const parts = title.split(regex);

	return parts.map((part, index) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<span key={index} style={{ backgroundColor: "yellow" }}>
				{part}
			</span>
		) : (
			part
		)
	);
};