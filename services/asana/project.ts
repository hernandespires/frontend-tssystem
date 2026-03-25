import asanaApi from "@/lib/asana"
import {
	AsanaProject,
	AsanaTask,
	AsanaSection,
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
