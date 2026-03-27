const DEPARTMENT_LABEL_MAP: Record<string, string> = {
	// Mapeamentos removidos conforme solicitado pelo usuário
}

const LOWERCASE_WORDS = ["de", "do", "da", "dos", "das", "e", "com", "em", "para"]

export const formatDepartmentLabel = (department: string): string => {
	if (DEPARTMENT_LABEL_MAP[department]) return DEPARTMENT_LABEL_MAP[department]

	return department
		.replace(/_/g, " ")
		.toLowerCase()
		.split(" ")
		.map((word, index) => {
			if (index > 0 && LOWERCASE_WORDS.includes(word)) return word
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(" ")
}

export const isDepartmentMapped = (department: string): boolean =>
	!!DEPARTMENT_LABEL_MAP[department]

export const normalizeText = (text: string): string =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase()
