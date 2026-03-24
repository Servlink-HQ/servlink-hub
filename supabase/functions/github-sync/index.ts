// Supabase Edge Function: github-sync
// Deploy: supabase functions deploy github-sync
// Set secret: supabase secrets set GITHUB_PAT=<your_pat>

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const GITHUB_PAT = Deno.env.get("GITHUB_PAT");
    if (!GITHUB_PAT) {
      return new Response(
        JSON.stringify({ success: false, error: "GITHUB_PAT secret not set" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { task, repo = "mscarpenter/servlink-hub" } = await req.json();

    if (!task || !task.id || !task.title) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid task payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build issue body with all task metadata
    const issueBody = [
      `## ${task.id} — ${task.title}`,
      "",
      `| Campo | Valor |`,
      `|-------|-------|`,
      `| **Sprint** | ${task.sprint || "—"} |`,
      `| **Status** | ${task.status || "—"} |`,
      `| **Priority** | ${task.priority || "—"} |`,
      `| **Points** | ${task.points ?? "—"} |`,
      `| **Due Date** | ${task.deadline || "—"} |`,
      `| **Assignees** | ${(task.assignees || []).join(", ") || "—"} |`,
      "",
      task.desc ? `### Descrição\n${task.desc}` : "",
      "",
      "---",
      "*Sincronizado via ServLink WorkOS*",
    ].filter(line => line !== undefined).join("\n");

    const issueTitle = `[${task.id}] ${task.title}`;

    // Check if issue already exists (search by title)
    const searchResp = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repo} "${issueTitle}" in:title is:issue`)}&per_page=1`,
      {
        headers: {
          Authorization: `token ${GITHUB_PAT}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "ServLink-WorkOS",
        },
      }
    );
    const searchData = await searchResp.json();
    const existingIssue = searchData.items?.[0];

    let result;
    if (existingIssue) {
      // Update existing issue body
      const updateResp = await fetch(
        `https://api.github.com/repos/${repo}/issues/${existingIssue.number}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `token ${GITHUB_PAT}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "ServLink-WorkOS",
          },
          body: JSON.stringify({ body: issueBody, state: task.status === "Done" ? "closed" : "open" }),
        }
      );
      result = await updateResp.json();
      return new Response(
        JSON.stringify({ success: true, action: "updated", issue: { number: result.number, url: result.html_url } }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Create new issue
      const createResp = await fetch(
        `https://api.github.com/repos/${repo}/issues`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${GITHUB_PAT}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "ServLink-WorkOS",
          },
          body: JSON.stringify({ title: issueTitle, body: issueBody }),
        }
      );
      result = await createResp.json();
      if (!createResp.ok) {
        return new Response(
          JSON.stringify({ success: false, error: result.message || "GitHub API error" }),
          { status: createResp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ success: true, action: "created", issue: { number: result.number, url: result.html_url } }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
