import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export interface AssignmentRow {
  id: string;
  association_id: string;
  association_name: string | null;
  year: number;
  status: string;
  completion_percentage: number;
  assigned_at: string;
  updated_at: string;
}

export const statusLabelMap: Record<string, string> = {
  not_started: "لم تبدأ",
  in_progress: "قيد التقييم",
  waiting_response: "بانتظار رد الجمعية",
  completed: "مكتمل",
};

export function useEvaluatorAssignments() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["evaluator-assignments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: assignments, error } = await supabase
        .from("evaluator_assignments")
        .select("*")
        .eq("evaluator_id", user!.id)
        .order("assigned_at", { ascending: false });

      if (error) throw error;

      // Fetch association names from profiles
      const associationIds = (assignments || []).map((a: any) => a.association_id);
      let profilesMap: Record<string, string | null> = {};

      if (associationIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, organization_name")
          .in("id", associationIds);

        if (profiles) {
          profilesMap = Object.fromEntries(
            profiles.map((p: any) => [p.id, p.organization_name])
          );
        }
      }

      return (assignments || []).map((a: any): AssignmentRow => ({
        id: a.id,
        association_id: a.association_id,
        association_name: profilesMap[a.association_id] || "جمعية غير معروفة",
        year: a.year,
        status: a.status,
        completion_percentage: a.completion_percentage,
        assigned_at: a.assigned_at,
        updated_at: a.updated_at,
      }));
    },
  });
}

export function useEvaluatorStats() {
  const { data: assignments, isLoading } = useEvaluatorAssignments();

  const stats = {
    total: assignments?.length ?? 0,
    notStarted: assignments?.filter((a) => a.status === "not_started").length ?? 0,
    inProgress: assignments?.filter((a) => a.status === "in_progress").length ?? 0,
    waitingResponse: assignments?.filter((a) => a.status === "waiting_response").length ?? 0,
    completed: assignments?.filter((a) => a.status === "completed").length ?? 0,
    completionRate: 0,
  };

  if (stats.total > 0) {
    stats.completionRate = Math.round((stats.completed / stats.total) * 100);
  }

  return { stats, isLoading };
}
