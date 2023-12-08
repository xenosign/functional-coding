// 이 코드는 주어진 객체의 특정 값을 수정하는 두 개의 함수와, 주어진 경로를 따라 객체의 값을 수정하는
// 함수로 구성되어 있습니다.

// 좋은 점:
// 1. `update` 함수는 객체를 복사하여 새로운 객체를 생성하고, 해당 객체의 특정 값을 수정하는 기능을 가지고
// 있습니다. 이를 통해 원본 객체를 변경하지 않고도 안전하게 값을 수정할 수 있습니다.

// 2. `nestedUpdate` 함수는 재귀적으로 호출되어 객체의 중첩된 값을 수정할 수 있습니다.
// 이를 통해 복잡한 객체 구조에서도 효과적으로 값을 수정할 수 있습니다.

// 3. `incrementSizeByName` 함수는 `nestedUpdate` 함수를 활용하여 주어진 경로에 해당하는 값을 1 증가시키는
// 기능을 가지고 있습니다. 이를 통해 코드의 가독성과 재사용성이 높아집니다.

// 나쁜 점:
// 1. `nestedUpdate` 함수에서 `keys` 배열을 수정하고 있습니다. `shift` 메소드를 사용하여 첫 번째 요소를
// 제거하고 가져오는 동작은 원본 배열을 변경시키기 때문에, 함수 외부에서 `keys` 배열을 사용하는 경우 예상치
// 못한 동작이 발생할 수 있습니다. 이를 방지하기 위해서는 `keys` 배열을 복사하여 사용하는 것이 좋습니다.

// 2. `nestedUpdate` 함수에서는 경로에 해당하는 값이 존재하지 않는 경우에 대한 예외 처리가 없습니다.
// 이 경우에는 `TypeError`가 발생할 수 있으므로, 해당 예외를 처리하는 로직을 추가하는 것이 좋습니다.

function update(obj, key, modify) {
  const newObj = Object.assign({}, obj);
  const value = newObj[key];
  newObj[key] = modify(value);
  return newObj;
}

function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) return modify(obj);

  const key1 = keys.shift();
  return update(obj, key1, function (value) {
    return nestedUpdate(value, keys, modify);
  });
}

function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], (size) => size + 1);
}

// 객체를 깊은 복사해서, 새로 만든 객체를 변경하는 함수.
function deepCopyAndModify(obj, key, value) {
  // 객체를 깊은 복사하여 새로운 객체 생성
  const newObj = JSON.parse(JSON.stringify(obj));

  // 새로운 객체의 특정 키에 값을 변경
  newObj[key] = value;

  // 변경된 객체 반환
  return newObj;
}

function updateArrayValue(array, index, newValue) {
  return array.map((item, i) => {
    if (i === index) return newValue;
    return item;
  });
}

// Example
const numbers = [1, 2, 3];
const updatedNumbers = updateArrayValue(numbers, 1, 5);

console.log(numbers); // [1, 2, 3]
console.log(updatedNumbers); // [1, 5, 3]

// 배열의 값을 바꾸는 함수를 함수형 코드로 생성.

// 주어진 배열을 복사하여 새로운 배열을 생성하는 함수
const copyArray = (arr) => arr.slice();

// 주어진 배열의 특정 인덱스의 값을 변경하는 함수
const updateValue = (arr, index, value) => {
  // 배열을 복사하여 새로운 배열을 생성
  const newArr = copyArray(arr);
  // 새로운 배열의 특정 인덱스의 값을 변경
  newArr[index] = value;
  // 변경된 배열 반환
  return newArr;
};

// 테스트용 배열
const originalArray = [1, 2, 3, 4, 5];

// 특정 인덱스의 값을 변경한 새로운 배열 생성
const updatedArray = updateValue(originalArray, 2, 10);

// 변경 전 배열 출력
console.log(originalArray);

// 변경 후 배열 출력
console.log(updatedArray);


// 게시글 수정 api를 nestjs typescript 로.

// 게시글 수정 요청을 처리하는 컨트롤러
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 게시글 수정을 처리하는 핸들러
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    // 게시글 수정 서비스를 호출하여 게시글을 업데이트하고 업데이트된 게시글을 반환
    return this.postsService.updatePost(id, updatePostDto);
  }
}

// 게시글 수정을 처리하는 서비스
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  // 게시글을 업데이트하는 메소드
  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    // 업데이트할 게시글을 데이터베이스에서 찾음
    const post = await this.postModel.findById(id);

    // 게시글이 존재하지 않으면 예외를 발생시킴
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 게시글의 내용을 업데이트
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;

    // 업데이트된 게시글을 저장하고 반환
    return post.save();
  }
}

// 게시글 업데이트에 사용되는 DTO (Data Transfer Object)
export class UpdatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

// 게시글 모델
export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// 게시글 수정 api를 nestjs typescript 로.

// express 모듈을 불러옴
const express = require('express');
// express 앱을 생성
const app = express();
// body-parser 미들웨어를 사용하여 요청의 body를 파싱
app.use(express.json());

// 게시글 수정을 처리하는 핸들러 함수
const updatePostHandler = (req, res) => {
  // 요청의 body에서 게시글 id를 가져옴
  const postId = req.body.id;
  // 요청의 body에서 수정할 내용을 가져옴
  const updatedContent = req.body.content;

  // 게시글 id와 수정할 내용이 모두 제공되었는지 확인
  if (!postId || !updatedContent) {
    // 필수 정보가 누락된 경우, 400 Bad Request 응답을 보냄
    return res.status(400).json({ error: '게시글 id와 수정할 내용을 모두 제공해야 합니다.' });
  }

  // 게시글 수정 로직을 구현
  // ...

  // 게시글 수정이 성공적으로 완료되었을 경우, 200 OK 응답을 보냄
  res.status(200).json({ message: '게시글 수정이 완료되었습니다.' });
};

// POST /api/posts/update 라우트에 게시글 수정 핸들러 함수를 등록
app.post('/api/posts/update', updatePostHandler);

// 서버를 3000 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행되었습니다.');
});