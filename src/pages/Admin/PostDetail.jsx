import { useParams } from 'react-router-dom';
const PostDetail = () => {
  const { postId } = useParams()
  return (
    <>
      <h1>記事詳細画面</h1>
      <p>PostId: {postId}</p>
    </>
  )
}

export default PostDetail
