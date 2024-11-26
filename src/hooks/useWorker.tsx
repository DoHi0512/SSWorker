import { createData, deleteData, fetchData, updateData } from "@/api/crud";
import { WorkerTypes } from "@/types/worker";
import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useWorker = () => {
  const queryClient = useQueryClient();
  const { data, ...restQuery } = useQuery({
    queryFn: () => fetchData("worker"),
    queryKey: ["worker"]
  });
  const { mutate } = useMutation({
    mutationFn: (data: WorkerTypes) => createData("worker", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 등록 성공!");
    }
  });
  const { mutate: remove } = useMutation({
    mutationFn: (ids: readonly GridRowId[] | number[]) =>
      deleteData("worker", ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 삭제 성공!");
    }
  });
  const { mutate: edit } = useMutation({
    mutationFn: (data: WorkerTypes) => updateData("worker", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
      toast.success("근로자 수정 성공!");
    }
  });
  return { worker: data, ...restQuery, mutate, remove, edit };
};

export default useWorker;
