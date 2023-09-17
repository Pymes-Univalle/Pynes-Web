import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "Getting single insumo ..." });
}

export function DELETE() {
    return NextResponse.json({ message: "Deleting single insumo ..." });
}

export function PUT() {
    return NextResponse.json({ message: "Updating single insumo ..." });
}