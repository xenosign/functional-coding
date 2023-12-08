//Controller
@PutMapping("/articles/{id}")
public Article updateArticle(@RequestBody Article article) {
  return articleService.updateArticle(article);
}

//Service 
public Article updateArticle(Article article) {
  Article existing = repository.findById(article.getId())
    .orElseThrow();

  existing.setTitle(article.getTitle());
  //update other fields

  return repository.save(existing);
}

// 게시글 수정하는 api를 java spring 으로 만들어줘.

// 필요한 패키지 import
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    // 게시글 수정을 위한 API 엔드포인트
    @PutMapping("/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Long postId, @RequestBody PostRequestDto requestDto) {
        // postId에 해당하는 게시글을 데이터베이스에서 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));

        // requestDto에서 수정할 내용을 가져와서 게시글 업데이트
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());

        // 게시글을 데이터베이스에 저장
        postRepository.save(post);

        // 수정된 게시글의 id를 응답
        return new ResponseEntity<>("게시글이 성공적으로 수정되었습니다.", HttpStatus.OK);
    }
}