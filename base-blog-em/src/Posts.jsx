import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PostDetail } from "./PostDetail";
import { useQueryClient } from "react-query";

const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );

  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // prefetchQuery으로 로딩 없이 다음 페이지의 데이터를 미리 가져온다.
    // 9페이지까지만 미리 가져온다.
    if (maxPostPage > currentPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  // const data = [];
  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      // 쿼리키가 바뀌어도 이전 페이지로 돌아갔을때 데이터를 유지하게하는 옵션
      keepPreviousData: true,
    }
  );

  // 데이터 패칭이 안되어있고 캐시도 없을때
  if (isLoading) return <h3>Loading중~</h3>;
  // 데이터 패칭중 에러가 발생할때 기본으로 3번정도 시도하고 하단에 메세지 출력
  // 에러를 표시할수도 있다.
  if (isError)
    return (
      <>
        <h3>Error!!!</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
