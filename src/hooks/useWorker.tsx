import { WorkerTypes } from "@/types/worker";
import supabase from "@/utils/supabase/client";
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
  return { worker: data, ...restQuery, mutate };
};

const getWorkers = async () => {
  return (await supabase.from("worker").select("*")).data;
};

const addWorker = async (data: WorkerTypes) => {
  await supabase.from("worker").insert(data);
};

export default useWorker;
