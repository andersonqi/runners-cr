import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Participant } from "@/lib/types";

function generateOrderNumber(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ABR-${datePart}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participants, total_amount } = body as {
      participants: Participant[];
      total_amount: number;
    };

    if (!participants || participants.length === 0) {
      return NextResponse.json({ error: "No hay participantes" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ order_number: orderNumber, total_amount })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Create registrations
    const registrations = participants.map((p) => ({
      ...p,
      order_id: order.id,
    }));

    const { error: regError } = await supabase
      .from("registrations")
      .insert(registrations);

    if (regError) {
      return NextResponse.json({ error: regError.message }, { status: 500 });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
