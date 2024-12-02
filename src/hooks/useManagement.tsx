import { createData, deleteData, fetchData, updateData } from "@/api/crud";
import { ManagementType } from "@/types/management";
import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useManagement = () => {
  const queryClient = useQueryClient();
  const { data, ...restQuery } = useQuery({
    queryFn: () => fetchData("management"),
    queryKey: ["management"]
  });
  const { mutate } = useMutation({
    mutationFn: (data: ManagementType) => createData("management", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["management"] });
      toast.success("데이터 등록 성공!");
    }
  });
  const { mutate: remove } = useMutation({
    mutationFn: (ids: readonly GridRowId[] | number[]) =>
      deleteData("management", ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["management"] });
      toast.success("데이터 삭제 성공!");
    }
  });
  const { mutate: edit } = useMutation({
    mutationFn: (data: ManagementType) => updateData("management", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["management"] });
      toast.success("데이터 수정 성공!");
    }
  });
  return { management: data, ...restQuery, mutate, remove, edit };
};

export default useManagement;
