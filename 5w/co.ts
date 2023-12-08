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
