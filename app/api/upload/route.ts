import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const orderId = formData.get("order_id") as string | null;

    if (!file || !orderId) {
      return NextResponse.json(
        { error: "Archivo y order_id requeridos" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${orderId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("comprobantes")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage
      .from("comprobantes")
      .getPublicUrl(fileName);

    // Update order with payment proof URL
    const { error: updateError } = await supabase
      .from("orders")
      .update({ payment_proof_url: publicUrl.publicUrl })
      .eq("id", orderId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
