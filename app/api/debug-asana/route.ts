import { findProjectCustomFields } from "@/services/asana/project"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const fields = await findProjectCustomFields()
        console.log("ASANA_FIELDS_DEBUG_START")
        console.log(JSON.stringify(fields, null, 2))
        console.log("ASANA_FIELDS_DEBUG_END")
        return NextResponse.json(fields)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
