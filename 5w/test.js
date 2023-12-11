// 슬라이더 요소 생성
const sizeSlider = document.createElement("input");
sizeSlider.type = "range";
sizeSlider.min = "10";
sizeSlider.max = "100";
sizeSlider.value = "50";

const rotationSlider = document.createElement("input");
rotationSlider.type = "range";
rotationSlider.min = "0";
rotationSlider.max = "360";
rotationSlider.value = "0";

// 슬라이더 이벤트 핸들러
sizeSlider.addEventListener("input", () => {
  const size = sizeSlider.value;
  const starElement = document.getElementById("star");
  starElement.style.width = `${size}px`;
  starElement.style.height = `${size}px`;
});

rotationSlider.addEventListener("input", () => {
  const rotation = rotationSlider.value;
  const starElement = document.getElementById("star");
  starElement.style.transform = `rotate(${rotation}deg)`;
});

// 슬라이더 요소 추가
document.body.appendChild(sizeSlider);
document.body.appendChild(rotationSlider);

// 별 모양 요소 생성
const starElement = document.createElement("div");
starElement.id = "star";
starElement.style.width = "50px";
starElement.style.height = "50px";
starElement.style.backgroundColor = "yellow";

// 별 모양 요소 추가
document.body.appendChild(starElement);



// |이 코드는 Express를 사용하여 RESTful API를 구현하는 예제입니다. 코드의 좋은 점과 나쁜 점을 한국어로 설명하겠습니다.
// |
// |좋은 점:
// |1. Express를 사용하여 간단하고 효율적인 API를 구현할 수 있습니다.
// |2. `express.json()` 미들웨어를 사용하여 JSON 형식의 요청을 파싱할 수 있습니다.
// |3. `app.put()` 메서드를 사용하여 PUT 요청을 처리할 수 있습니다.
// |4. 요청의 URL에서 `:id`를 사용하여 동적으로 게시물 ID를 가져올 수 있습니다.
// |5. `posts` 배열을 사용하여 게시물 데이터를 저장하고 관리할 수 있습니다.
// |6. 요청된 게시물 ID를 사용하여 `posts` 배열에서 해당 게시물을 찾을 수 있습니다.
// |7. 찾은 게시물이 있을 경우, 요청된 새 게시물 데이터로 해당 게시물을 업데이트하고 응답으로 반환할 수 있습니다.
// |8. 찾은 게시물이 없을 경우, 404 상태 코드와 함께 "Post not found" 메시지를 반환할 수 있습니다.
// |9. 서버가 3000 포트에서 실행되도록 설정되어 있습니다.
// |
// |나쁜 점:
// |1. `posts` 배열은 코드 내에서 하드코딩되어 있으며, 실제 데이터 소스로 대체되어야 합니다.
// |2. 게시물을 업데이트하는 PUT 요청을 처리하는 라우트 핸들러에서 오류 처리가 부족합니다. 예를 들어, 요청된 게시물 데이터가 유효한지 확인하는 검증 로직이 없습니다.
// |3. 에러 처리를 위한 미들웨어가 없으므로, 예외가 발생하면 기본적인 오류 응답이 제공되지 않습니다.
// |4. 로깅이나 보안과 같은 추가적인 기능을 위한 미들웨어가 없습니다.
// |
// |이 코드는 기본적인 API 구현을 위한 충분한 기능을 제공하지만, 실제 프로덕션 환경에서는 보안, 검증, 에러 처리 등의 추가 기능을 고려해야 합니다.


// 게시글 수정하는 express 코드.

// express 모듈을 불러옴
const express = require('express');

// express 앱 생성
const app = express();

// 게시글 수정을 위한 PUT 요청 핸들러
app.put('/posts/:id', (req, res) => {
  // 요청 파라미터에서 게시글 id를 가져옴
  const postId = req.params.id;

  // 요청 바디에서 수정할 내용을 가져옴
  const updatedContent = req.body.content;

  // 게시글 수정 로직
  // ...

  // 수정된 게시글을 응답으로 보냄
  res.send('게시글이 수정되었습니다.');
});

// 서버를 3000 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행되었습니다.');
});

const express = require('express');
const app = express();
app.use(express.json());

let posts = []; // This should be replaced with your posts data source

app.put('/posts/:id', (req, res) => {
  const id = req.params.id;
  const newPost = req.body;

  const post = posts.find(post => post.id === id);
  if (post) {
    post.title = newPost.title;
    post.content = newPost.content;
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));