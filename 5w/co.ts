// @ts-ignore
import express, { Request, Response } from "express";

const app = express();

// 게시글 수정 API
app.put("/posts/:id", (req: Request, res: Response) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  // 게시글 수정 로직
  // ...

  // 수정된 게시글 정보 응답
  res.json({
    postId,
    title,
    content,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// @ts-ignore
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// 게시글 데이터
let posts: { id: number; title: string; content: string }[] = [
  { id: 1, title: "제목1", content: "내용1" },
  { id: 2, title: "제목2", content: "내용2" },
  { id: 3, title: "제목3", content: "내용3" },
];

// 게시글 수정 API
app.put("/posts/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;

  // 게시글이 존재하는지 확인
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }

  // 게시글 수정
  post.title = title;
  post.content = content;

  res.json({ message: "게시글이 수정되었습니다." });
});

app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});
