import asanaApi from "@/lib/asana"
import {
	AsanaProject,
	AsanaTask,
	AsanaSection,
	AsanaCustomFieldSetting,
	AsanaEnumOption,
} from "@/types/services/asana/project"

const PROJECT_GID = process.env.NEXT_PUBLIC_ASANA_PROJECT_GID || ""

export const findProjectDetails = async (): Promise<AsanaProject> => {
	const response = await asanaApi.get(`/projects/${PROJECT_GID}`, {
		params: {
			opt_fields:
				"name,notes,created_at,modified_at,current_status,members.name,members.email",
		},
	})
	return response.data.data
}

export const findProjectSections = async (): Promise<AsanaSection[]> => {
	const response = await asanaApi.get(`/projects/${PROJECT_GID}/sections`, {
		params: {
			opt_fields: "name",
		},
	})
	return response.data.data
}

export const findProjectTasks = async (): Promise<AsanaTask[]> => {
	const response = await asanaApi.get(`/tasks`, {
		params: {
			project: PROJECT_GID,
			limit: 100,
			opt_fields:
				"name,completed,due_on,assignee.name,notes,created_at,modified_at,memberships.section.name,custom_fields",
		},
	})
	return response.data.data
}

export const findTasksBySection = async (
	sectionGid: string
): Promise<AsanaTask[]> => {
	const response = await asanaApi.get(`/sections/${sectionGid}/tasks`, {
		params: {
			opt_fields:
				"name,completed,due_on,assignee.name,notes,created_at,modified_at,custom_fields",
		},
	})
	return response.data.data
}

export const findProjectCustomFields = async (): Promise<
	AsanaCustomFieldSetting[]
> => {
	const response = await asanaApi.get(
		`/projects/${PROJECT_GID}/custom_field_settings`,
		{
			params: {
				opt_fields:
					"custom_field.name,custom_field.type,custom_field.enum_options.name,custom_field.enum_options.enabled,custom_field.enum_options.color",
			},
		}
	)
	return response.data.data
}

export const findCustomFieldEnumOptions = async (
	fieldName: string
): Promise<AsanaEnumOption[]> => {
	const settings = await findProjectCustomFields()
	const field = settings.find(
		(s) => s.custom_field.name.toUpperCase() === fieldName.toUpperCase()
	)
	if (!field?.custom_field.enum_options) return []
	return field.custom_field.enum_options.filter((opt) => opt.enabled)
}

export const findSuppliersByCategories = async (
	allowedCategories: string[]
): Promise<string[]> => {
	const tasks = await findProjectTasks()
	const normalizedCategories = allowedCategories.map((c) =>
		c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
	)

	const supplierSet = new Set<string>()

	for (const task of tasks) {
		const categoryField = task.custom_fields?.find(
			(cf) => cf.name.toUpperCase() === "CATEGORIA"
		)
		if (!categoryField?.display_value) continue

		const normalizedCategory = categoryField.display_value
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toUpperCase()

		const matchesCategory = normalizedCategories.some(
			(allowed) => {
				const singularAllowed = allowed.endsWith('S') ? allowed.slice(0, -1) : allowed;
				const singularCategory = normalizedCategory.endsWith('S') ? normalizedCategory.slice(0, -1) : normalizedCategory;
				
				return (
					normalizedCategory.includes(allowed) || 
					allowed.includes(normalizedCategory) ||
					singularCategory.includes(singularAllowed) ||
					singularAllowed.includes(singularCategory)
				)
			}
		)
		if (!matchesCategory) continue

		const supplierField = task.custom_fields?.find(
			(cf) => cf.name.toUpperCase() === "FORNECEDOR"
		)
		if (supplierField?.display_value) {
			const val = String(supplierField.display_value).trim()
			if (val) supplierSet.add(val)
		}
	}

	return Array.from(supplierSet).sort()
}
