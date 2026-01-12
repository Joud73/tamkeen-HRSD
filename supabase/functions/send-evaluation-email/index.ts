import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EvaluationEmailRequest {
  toEmail: string;
  courseSlug?: string;
  submittedAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured", fallback: true }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { toEmail, courseSlug, submittedAt }: EvaluationEmailRequest = await req.json();

    if (!toEmail) {
      return new Response(
        JSON.stringify({ error: "Missing toEmail" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email using Resend API directly via fetch
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "تمكين <onboarding@resend.dev>",
        to: [toEmail],
        subject: "تم استلام التقييم الذاتي",
        html: `
          <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: right;">
            <h1 style="color: #148287;">تم استلام التقييم الذاتي</h1>
            <p>تم إرسال تقييمك الذاتي للمراجعة، وسيتم إشعارك بالنتيجة.</p>
            <p style="color: #666;">تاريخ الإرسال: ${submittedAt}</p>
            ${courseSlug ? `<p style="color: #666;">المساق: ${courseSlug}</p>` : ''}
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">وزارة الموارد البشرية والتنمية الاجتماعية</p>
          </div>
        `,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-evaluation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
