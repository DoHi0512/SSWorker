import { WorkerTypes } from "@/types/worker";
import supabase from "@/utils/supabase/client";
import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useWorker = () => {
  const queryClient = useQueryClient();
  const { data, ...restQuery } = useQuery({
    queryFn: getWorkers,
    queryKey: ["worker"]
  });
  const { mutate } = useMutation({
    mutationFn: addWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 등록 성공!");
    }
  });
  const { mutate: remove } = useMutation({
    mutationFn: removeWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 삭제 성공!");
    }
  });
  const { mutate: edit } = useMutation({
    mutationFn: editWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 수정 성공!");
    }
  });
  return { worker: data, ...restQuery, mutate, remove, edit };
};

const getWorkers = async () => {
  return (await supabase.from("worker").select("*")).data;
};

const addWorker = async (data: WorkerTypes) => {
  await supabase.from("worker").insert(data);
};

const removeWorker = async (selectedId: readonly GridRowId[]) => {
  await Promise.all(
    selectedId.map((id) => supabase.from("worker").delete().eq("id", id))
  );
};

const editWorker = async (data: WorkerTypes) => {
  console.log(data);
  await supabase.from("worker").update(data).eq("id", data.id);
};
export default useWorker;
