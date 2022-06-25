import {
  DependencyList,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CombinedError, OperationContext, useQuery, UseQueryState } from "urql";

// マウント時及びdepsの変更時にクエリを実行
// 通常のuseQueryの戻り値に加えてuseSteteのSetStateを返す
type ReexecuteQuery = (opts?: Partial<OperationContext> | undefined) => void;
type UseQueryStateValues<T> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  fetching: boolean;
  error: CombinedError | undefined;
  reexecuteQuery: ReexecuteQuery;
};
export const useQueryState = <T>(
  query: string,
  deps?: Exclude<DependencyList, T>,
  onChange?: (data: T) => void | Promise<void>
): UseQueryStateValues<T> => {
  const [data, setData] = useState<T | null>(null);
  const [result, reexecuteQuery] = useQuery<T>({ query }) as [
    UseQueryState<
      T,
      Pick<UseQueryStateValues<T>, "data" | "error" | "fetching">
    >,
    ReexecuteQuery
  ];
  useEffect(
    () => {
      if (!data) reexecuteQuery();
      if (result.data) setData(result.data);
    },
    deps ? [...deps, result.data] : [result.data]
  );
  useEffect(() => {
    if (data) onChange && onChange(data);
  }, [data]);
  return { ...result, error: result.error, reexecuteQuery, data, setData };
};
