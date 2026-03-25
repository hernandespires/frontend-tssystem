export interface AsanaTask {
	gid: string
	name: string
	completed: boolean
	due_on: string | null
	assignee: AsanaUser | null
	notes: string
	created_at: string
	modified_at: string
	memberships: AsanaMembership[]
	custom_fields: AsanaCustomField[]
}

export interface AsanaUser {
	gid: string
	name: string
	email?: string
}

export interface AsanaSection {
	gid: string
	name: string
}

export interface AsanaMembership {
	project: { gid: string; name: string }
	section: AsanaSection
}

export interface AsanaCustomField {
	gid: string
	name: string
	display_value: string | null
	type: string
}

export interface AsanaEnumOption {
	gid: string
	name: string
	color: string
	enabled: boolean
}

export interface AsanaCustomFieldSetting {
	gid: string
	custom_field: {
		gid: string
		name: string
		type: string
		enum_options?: AsanaEnumOption[]
	}
}

export interface AsanaProject {
	gid: string
	name: string
	notes: string
	created_at: string
	modified_at: string
	current_status: AsanaProjectStatus | null
	members: AsanaUser[]
}

export interface AsanaProjectStatus {
	color: string
	text: string
	author: AsanaUser
	created_at: string
}
