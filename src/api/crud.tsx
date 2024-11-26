import supabase from "@/utils/supabase/client";
import { GridRowId } from "@mui/x-data-grid";

export const fetchData = async (table: string) => {
  return (await supabase.from(table).select("*")).data;
};

export const fetchDataById = async (table: string, id: GridRowId | number) => {
  return (await supabase.from(table).select("*").eq("id", id)).data;
};

export const createData = async (table: string, data: any) => {
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

export const updateData = async (table: string, data: any) => {
  await supabase.from(table).update(data).eq("id", data.id);
};
