import { createData, deleteData, fetchData, updateData } from "@/api/crud";
import { PlaceType } from "@/types/place";
import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const usePlace = () => {
  const queryClient = useQueryClient();
  const { data, ...restQuery } = useQuery({
    queryFn: () => fetchData("place"),
    queryKey: ["place"]
  });
  const { mutate } = useMutation({
    mutationFn: (data: PlaceType) => createData("place", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place"] });
      toast.success("현장 등록 성공!");
    }
  });
  const { mutate: remove } = useMutation({
    mutationFn: (ids: readonly GridRowId[] | number[]) =>
      deleteData("place", ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place"] });
      toast.success("현장 삭제 성공!");
    }
  });
  const { mutate: edit } = useMutation({
    mutationFn: (data: PlaceType) => updateData("place", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place"] });
      toast.success("현장 수정 성공!");
    }
  });
  return { place: data, ...restQuery, mutate, remove, edit };
};

export default usePlace;
