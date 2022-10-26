// useInfiniteQuery랑 호환이 잘되는 만들어진 라이브러리
import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // fetchNextPage InfiniteScroll에 지시하는 역할
  // hasNextPage boolean 값 (수집할 데이터가 더 있는지 없는지)
  // lastPage.next가 undefined이면 hasNextPage false
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  console.log(data);
  if (isLoading) return <div className="loading">Loading</div>;
  if (isError) return <div>{error.toString()}</div>;
  return (
    <>
      {isFetching && <div className="loading">Loading</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hairColor}
                eyeColor={person.eyeColor}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
