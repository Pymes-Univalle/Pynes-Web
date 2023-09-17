import { NextResponse } from "next/server";


export function GET() {
    return NextResponse.json({ message: "Getting insumos ..." });
}

export function POST() {
    return NextResponse.json({ message: "Creating insumo ..." });
}