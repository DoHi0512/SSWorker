import { createClient } from "@/utils/supabase/client";

type TeamData = {
  team: string;
  category: string;
  total_payment_month?: number;
  total_time_month?: number;
  total_payment?: number;
  total_time?: number;
};

export const fetchLaborStatement = async (selectedDate: string) => {
  const today = new Date(selectedDate).toISOString().split("T")[0];
  const supabase = createClient();
  const firstDayOfMonth = new Date(selectedDate);
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split("T")[0];
  const { data: todayData } = await supabase.rpc("labor_statement", {
    target_date: today
  });
  const { data: monthData } = await supabase.rpc("labor_statement_range", {
    start_date: firstDay,
    end_date: today
  });
  const { data: placeData } = await supabase.rpc("labor_statement_place", {
    target_date: selectedDate
  });
  const teamMap: Record<string, TeamData> = {};
  monthData.forEach(
    ({ team, category, total_payment_month, total_time_month }: TeamData) => {
      const key = `${team}-${category}`;
      if (!teamMap[key]) {
        teamMap[key] = { team, category };
      }
      teamMap[key].total_payment_month = total_payment_month;
      teamMap[key].total_time_month = total_time_month;
    }
  );
  todayData.forEach(
    ({ team, category, total_payment, total_time }: TeamData) => {
      const key = `${team}-${category}`;
      if (!teamMap[key]) {
        teamMap[key] = { team, category };
      }
      teamMap[key].total_payment = total_payment;
      teamMap[key].total_time = total_time;
    }
  );

  const data = Object.values(teamMap);

  const totalTime = data.reduce((acc, item) => acc + (item.total_time ?? 0), 0);
  const totalPayment = data.reduce(
    (acc, item) => acc + (item.total_payment ?? 0),
    0
  );
  const totalTimeMonth = data.reduce(
    (acc, item) => acc + (item.total_time_month ?? 0),
    0
  );
  const totalPaymentMonth = data.reduce(
    (acc, item) => acc + (item.total_payment_month ?? 0),
    0
  );

  return {
    data,
    totalTime,
    totalPayment,
    totalPaymentMonth,
    totalTimeMonth,
    placeData
  };
};
