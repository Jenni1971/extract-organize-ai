import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { screenshotId } = await req.json();
    if (!screenshotId) {
      return new Response(JSON.stringify({ error: "screenshotId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openaiKey = Deno.env.get("OPENAI_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: screenshot, error: fetchErr } = await supabase
      .from("screenshots")
      .select("*")
      .eq("id", screenshotId)
      .single();

    if (fetchErr || !screenshot) {
      return new Response(JSON.stringify({ error: "Screenshot not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signedErr } = await supabase.storage
      .from("screenshots")
      .createSignedUrl(screenshot.image_url.replace(/^screenshots\//, ""), 300);

    if (signedErr || !signed?.signedUrl) {
      return new Response(JSON.stringify({ error: "Could not create signed URL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const oaResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Extract structured data from images: recipes, crochet/knitting patterns, DIY, or decor. Return JSON with: title, type (recipe|crochet|knitting|diy|decor|unknown), content (text), structured (domain fields).",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Extract all details. Return JSON." },
              { type: "image_url", image_url: { url: signed.signedUrl } },
            ],
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
    });

    if (!oaResp.ok) {
      const msg = await oaResp.text();
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const oa = await oaResp.json();
    const result = JSON.parse(oa?.choices?.[0]?.message?.content || "{}");

    const title = result.title || "Untitled";
    const type = result.type || "unknown";
    const rawText = result.content || "";
    const structured = result.structured || {};

    const { error: insertErr } = await supabase.from("extracted_content").insert({
      screenshot_id: screenshotId,
      user_id: screenshot.user_id,
      raw_text: rawText,
      structured_data: structured,
      content_type: type,
      title,
    });

    if (insertErr) {
      await supabase.from("screenshots").update({ status: "failed", error: insertErr.message }).eq("id", screenshotId);
      return new Response(JSON.stringify({ error: insertErr.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase.from("screenshots").update({ status: "done" }).eq("id", screenshotId);

    return new Response(JSON.stringify({ ok: true, title, type, category: type }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e?.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
