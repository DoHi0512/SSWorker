import { ManagementType } from "@/types/management";
import { PlaceType } from "@/types/place";
import { WorkerTypes } from "@/types/worker";
import supabase from "@/utils/supabase/client";
import { GridRowId } from "@mui/x-data-grid";

export const fetchData = async (table: string, order?: string) => {
  if (order) {
    return (
      await supabase.from(table).select("*").order(order, { ascending: false })
    ).data;
  }
  return (await supabase.from(table).select("*")).data;
};

export const fetchDataById = async (table: string, id: GridRowId | number) => {
  return (await supabase.from(table).select("*").eq("id", id)).data;
};

export const createData = async (
  table: string,
  data: WorkerTypes | ManagementType | PlaceType
) => {
  await supabase.from(table).insert(data);
};

export const deleteData = async (
  table: string,
  ids: readonly GridRowId[] | number[]
) => {
  await Promise.all(
    ids.map((id) => supabase.from(table).delete().eq("id", id))
  );
};

export const updateData = async (
  table: string,
  data: WorkerTypes | ManagementType | PlaceType
) => {
  await supabase.from(table).update(data).eq("id", data.id);
};
